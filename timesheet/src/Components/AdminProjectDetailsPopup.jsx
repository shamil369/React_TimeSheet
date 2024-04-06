import React, { useEffect, useState } from 'react'
import './AdminProjectDetailsPopup.css'
import AsyncSelect from 'react-select/async' 
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { UilTrashAlt,UilUserPlus,UilEdit } from '@iconscout/react-unicons'
import AdminProjectDetailsUserPopup from './AdminProjectDetailsUserPopup';
import AdminProjectDetailsUserDelete from './AdminProjectDetailsUserDelete';


function AdminProjectDetailsPopup({projectDatas,detailedSubTask,setAdminProjectDetailsPopup}) {

    const [clickOk,setClickOk] = useState(true)
    const [selectedValue,setSelectedValue] = useState();
    const [inputValue,setInputValue] = useState();
    const [giveAccess,setGiveAccess] = useState([]);
    const [showAddUser,setShowAddUser] = useState();
    const [showDeleteUser,setShowDeleteUser] = useState();
    const [subtaskSelection,setSubtaskSelection] = useState();
    const [subtaskDeletion,setSubtaskDeletion] = useState();
    const [userGivenTask,setUserGivenTask] = useState();

    useEffect(()=>{

        const tokenvalue =  localStorage.getItem("validTokenadmin")
        const tokenjson = JSON.parse(tokenvalue);
      
      let token = {
          tokenjson:tokenjson,
        
      }
        axios.post("http://localhost:5000/getuserSubTask",token,{withCredentials:true}).then((res)=>{
                  setUserGivenTask(res.data)
        }).catch((err)=>{
            console.log("admin project detail popup getusersubtask error",err)
        })



    },[showAddUser,giveAccess])

    console.log("detailed popup",detailedSubTask)

    async function fetchData() {

        const tokenvalue =  localStorage.getItem("validTokenadmin")
        const tokenjson = JSON.parse(tokenvalue);
        
        let token = {
            tokenjson:tokenjson
            
        }
        console.log("admin tokenfrom assign user:",token.tokenjson)
       return axios.post("http://localhost:5000/adminAllUsers",token,{withCredentials:true}).then((res)=>{
              console.log("adminAllUsers detaILPOPUP adata:",res.data);
                const val = res.data 
              return val
          }).catch((err)=>{
            console.log("axios error in adminAll user error in assign task user:",err)
          })
    }

   

  return (
    <div className="details-popup-background" onClick={()=>clickOk && setAdminProjectDetailsPopup(false)}>
        <div className="details-content" onMouseEnter={()=>setClickOk(false)} onMouseLeave={()=>setClickOk(true)}>
        <h4 className='mt-3 mb-3'>Sub Task in the Project</h4>
            <div className='details-content-subtasklist'>
                <table style={{backgroundColor:"blue",width:"100%"}} className="table" >
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Name of Sub Task</td>
                            <td>User Given</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
            {
               detailedSubTask.map((obj,index)=>{
                
                return (
                            <tr> 
                                <td  >{index+1}</td>
                                <td  >{obj.subTaskName}</td>
                                <td className="user-given" >{userGivenTask && userGivenTask.map((obj2)=>obj2.idofsubtask===obj.subTaskId && `${obj2.userdata.email} `)}</td>
                                <td  ><UilUserPlus className="" onClick={()=>{showAddUser ? setShowAddUser(false) : setShowAddUser(true);setShowDeleteUser(false);  setSubtaskSelection(obj);setGiveAccess([])}}/> <UilTrashAlt onClick={()=>{showDeleteUser ? setShowDeleteUser(false): setShowDeleteUser(true);setShowAddUser(false);setSubtaskDeletion(obj);setGiveAccess([])}}/> <UilEdit/></td>
                                <td  ></td>
                            </tr>
                    )
                })
            }
            </tbody>
            </table>
            </div>
         
           { showAddUser && <AdminProjectDetailsUserPopup setShowAddUser={setShowAddUser} projectDatas={projectDatas} setSubtaskSelection={setSubtaskSelection} subtaskSelection={subtaskSelection} setGiveAccess={setGiveAccess} giveAccess={giveAccess} selectedValue={selectedValue} fetchData={fetchData} setSelectedValue={setSelectedValue} setInputValue={setInputValue} /> }
           { showDeleteUser && <AdminProjectDetailsUserDelete setShowDeleteUser={setShowDeleteUser} setSubtaskDeletion={setSubtaskDeletion} subtaskDeletion={subtaskDeletion} projectDatas={projectDatas} setGiveAccess={setGiveAccess} giveAccess={giveAccess} selectedValue={selectedValue} fetchData={fetchData} setSelectedValue={setSelectedValue} setInputValue={setInputValue} /> }

           


        </div>
    </div>
  )
}

export default AdminProjectDetailsPopup