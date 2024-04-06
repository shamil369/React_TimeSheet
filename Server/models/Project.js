import mongoose from 'mongoose'

const Project = mongoose.model("Project",new mongoose.Schema({projectName:{type:String},description:{type:String},startDate:{type:String},endDate:{type:String},subTask:{type:Array}}));

export default Project