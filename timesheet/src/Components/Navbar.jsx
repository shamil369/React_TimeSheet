import { useContext } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import userContext from '../Context/UserContext'

function Navbar(){

    let {nowLoggedIn} = useContext(userContext)

    return (

        <div className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                <img src="/timeLogo.png" alt="Timesheet"/>
                </Link>
            </div>
            <div className="navbar-signin-signup">
               { nowLoggedIn ? <label>{nowLoggedIn}</label> : 
              <div> <Link className="navbar-signin" to="/signin">Sign In </Link>
                <Link className="navbar-signup" to="/signup">Sign Up </Link>
             </div>
               }
                
            </div>
        </div>
    )
}

export default Navbar