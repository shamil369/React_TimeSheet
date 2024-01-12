
import axios from 'axios';
import {useState} from 'react'
import './Popup.css'


export default function Popup({setPopClick}){

    let [name,setName]=useState();
    let [project,setProject]=useState();
    let [description,setDescription]=useState();
    let [startDate,setStartDate]=useState();
    let [deadline,setDeadline]=useState();


     function addTask(){


      const tokenvalue =  localStorage.getItem("validToken")
      const token = JSON.parse(tokenvalue);
      console.log(token)
        let addTaskData = {
            name,
            project,
            description,
            startDate,
            deadline,
            token
            
        }

        axios.post('http://localhost:5000/addTask',addTaskData,{withCredentials:true}).then((res)=>{
            console.log("addtaskdata response:",res.data);
            setPopClick(false)
            setTimeout(()=>setPopClick(false),2000)
        })
        

    }

    return(

    <div className="popup-background">
        <div className='popup'>
            <div className="close-button"><img className="close-image" onClick={()=>setPopClick(false)} src="/close.svg" alt="close"/></div>
            <div className="text-center fs"><label >Add New</label></div>
            <div className="popup-label-div">
            <label >Name</label><input className="popup-input" onChange={(e)=>setName(e.target.value)}></input>
            </div>
            <div className="popup-label-div">
            <label>Project</label><input type="textbox" className="popup-input" onChange={(e)=>setProject(e.target.value)} ></input>
            </div>
            <div className="popup-label-div">
            <label>Description</label><textarea className="popup-input" onChange={(e)=>setDescription(e.target.value)} ></textarea>
            </div>
            <div className="popup-label-div">
            <label>Start Date</label><input className="popup-input" type="date" onChange={(e)=>setStartDate(e.target.value)} ></input>
            </div>
            <div className="popup-label-div">
            <label>Deadline</label><input className="popup-input" type="date" onChange={(e)=>setDeadline(e.target.value)} ></input>
            </div>
            <div className="button-div">
                <input className="button" type="submit" value="Add" onClick={addTask}/>
            </div>
        </div>
    </div>
    )

}

