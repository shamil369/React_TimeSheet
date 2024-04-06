import React from 'react'

import './AdminAllUsers.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
import axios from 'axios'
import NewUserPopup from './NewUserPopup';

function AdminAllUsers() {

    const [adminAllUsers,setAdminAllUsers] = useState();
    const [deleteIcon,setDeleteIcon] = useState(false);
    const [deletionOk,setDeletionOk] = useState();
    const [insertionOk,setInsertionOk] = useState();
    const [newUserPopup,setNewUserPopup] = useState();

    useEffect(()=>{
        const tokenvalue =  localStorage.getItem("validTokenadmin")
        const tokenjson = JSON.parse(tokenvalue);
        
        let token = {
            tokenjson:tokenjson
            
        }
        console.log("admin tokenfrom adminactive task table:",token.tokenjson)
        axios.post("http://localhost:5000/adminAllUsers",token,{withCredentials:true}).then((res)=>{
              console.log("adminAllUsers adata:",res.data);
          
              
             
              setAdminAllUsers(res.data);
             
              console.log("admin all user",adminAllUsers);
             
          }).catch((err)=>{
            console.log("axios error in adminAll user error:",err)
          })
  
      },[deletionOk,insertionOk])

      function deleteUser(id){
          // alert("delete "+id)
          const deleteId = {
            id:id
          }
        axios.post("http://localhost:5000/deleteUser",deleteId,{withCredentials:true}).then((res)=>{
          // alert("deleted respone"+res)
          setDeletionOk(id);
        })

      }

  return (
    <div className="container ">
     { newUserPopup && <NewUserPopup setInsertionOk={setInsertionOk} setNewUserPopup={setNewUserPopup}/> }
    <h3 className="pt-4 pb-3">All Users</h3>
    <div className="text-end mb-2 mt-1" ><button className="new-user-button" onClick={()=>setNewUserPopup(true)} >+ New User</button></div>
    <TableContainer component={Paper} className="admin-alluser-table-container" >
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Firstname</TableCell>
        <TableCell align="left">Lastname</TableCell>
        <TableCell align="left">Email Id</TableCell>
       
      </TableRow>
    </TableHead>
    <TableBody>
      { adminAllUsers && adminAllUsers.map((row,index) => (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{row.firstname}</TableCell>
          <TableCell align="left">{row.lastname}</TableCell>
          <TableCell align="left">{row.email}</TableCell>
          <TableCell align="left">{deleteIcon ===row._id ?<img onClick={()=>{deleteUser(row._id)}}  onMouseLeave={()=>setDeleteIcon(false)} className="delete-change" src="/deletegif.gif" alt="Delete icon" width="40" height="40" />:<img onMouseEnter={()=>setDeleteIcon(row._id)} className="delete-change" src="/deletenogif.svg" alt="Delete icon" width="40" height="40"/> } <button className="assign-task-button">Assign Task</button></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</div>
  )
}

export default AdminAllUsers