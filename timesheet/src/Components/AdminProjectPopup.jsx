import React,{ useState} from 'react'
import './AdminProjectPopup.css'
import axios from 'axios'


function AdminProjectPopup({setAdminProjectPopup}) {

    const [subtaskDatas,setSubTaskDatas] = useState([])
    const [subTask,setSubTask] = useState()
    const [closeOk,setCloseOk] = useState()
    const [projectName,setProjectName] = useState()
    const [description,setDescription] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()


    function createProject(){

      const subTaskObject = subtaskDatas.map((obj)=>{

        
          return {
            "subTaskId":obj.id,
            "subTaskName":obj.value
          }
        
      })

      console.log("subtaskObject",subTaskObject)
      const projectData = {
        projectName,
        description,
        startDate,
        endDate,
        subTask: subTaskObject
      }
        
      
      console.log("projectDAta",projectData)
      axios.post("http://localhost:5000/createProject",projectData,{withCredentials:true}).then((res)=>{
        console.log("create project response",res.data)
        setAdminProjectPopup(false)
      }).catch((err)=>{
        console.log("createProject response error",err)
      })
    
    }
    
  return (
    <div className="create-project-popup-background" onClick={()=>{closeOk===true && setAdminProjectPopup(false)}}>
    <div className="create-project-popup" onMouseEnter={()=>setCloseOk(false)} onMouseLeave={()=>setCloseOk(true)} >
        <h2 className='text-center '>Add New Project</h2>
     <div className="create-project-add">
      
      <div className="label-input">
        <label className="m-3" >Project Name</label>
        <input className="m-3 input-add" onChange={(e)=>setProjectName(e.target.value)} placeholder='Enter name'></input>
      </div>
      <div className="label-input">
        <label className="m-3" >Description</label>
        <input className="m-3 input-add" onChange={(e)=>setDescription(e.target.value)} placeholder='Enter Description'></input>
      </div>
      <div className="label-input">
        <label className="m-3">Start Date</label>
        <input className="m-3 input-add" type='date' onChange={(e)=>setStartDate(e.target.value)} placeholder='Enter start date'></input>
      </div>
      <div className="label-input">
        <label className="m-3" >End Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input className="m-3 input-add" type='date' onChange={(e)=>setEndDate(e.target.value)} placeholder='Enter end date'></input>
      </div>
    </div> 
    <div>
        <h3 className="m-3">Add Sub Task</h3>
        <div className="label-input-subtask">
            <div>

                <label className="m-3" >Enter SubTask Name</label>
                <input className="m-3 input-addsub" placeholder='Enter name' onChange={(e)=>setSubTask({id:new Date()+Math.random(),value:e.target.value,delete:false})} />
            </div>
            <div>
                <button className="add-subtask-button" onClick={()=>setSubTaskDatas([...subtaskDatas,subTask])}>+ Add subtask </button>
                <button className="add-subtask-button" onClick={()=>{let filterData=subtaskDatas.filter((obj)=>{return obj.delete===false});setSubTaskDatas(filterData)}}>Remove </button>
            </div>
        </div>
        <div className="subtask-data mt-4">
            <div className="subtask-data-headings p-1">
                <table>
                    <thead>
                        <tr>
                            <th>Name of Subtask</th>
                             <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        { subtaskDatas.map((obj,index)=>{

                            return (

                                
                                <tr className="ds-grid width-value">
                            <td>{obj.value ? obj.value : "-------"}</td>
                            <input className="check-box" type="checkbox" onChange={(e)=>{e.target.checked===true ? subtaskDatas[index]={id:obj.id,value:obj.value,delete:true} : subtaskDatas[index]={id:obj.id,value:obj.value,delete:false}}} />
                        </tr>
                                )
                                
                            })
                            }
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    <div className='text-center'>
     <button className="create-project-submit-button" onClick={createProject}>Submit</button>
    </div>
    </div>
    
  </div>
  )
}

export default AdminProjectPopup