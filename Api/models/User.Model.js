import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:false
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4EVVqne6GQfG9fQJA0j0XjmtH7MrJX6Hyog&s"
    }
    
}, {timestamps: true});

const User = mongoose.model('User',userSchema);
export default User;