import React, { useState } from 'react'
import './AdminProjectEditPopup.css'
import axios from 'axios'
import { UilTrashAlt } from '@iconscout/react-unicons'

function AdminProjectEditPopup({setadminProjectEditPopup,whichProject}) {

  const [clickOk,setClickOk] = useState(true)
  const [projectName,setProjectName] = useState(whichProject.projectName)
  const [description,setDescription] = useState(whichProject.description)
  const [startdate,setStartdate] = useState(whichProject.startDate)
  const [enddate,setEnddate] = useState(whichProject.endDate)
  const [subtask,setSubtask] = useState()
  const [subtaskarray,setSubtaskArray] = useState(whichProject.subTask)
  const [startType,setStartType] = useState();
  const [endType,setEndType] = useState();

  console.log("project dat admin edit ",whichProject)

  function updateProjectData(){
      let newArray = subtaskarray
      const projectObject ={
        "projectId":whichProject._id,
        projectName,
        description,
        startdate,
        enddate,
        "subtaskarray":newArray,
      }
      axios.post("http://localhost:5000/updateProjectData",projectObject,{withCredentials:true}).then((res)=>{
        console.log("adminprojectedit updation response",res.data)
        setadminProjectEditPopup(false)
      }).catch(err=>console.log("errr in axios in admineditprojectPopup",err))

  }

  return (
    <div className="admin-project-edit-popup-background" onClick={()=>clickOk && setadminProjectEditPopup(false)} >
        <div className="admin-project-edit-popup" onMouseEnter={()=>setClickOk(false)} onMouseLeave={()=>setClickOk(true)}>
          <h3 className='mb-4 text-center'>Edit Project Details</h3>
          <div className="admin-project-edit">              
              <div className="label-box-input">
                <label className=''>Project Name</label>
                <input onChange={(e)=>setProjectName(e.target.value)} value={projectName} className='box-input'></input>
              </div>
              <div className="label-box-input">
                <label>Description</label>
                <input onChange={(e)=>setDescription(e.target.value)} value={description} className='box-input'></input>
              </div>
              <div className="label-box-input">
                <label>Start Date</label>
                <input type={startType} onChange={(e)=>setStartdate(e.target.value)} value={startdate} onFocus={()=>setStartType("date")} onBlur={()=>setStartType("")} className='box-input'></input>
              </div>
              <div className="label-box-input">
                <label>End Date</label>
                <input type={endType} onChange={(e)=>setEnddate(e.target.value)} value={enddate} onFocus={()=>setEndType("date")} onBlur={()=>setEndType("")} className='box-input'></input>
              </div>
             
          </div>
          <h3 className="m-3">Edit Sub Tasks</h3>
          <div className="d-flex justify-content-center gap-3 my-3">
                <label className='lead'>Add New Sub Task</label>
                <input onChange={(e)=>setSubtask(e.target.value)} className=''></input>
                <button className='btn btn-outline-dark' onClick={()=>{setSubtaskArray([...subtaskarray,{"subTaskId":new Date()+Math.random(),"subTaskName":subtask}])}}>ADD</button>
              </div>
          <div className="admin-project-edit">   
          {      subtaskarray && subtaskarray.map((obj,index)=>{   
            return (  
              <div className="label-box-input">
                <label className=''>Task {index+1}</label>
                <input value={obj.subTaskName} onChange={(e)=>subtaskarray[index]={"subTaskId":obj.subTaskId,"subTaskName":e.target.value}}className='box-input'></input>
                <UilTrashAlt onClick={()=>{setSubtaskArray(subtaskarray.filter(value=>value.subTaskId!==obj.subTaskId))}} />|
              </div>
)  })  }
          </div>
          <div className='text-center my-2'>
          <button onClick={()=>updateProjectData()} className='btn btn-dark '>Update</button>
          </div>
        </div>

    </div>
  )
}

export default AdminProjectEditPopup