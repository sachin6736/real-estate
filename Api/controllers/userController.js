import User from "../models/User.Model.js";
import bcryptjs from 'bcryptjs';
import errorHandler from "../utils/errors.js";

export const test = (req,res)=>{
    res.json({
        message:"test api"
    })
}

export const updateUser =async (req,res,next)=>{
    console.log("this is reqbody",req.body);
    if(req.user.id !== req.params.id) return next(errorHandler(401,'unauthorized'));
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profile:req.body.profile
            }
        }, {new:true}) ;
        const {password, ...rest} = updateUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));
    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };

  