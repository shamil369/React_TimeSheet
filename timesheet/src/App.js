import React,{useState} from "react"
import './App.css';
import {Link,BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import userContext from './Context/UserContext';
import TimeSheet from './Pages/TimeSheet'

function App() {

  let [nowLoggedIn,setNowLoggedIn] = useState('');

  return (
    <userContext.Provider value={{nowLoggedIn,setNowLoggedIn}}>

    <div>
    <Router>
      <Routes>

     <Route exact path="/" Component={Home} />
     <Route exact path="/signup" Component={SignUp} />
     <Route exact path="/signin" Component={SignIn} />
     <Route exact path="/timepage" Component={TimeSheet} />
    

      </Routes>
    </Router>
    </div>
    </userContext.Provider>
  );
}

export default App;
