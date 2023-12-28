import mongoose from 'mongoose'

const Task = mongoose.model("Task",new mongoose.Schema({
    name:{ type:String},
    project:{type:String},
    description:{type:String},
    startdate:{type:String},
    deadline:{type:String},
    status:{type:String},
    email:{type:String}

}))

export default Task