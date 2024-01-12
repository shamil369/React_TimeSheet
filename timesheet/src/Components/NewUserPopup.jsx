import React from 'react';
import './NewUserPopup.css'
import {useState} from 'react';
import axios from 'axios';

function NewUserPopup({setInsertionOk,setNewUserPopup}) {

    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [mouseOut,setMouseOut] = useState('out')

    function addUser(){

        let signupData = {
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:password
        }

        axios.post('http://localhost:5000/addUser',signupData,{withCredentials:true}).then((res)=>{
        console.log("axios res:",res);
        console.log("res data:",res.data.email);
        setInsertionOk(res.data.email)
        setNewUserPopup(false);
        
    }).catch((err)=>console.log("adduser error in front",err))
    }

    

  return (
    <div onClick={()=>{if(mouseOut==="out"){setNewUserPopup(false);setMouseOut("in")}}}className="newuser-popup-background">
        <div className="newuser-popup" onMouseEnter={()=>setMouseOut("in")} onMouseLeave={()=>setMouseOut("out")} >
            <h3 className="text-center">New User</h3>
            <div className="newuser-firstname-div">
                <label className="fs-4">Firstname</label>
                <input className="newuser-input" onChange={(e)=>setFirstname(e.target.value)}></input>
            </div>
            <div className="newuser-lastname-div">
                <label className="fs-4">Lastname</label>
                <input className="newuser-input" onChange={(e)=>setLastname(e.target.value)}></input>
            </div>
            <div className="newuser-email-div">
                <label className="fs-4">Email Address</label>
                <input className="newuser-input" onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div className="newuser-password-div">
                <label className="fs-4">Password</label>
                <input className="newuser-input" onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <div className="text-center">
                <button onClick={addUser} className="newuser-adduser-button">Add User</button>
            </div>

        </div>
    </div>
  )
}

export default NewUserPopup