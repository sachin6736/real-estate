import User from "../models/User.Model.js";
import bcryptjs from 'bcryptjs';
import errorHandler from "../utils/errors.js";
import jwt from 'jsonwebtoken';


export const signup = async (req,res,next)=>{
    const {username,password,email,} = req.body;
    console.log(req.body);
    const hashpassword= bcryptjs.hashSync(password,10);
    if(!username||!password||!email){
        return res.status(400).json({message:"all fields are necessary"})
    }
    const existing = await User.findOne({email:email});
    if(existing){
        return res.status(400).json({message:"this email already exists!!"})
    }
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

export const signin = async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const valid= await User.findOne({email:email})
        if(!valid){
            return next(errorHandler(404,'user not found! please create a new account'))
        }
        const validpass = bcryptjs.compareSync(password, valid.password);
        if(!validpass){
            return next(errorHandler(401,'wrong email or password'));
        }
        const token = jwt.sign({id:valid._id},process.env.JWT_SECRET);
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(valid);
    } catch (error) {
        next(error);
        console.log(error)
    }
}