import './EditPopup.css'
import {useState} from 'react'
import axios from 'axios';

function EditPopup({setUpdatePopup,updateID,updatePlaceholderData}){

const [updateName,setUpdateName] = useState(updatePlaceholderData.name)
const [updateProject,setUpdateProject] = useState(updatePlaceholderData.project)
const [updateDescription,setUpdateDescription] = useState(updatePlaceholderData.description)
const [updateStartDate,setUpdateStartDate] = useState(updatePlaceholderData.startdate)
const [updateDeadline,setUpdateDeadline] = useState(updatePlaceholderData.deadline)

async function updateTask(){

let updateBody = {
    id:updateID,
    data:{
    updateName,
    updateProject,
    updateDescription,
    updateStartDate,
    updateDeadline
     }
}

await axios.put("http://localhost:5000/updateTask",updateBody,{withCredentials:true}).then((result)=>{
    console.log("updatetask result:",result);
    setUpdatePopup(false);
})
}

    

return(
    <div className="popup-background">
    <div className='popup-update'>
        <div className="close-buttons"><img className="close-image" onClick={()=>setUpdatePopup(false)} src="/close.svg" alt="close"/></div>
        <div className="text-center fs"><label >Edit</label></div>
        <div className="popup-label-div">
        <label >Name</label><input className="popup-input" onChange={(e)=>setUpdateName(e.target.value)}  value={updateName}></input>
        </div>
        <div className="popup-label-div">
        <label>Project</label><input type="textbox" className="popup-input" onChange={(e)=>setUpdateProject(e.target.value)} value={updateProject} ></input>
        </div>
        <div className="popup-label-div">
        <label>Description</label><textarea className="popup-input" onChange={(e)=>setUpdateDescription(e.target.value)} value={updateDescription} ></textarea>
        </div>
        <div className="popup-label-div">
        <label>Start Date</label><input className="popup-input" type="date" onChange={(e)=>setUpdateStartDate(e.target.value)} value={updateStartDate} ></input>
        </div>
        <div className="popup-label-div">
        <label>Deadline</label><input className="popup-input" type="date" onChange={(e)=>setUpdateDeadline(e.target.value)} value={updateDeadline} ></input>
        </div>
        <div className="button-div">
            <input className="button" type="submit" value="Update" onClick={updateTask}/>
        </div>
    </div>
</div>

)


}

export default EditPopup