import './SignUpDiv.css'
import {useState,useContext} from 'react'
import axios from'axios'
import userContext from '../Context/UserContext';

function SignUpDiv(){

  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

    const {nowLoggedIn,setNowLoggedIn} = useContext(userContext);

  console.log(firstname,lastname,email,password)
   async function handleRegister(){

       let signupData = {
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:password
        }

       await axios.post('http://localhost:5000/addUser',signupData,{withCredentials:true})
       .then((res)=>{
        console.log("axios res:",res);
        console.log("res data:",res.data.email);
        setNowLoggedIn(res.data.email)
    })
       .catch((err)=>console.log(err))
    }

    return (
        <div className="signup-box">
            <label className="block head-label">Sign Up</label>

            <div className="signup-img">
                <img src="/signup-logo.svg" alt="Sign up Logo"/>
            </div>
            <div className="signup-input">
                <div className="firstname-div margin">
                    <label className="block input-label">Firstname</label>
                    <input className="input-type" placeholder="Enter Firstname" value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} />
                </div>
                <div className="lastname-div margin">
                    <label className="block input-label">Lastname</label>
                    <input className="input-type" placeholder="Enter Lastname" value={lastname} onChange={(e)=>{setLastname(e.target.value)}} />
                </div>
                <div className="email-div margin">
                    <label className="block input-label">Email address</label>
                    <input className="input-type" placeholder="Enter Email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div className="password-div margin">
                    <label className="block input-label">Password</label>
                    <input className="input-type" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="register-div">
                    <input type="submit" value="Register" onClick={handleRegister}/>
                </div>
            </div>

        </div>
        )
}

export default SignUpDiv