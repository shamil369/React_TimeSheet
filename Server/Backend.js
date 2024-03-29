import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import User from './models/User.js'
import bcrypt from 'bcrypt';
import cors from 'cors'
import jwt from 'jsonwebtoken';    
// const serve = require('serve-index')
import Task from './models/Task.js'
import Admin from './models/Admin.js'

const secret = "secret123"
const secrettwo = "secret456"

const app = express();
app.use(cookieParser())
app.use(bodyParser.json({extended:true}))
app.use(cors({credentials:true,origin:'http://localhost:3000'}))

 mongoose.connect('mongodb://127.0.0.1:27017/timesheetDB',{useNewUrlParser:true});
const db = mongoose.connection;
db.on('error',(error)=>console.log("DB not okay"))

app.use((req,res,next)=>{
    console.log("first middle")
    console.log("time:",Date.now())
    Task.find().then((userData)=>{
        console.log("miidleware all task document:",userData);
        userData.map((obj)=>{
            let currentDate = Date.now();
            let deadlineDate = new Date(obj.deadline)
            if (currentDate > deadlineDate && obj.status==="Active" ){
                let objID = obj._id;
                Task.findByIdAndUpdate({_id:objID},{$set:{status:"pending"}}).then((updatedPendingData)=>{
                    console.log("updated pending status:",updatedPendingData)
                })
            }
        })

    })
    next();
})

// app.use("/middle",(req,res,next)=>{
//     console.log("secondmiddle")
//     console.log("requsttype",req.method)
//     res.send("second middleware gote")
//     next();
// })

// // app.use('/public',express.static('public'));
// // app.use('/public',serve('public'))

// app.get('/',(req,res)=>{
//     res.json("successful hdg response hjgjgfhjftg")
// })

// app.get('/user/:ids',(req,res)=>{
//     console.log(req.params.ids)
//     var c = req.params.ids;

// res.send("heloo")

// })

// app.get('/query',(req,res)=>{
// var a = req.query.name
// var b =req.query.age
// console.log("valu"+a+"valuesss"+b)
// res.send("got it")
// })

app.post('/addUser',(req,res)=>{
    let login = req.body
    console.log(login)
    const hashedPassword = bcrypt.hashSync(login.password,10);
    const user = new User({firstname:login.firstname,lastname:login.lastname,email:login.email,password:hashedPassword}); 
    user.save().then(userInfo=>{
        console.log("userinfo:",userInfo)
        jwt.sign({id:userInfo._id,email:userInfo.email},secret,(err,token)=>{
            if(err){
            console.log(err);
            res.sendStatus(500)
        }else{
            res.cookie('token',token).json({id:userInfo._id,email:userInfo.email})
        }

    })  
    
})
})

app.post('/login',(req,res)=>{
    console.log(req.body)
     const {email,password} = req.body
     console.log("email:",email + "password"+ password)
     User.findOne({email}).then((dataDB)=>{
        console.log("datdb:",dataDB)
        const passOk = bcrypt.compareSync(password,dataDB.password)
        if(passOk){
            jwt.sign({id:dataDB._id,email:email},secret,(err,token)=>{
                if(err){
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    res.cookie('token',token).json({id:dataDB._id,email:dataDB.email,tokenUser:token});
                }
            })
        }
     }).catch(err=>{
        // res.send("password error");
     console.log("userlogin error:",err);
                console.log("email from client",email)
                let name = email
                // checkAdmin(email,password)
                Admin.findOne({name:"robert"}).then((adminData)=>{
                    console.log("admin Dataa:",adminData)
                    let adminPassOk = bcrypt.compareSync(password,adminData.password)
                    console.log("admin pass",adminPassOk)
                    if(adminPassOk){
                        jwt.sign({id:adminData._id,name:adminData.name},secrettwo,(err,token)=>{
                            if(err){
                                console.log(err);
                                res.sendStatus(500);
                            }else{
                                console.log("admin login successfull token",token)
                                 res.cookie("atoken",token).json({id:adminData._id,name:adminData.name,tokenadmin:token});
                            }
                        })
                    }
                }).catch((err)=>console.log("adminDAta error:",err))
        })
})

app.post('/addTask',(req,res)=>{
    console.log(req.body);
    console.log(req.cookies)
   

    const jwtToken = jwt.verify(req.body.token,secret)
    const emailToken = jwtToken.email;
    console.log("jwt:",jwtToken);
    console.log("email:",emailToken);

    const task = new Task({
        name:req.body.name,
        project:req.body.project,
        description:req.body.description,
        startdate:req.body.startDate,
        deadline:req.body.deadline,
        status:"Active",
        email:emailToken
    })
    task.save().then((taskData)=>{
        console.log(taskData);

    })
    res.send("add task data received");
})

app.post("/taskData",(req,res)=>{
    console.log("taskdata token",req.body.tokenjson)
    const jwtToken = jwt.verify(req.body.tokenjson,secret);
    console.log("verified token:",jwtToken)
    let email = jwtToken.email
    Task.find({email}).then((taskData)=>{
        console.log("taskdata from DB",taskData);
        res.json(taskData)
    })
    // res.send("task data received")
})

app.delete("/deleteTask/:deleteId",(req,res)=>{
    console.log("backend delete:",req.params.deleteId);
    let deleteId = req.params.deleteId
    Task.deleteOne({_id:deleteId}).then((deleteDataDB)=>{
        console.log("dleted data from db",deleteDataDB);
    res.send(req.params.deleteId);
    })
    

})

app.put("/updateTask",(req,res)=>{

    console.log("update from backend",req.body)
    let taskID = req.body.id;
    let taskData= req.body.data;
    Task.findByIdAndUpdate({_id:taskID},{$set:{name:taskData.updateName,
        project:taskData.updateProject,
        description:taskData.updateDescription,
        startdate:taskData.updateStartDate,
        deadline:taskData.updateDeadline

    }}).then((addedData)=>{
        if(addedData==null)
        res.send("nothing found");
        else
        res.send(addedData)
    }).catch((err)=>{
    console.log(err);
    res.send(err)
    }
    )
    // res.send("update data receive")
})

app.post("/whichUser",(req,res)=>{
   let tokenUser = req.body.tokenjson
   const jwtTokenUser = jwt.verify(tokenUser,secret);
   console.log("verified userToken:",jwtTokenUser)
   res.json({userEmail:jwtTokenUser.email})
})


app.post("/adminData",(req,res)=>{
    console.log("taskdata admin token",req.body.tokenjson)
    const jwtToken = jwt.verify(req.body.tokenjson,secrettwo);
    console.log("verified token admin:",jwtToken)
    let email = jwtToken.email
    Task.find().then((taskData)=>{
        console.log("taskdata when admin",taskData);
        res.json(taskData)
    })
    // res.send("task data received")
})

app.post("/requestApproval",(req,res)=>{
    console.log("request approva;",req.body.tokenjson)
    console.log("request approva id;",req.body.taskId)
    const taskId =req.body.taskId
    // const jwtToken = jwt.verify(req.body.tokenjson,secret);
    // console.log("verified token request approval:",jwtToken)
    // let email = jwtToken.email
    Task.findByIdAndUpdate({_id:taskId},{$set:{status:"Requested"}}).then((updatedData)=>{
        console.log("request status updated:",updatedData);
        res.send(updatedData)
    }).catch((err)=>{
        console.log("request status error",err)
        res.send(err)
    })
})

app.post("/approveTask",(req,res)=>{
    console.log("approve task;",req.body.tokenjson)
    console.log("approve task task id;",req.body.taskId)
    const taskId =req.body.taskId
    // const jwtToken = jwt.verify(req.body.tokenjson,secrettwo);
    // console.log("verified token request approval:",jwtToken)
    // let email = jwtToken.email
    Task.findByIdAndUpdate({_id:taskId},{$set:{status:"Completed"}}).then((updatedData)=>{
        console.log("request status updated:",updatedData);
        res.send(updatedData)
    }).catch((err)=>{
        console.log("request status error",err)
        res.send(err)
    })
})

app.post("/allTask",(req,res)=>{
    console.log("all task;",req.body.tokenjson)
    // const jwtToken = jwt.verify(req.body.tokenjson,secrettwo);
    // console.log("verified token request approval:",jwtToken)
    // let email = jwtToken.email
    Task.find().then((allTaskData)=>{
        res.send(allTaskData);
    }).catch((err)=>{
        console.log("alltask error",err);
        res.send(err)
    })
})

app.post("/adminAllUsers",(req,res)=>{
    console.log("all user;",req.body.tokenjson)
    // const jwtToken = jwt.verify(req.body.tokenjson,secrettwo);
    // console.log("verified token request approval:",jwtToken)
    // let email = jwtToken.email
    User.find().then((userData)=>{
        console.log("admin all muser userrdata",userData)
        res.send(userData)
    }).catch((err)=>{
        console.log("admin all user error",err)
    })
})

app.post("/deleteUser",(req,res)=>{
    console.log("delete id from backend",req.body.id);
    const id = req.body.id;
    User.findByIdAndDelete({_id:id}).then((deleteData)=>{
        console.log("deleted userdata from backend",deleteData)
        res.send(deleteData)
    }).catch((err)=>{
        console.log("deleteUSer error backend")
        res.send("deleteUser error occured")
    })
})

app.listen(5000,()=>console.log("server is listening to the port"));