import mongoose from 'mongoose'

const User = mongoose.model("User",new mongoose.Schema({
    firstname: {type:String},
    lastname:{type:String},
    email:{type:String},
    password:{type:String},
}));

export default User