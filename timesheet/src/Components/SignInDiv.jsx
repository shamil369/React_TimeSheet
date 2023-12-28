import './SignInDiv.css'
import {Link,useNavigate} from 'react-router-dom'
import {useState,useContext} from 'react';
import axios from 'axios';
import userContext from '../Context/UserContext';


function SignInDiv(){

    const [emailLogin,setEmailLogin] = useState('');
    const [passwordLogin,setPasswordLogin] = useState('');
    let {nowLoggedIn,setNowLoggedIn} = useContext(userContext)

    const navigate = useNavigate();

   async function logIntoAccount(){

        let login = {email:emailLogin,password:passwordLogin} 

        await axios.post('http://localhost:5000/login',login,{withCredentials:true}).then((res)=>{
            console.log("login response",res.data) 
            if(res.data.email===login.email){
                console.log("tokenvalue:",res.data.tokenUser)
            
                localStorage.setItem("validToken",JSON.stringify(res.data.tokenUser))
                setNowLoggedIn(res.data.email)
                navigate('/timepage')
            }else if(res.data.name===login.email){
                console.log("tokenvalue admin:",res.data.tokenadmin)
            
                localStorage.setItem("validTokenadmin",JSON.stringify(res.data.tokenadmin))
                setNowLoggedIn(res.data.name)
                navigate('/admin')
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