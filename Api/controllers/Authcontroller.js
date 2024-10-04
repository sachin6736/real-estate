import User from "../models/User.Model.js";
import bcryptjs from 'bcryptjs';
import errorHandler from "../utils/errors.js";



export const signup = async (req,res,next)=>{
    const {username,password,email} = req.body;
    console.log(req.body);
    const hashpassword= bcryptjs.hashSync(password,10);
    const newUser = new User({
        username:username,
        email:email,
        password:hashpassword
    });
    try {
        await newUser.save();
        res.status(201).json(" user created")
    } catch (error) {
        next(error) // errorhandler middleware
        //next((errorHandler(550,"testing custom errors"))) // custom creation of errors
        // res.status(500).json('en error occured',error.message) 
    }


   
}