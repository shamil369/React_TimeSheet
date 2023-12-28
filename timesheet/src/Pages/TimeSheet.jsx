import { useState, useContext } from "react";
import SignIn from './SignIn'
import userContext from "../Context/UserContext";
import Table from 'react-bootstrap/Table'
import NavbarEntryPage from '../Components/NavbarEntryPage'
import '../Components/Data.css'
import Popup from '../Components/Popup'
import Data from '../Components/Data'
import Sidebar from '../Components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyTask from "../Components/MyTask";
import EntryPageMain from "../Components/EntryPageMain";

function TimeSheet() {

    
    

    if (!localStorage.getItem('validToken')) {
        return <SignIn />
    }


   

    return (
        <div>
            
            {/* <NavbarEntryPage />
            <Sidebar/> */}
             <MyTask/>  
        

        </div>
    )
}

export default TimeSheet