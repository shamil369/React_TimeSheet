import mongoose from 'mongoose'

const UserSubTask = mongoose.model("UserSubTask",new mongoose.Schema({
    userdata:{type:Object},
    projectdetail:{type:String},
    idofsubtask:{type:String},
    timespend:{type:Array}

}))

export default UserSubTask