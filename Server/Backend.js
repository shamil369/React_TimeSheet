import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import User from './models/User.js'
import bcrypt from 'bcrypt';
import cors from 'cors'
import jwt from 'jsonwebtoken';    
// const serve = require('serve-index')

const secret = "secret123"

const app = express();
app.use(cookieParser())
app.use(bodyParser.json({extended:true}))
app.use(cors({credentials:true,origin:'http://localhost:3000'}))

await mongoose.connect('mongodb://127.0.0.1:27017/timesheetDB',{useNewUrlParser:true});
const db = mongoose.connection;
db.on('error',(error)=>console.log("not okay"))

app.use((req,res,next)=>{
    console.log("first middle")
    console.log("time:",Date.now())
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
     User.findOne({email}).then((dataDB)=>{
        const passOk = bcrypt.compareSync(password,dataDB.password);
        if(passOk){
            jwt.sign({id:dataDB._id,email:email},secret,(err,token)=>{
                if(err){
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    res.cookie('token',token).json({id:dataDB._id,email:dataDB.email});
                }
            })
        }
     })
})

app.listen(5000,()=>console.log("server is listening to the port"));