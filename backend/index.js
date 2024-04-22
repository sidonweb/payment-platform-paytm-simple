import express from 'express';
import rootRouter from "./routes/index.js"

import cors from "cors";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/v1", rootRouter)

app.listen(PORT, (err) => {
    if(err){
        console.log(err)
    } else {
        console.log(`Server listening on PORT ${PORT}`);
    }
});




