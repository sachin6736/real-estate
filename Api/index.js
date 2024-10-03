import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.mong).then(()=>{
    console.log("connected to mongo db")
}).catch((err)=>{
    console.log(err)
})
const app = express();  

app.listen(3000,()=>{
    console.log("server running 3000 !")
})