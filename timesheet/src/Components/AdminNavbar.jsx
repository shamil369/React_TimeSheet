

import './AdminNavbar.css'
import { useContext,useEffect,useState } from 'react'

import {Link, useNavigate} from 'react-router-dom'
import userContext from '../Context/UserContext'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'; 
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';



function AdminNavbar(){

    const [user,setUser] = useState()

    const navigate = useNavigate()

    function logOut(){
        localStorage.clear()
        navigate("/")

    }

    // useEffect(()=>{
    //     const tokenvalue =  localStorage.getItem("validTokenadmin")
    //     const tokenjson = JSON.parse(tokenvalue);
        
    //     let token = {
    //         tokenjson:tokenjson
    //     }
    //     axios.post("http://localhost:5000/whichUser",token,{withCredentials:true}).then((res)=>{
    //         console.log("whichUser:",res)

    //         setUser(res.data.userEmail)
    //     })
    // },[])

    let {nowLoggedIn} = useContext(userContext)
    return(

        <div className="navbar">
        <div className="navbar-logo">
            <Link to="/">
            <img src="/timeLogo.png" alt="Timesheet"/>
            </Link>
        </div>
        <div className="admin-navbar">
           {/* { user ? <label>{user}</label> :""
        //   <div> <Link className="navbar-signin" to="/signin">Sign In </Link>
        //     <Link className="navbar-signup" to="/signup">Sign Up </Link>
        //  </div>
           } */}
           <div >
         
           {/* <button onClick={()=>navigate("/admin/edit")}>edit</button> */}
    
           <NavDropdown title={user ? user:"Admin"} id="basic-nav-dropdown">
              <NavDropdown.Item href=""><Link to="/" onClick={logOut} className="logout-entry">Logout</Link></NavDropdown.Item>
              
            </NavDropdown>

           </div>
            
        </div>
    </div>
    )
}

export default AdminNavbar