import React,{useState} from "react"
import './App.css';
import {Link,BrowserRouter as Router,Route, Routes,useNavigate} from 'react-router-dom'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import userContext from './Context/UserContext';
import TimeSheet from './Pages/TimeSheet'
import MyTask from "./Components/MyTask";
import PendingTaskPage from './Pages/PendingTaskPage'
import CompletedTaskPage from "./Pages/CompletedTaskPage";
import ActiveTaskPage from "./Pages/ActiveTaskPage";
import AdminPage from './Pages/AdminPage'
import AdminEdit from "./Components/AdminEdit";
import AdminMain from "./Components/AdminMain";
import MyProjectsPage from "./Pages/MyProjectsPage";

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
    <Route  path="/timepage/active" Component={ActiveTaskPage} />
    <Route  path="/timepage/pending" Component={PendingTaskPage} />
    <Route  path="/timepage/completed" Component={CompletedTaskPage} />
    <Route  path="/timepage/myProjects" Component={MyProjectsPage} />
    <Route  path="/admin/*" Component={AdminPage} >
      <Route path="edit" Component={AdminEdit}/>
      <Route path="" Component={AdminMain}/>
    
                        
                        
    </Route> 
    

     
      </Routes>
    </Router>
    </div>
    </userContext.Provider>
  );
}

export default App;
