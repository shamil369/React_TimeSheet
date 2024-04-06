import React from 'react'
import { UilTrashAlt,UilUserPlus,UilEdit } from '@iconscout/react-unicons'
import Table from 'react-bootstrap/Table';
import AsyncSelect from 'react-select/async' 
import './AdminProjectDetailsUserPopup.css'
import axios from 'axios'

function AdminProjectDetailsUserPopup({setShowAddUser,setGiveAccess,selectedValue,fetchData,setSelectedValue,setInputValue,giveAccess,subtaskSelection,setSubtaskSelection,projectDatas}) {
  
   async function userSubTask(userAllocated,taskId,projectDetail){
       if(userAllocated.length!==0){
           const userSubTaskData = {
               userAllocated,
               taskId,
               projectDetail
            }
            console.log("function working",)
            axios.post("http://localhost:5000/userSubTask",userSubTaskData,{withCredentials:true}).then((res)=>{
                console.log("adminprojectDetailUserPopup",res.data)
                setShowAddUser(false)
            
        }).catch((err)=>{
            console.log("adminproject detailuserpop usersubtask axios error",err)
        })
    }else{
        console.log("filtered value has no value in function")
    }
    }
  
    const filteredGiveAccess = giveAccess.filter((obj, index, arr) => {
        return arr.map(mapObj => mapObj._id).indexOf(obj._id) === index;
                })
  
  
    return (
    <div>
         <h4 className='mt-5'>Assign User to Projects</h4>
            <div className='assign-user-display'> 
            
                <label>Select a User for {subtaskSelection.subTaskName} </label>
                <AsyncSelect cacheOptions defaultOptions className='width-select' value={selectedValue} loadOptions={fetchData} getOptionLabel={(e)=>e.email} getOptionValue={(e)=>e._id} onChange={(value)=>{setSelectedValue(value);console.log("selectedValue:",value)}} onInputChange={(value)=>{setInputValue(value);console.log("inputvalueValue:",value)}}/>
                
               { subtaskSelection?  <button className='give-access-button' onClick={()=>setGiveAccess([...giveAccess,selectedValue])}>Give Access</button> : <button className='give-access-button' disabled onClick={()=>setGiveAccess([...giveAccess,selectedValue])}>Give Access</button> }
            </div>

            <div className="give-access-table mt-4">
            <Table striped="columns" hover>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Email</th>
                    <th>Firstname</th>
                    <th>LastName</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {   filteredGiveAccess && filteredGiveAccess.map((obj,index)=>

                    <tr>
                    <td>{index+1}</td>
                    <td>{obj.email}</td>
                    <td>{obj.firstname}</td>
                    <td>{obj.lastname}</td>
                    <td onClick={()=>{filteredGiveAccess.splice(index,1);setGiveAccess([...filteredGiveAccess])}}><UilTrashAlt/></td>

                    </tr>
                        )
                    }
                </tbody>
            </Table>
          
            </div>
            <div className='text-center mt-2'>
               { filteredGiveAccess.length === 0 ?  <button disabled className="give-access-button" onClick={()=>console.log("funtion not working")}>Submit</button> : <button className="give-access-button" onClick={()=>{userSubTask(filteredGiveAccess,subtaskSelection.subTaskId,projectDatas);console.log("filtered give on submit",filteredGiveAccess);setGiveAccess([])}}>Submit</button> }
            </div>

    </div>
  )
}

export default AdminProjectDetailsUserPopup