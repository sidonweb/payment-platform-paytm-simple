import express from 'express';
import authMiddleware from '../middleware.js';
import {Account} from '../db.js'
import mongoose from 'mongoose';

const router = express.Router();

router.get("/balance", authMiddleware,  async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async(req, res) => {
    const {amount, to} = req.body;

    const session = await mongoose.startSession();

    session.startTransaction()

    const fromAccount = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(fromAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transaction Successfull"
    })


    
})

export default router;

