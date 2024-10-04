import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userroutes.js';
import authRouter from './routes/Auth.routes.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.mong).then(()=>{
    console.log("connected to mongo db")
}).catch((err)=>{
    console.log(err)
})
const app = express();  
app.use(express.json())

app.use('/api/user/',userRouter)
app.use('/api/Auth/',authRouter);


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message = err.message || "internal sever error";
    return res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message:message
    });
});

app.listen(3000,()=>{
    console.log("server running 3000 !")
})

