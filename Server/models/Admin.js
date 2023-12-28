import mongoose from "mongoose"


const Admin = mongoose.model("Admin",new mongoose.Schema({name:{type:String},password:{type:String}}))

export default Admin