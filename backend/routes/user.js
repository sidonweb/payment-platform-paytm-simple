import express from 'express';
import z from 'zod';
import {User} from '../db.js';
import {Account} from '../db.js'
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config.js"
import authMiddleware from '../middleware.js';


const router = express.Router();
const signupValidation = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string()
});

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { success } = signupValidation.safeParse(req.body)
    console.log(success)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const isUserExist = await User.findOne({
        username: req.body.username
    });

    if(isUserExist) {
        return res.status(411).json({
            message: "Email already taken / User already exists"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created succesfully",
        token: token
    })
});

const signinValidation = z.object({
    username: z.string().email(),
    password: z.string()
})

router.post("/signin", async (req, res) => {
    console.log(req.body);
    const {success} = signinValidation.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
    } else {
        res.status(411).json({
            message: "Error while logging in"
        })
    }

    
});

const updateValidation = z.object({
    password: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const {success} = updateValidation.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    const updated = await User.updateOne({ _id: req.userId }, req.body);
    console.log(updated);
    res.json({
        message: "Information updated successfully"
    })
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || " "
    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    });
})



export default router;