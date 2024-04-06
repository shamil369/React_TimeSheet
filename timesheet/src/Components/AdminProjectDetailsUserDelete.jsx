import React from 'react';
import "./AdminProjectDetailsUserDelete.css"
import AsyncSelect from 'react-select/async' 
import { UilTrashAlt,UilUserPlus,UilEdit } from '@iconscout/react-unicons'
import Table from 'react-bootstrap/Table';
import axios from 'axios'

function AdminProjectDetailsUserDelete({setShowDeleteUser,setSubtaskDeletion,subtaskDeletion,setGiveAccess,selectedValue,fetchData,setSelectedValue,setInputValue,giveAccess,projectDatas}) {
 
     function deleteUserSubTask(deleteUsers,subtaskId,projectDatas){
        if(deleteUsers.length!==0){
            
            const userdeleteData = {
                deleteUsers,
                subtaskId,
                projectDatas
            
            }
            
            console.log("function working",projectDatas)
            axios.post("http://localhost:5000/deleteUserSubTask",userdeleteData,{withCredentials:true}).then((res)=>{
                console.log("adminprojectDetailUserDelete",res.data)
                setShowDeleteUser(false)
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
    <h4 className='mt-5'>Delete User From Projects</h4>
       <div className='assign-user-display'> 
       
           <label>Delete User for {subtaskDeletion.subTaskName} </label>
           <AsyncSelect cacheOptions defaultOptions className='width-select' value={selectedValue} loadOptions={fetchData} getOptionLabel={(e)=>e.email} getOptionValue={(e)=>e._id} onChange={(value)=>{setSelectedValue(value);console.log("selectedValue:",value)}} onInputChange={(value)=>{setInputValue(value);console.log("inputvalueValue:",value)}}/>
           
          { subtaskDeletion?  <button className='give-access-button' onClick={()=>setGiveAccess([...giveAccess,selectedValue])}>Give Access</button> : <button className='give-access-button' disabled onClick={()=>setGiveAccess([...giveAccess,selectedValue])}>Give Access</button> }
       </div>

       <div className="give-delete-access-table mt-4">
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
          { filteredGiveAccess.length === 0 ?  <button disabled className="give-access-button" onClick={()=>console.log("funtion not working")}>Submit</button> : <button className="give-access-button" onClick={()=>{deleteUserSubTask(filteredGiveAccess,subtaskDeletion.subTaskId,projectDatas);console.log("filtered give on submit",filteredGiveAccess);setGiveAccess([])}}>Submit</button> }
       </div>

</div>


  )
}

export default AdminProjectDetailsUserDelete