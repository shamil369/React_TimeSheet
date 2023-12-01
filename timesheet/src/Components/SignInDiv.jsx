import './SignInDiv.css'
import {Link,useNavigate} from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios';


function SignInDiv(){

    const [emailLogin,setEmailLogin] = useState('');
    const [passwordLogin,setPasswordLogin] = useState('');

    const navigate = useNavigate();

   async function logIntoAccount(){

        let login = {email:emailLogin,password:passwordLogin} 

        await axios.post('http://localhost:5000/login',login,{withCredentials:true}).then((res)=>{
            console.log("login response",res.data) 
            if(res.data.email===login.email){
                navigate('/timepage')
            }else{
                console.log("not matched")
            }
        })
    }

    return(
        
         <div className="signin-box">
            <label className="block head-label">Sign In</label>

            <div className="signin-img">
                <img src="/signup-logo.svg" alt="Sign up Logo"/>
            </div>
            <div className="signin-input">
                <div className="email-div margin">
                    <label className="block input-label">Email address</label>
                    <input onChange={(e)=>setEmailLogin(e.target.value)} className="input-type" placeholder="Enter Email"/>
                </div>
                <div className="password-div margin">
                    <label className="block input-label">Password</label>
                    <input onChange={(e)=>{setPasswordLogin(e.target.value)}} className="input-type" placeholder="Enter Password"/>
                </div>
                <div className="signIn-div">
                    <input onClick={logIntoAccount} type="submit" value="Sign In"/>
                </div>
                <div className="create-forgot-div">
                    <Link className="text-decor" to="/Signup">Create Account&nbsp;</Link>|<Link className="text-decor">&nbsp;Forgot Password?</Link>
                </div>
            </div>

        </div>
    
    )
}

export default SignInDiv