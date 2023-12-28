import React from 'react'
import './AdminPendingTask.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
import axios from 'axios'

function AdminPendingTask() {

    const [adminPendingData,setAdminPendingData] = useState();

    useEffect(()=>{
        const tokenvalue =  localStorage.getItem("validTokenadmin")
        const tokenjson = JSON.parse(tokenvalue);
        
        let token = {
            tokenjson:tokenjson
            
        }
        console.log("admin tokenfrom adminPending task table:",token.tokenjson)
        axios.post("http://localhost:5000/adminData",token,{withCredentials:true}).then((res)=>{
              console.log("adminpendingdata:",res.data);
          
              let data = res.data;
              let requestData = data.filter((obj)=>{
                    return obj.status==="pending"
                  })
              setAdminPendingData(requestData);
             
              console.log("adminDatapendingtask",adminPendingData);
             
          }).catch((err)=>{
            console.log("axios error in adminpendingtasktable:",err)
          })
  
      },[])


  return (
    <div className="admin-pending-tab container ">
    <h3 className="pt-4 pb-3">Pending Tasks</h3>
    <TableContainer component={Paper} className="admin--table-container">
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="left">Email</TableCell>
        <TableCell align="left">Project</TableCell>
        <TableCell align="left">Description</TableCell>
        <TableCell align="left">Start Date</TableCell>
        <TableCell align="left">End Date</TableCell>
        <TableCell align="left">Status</TableCell>
        <TableCell align="left"></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      { adminPendingData && adminPendingData.map((row,index) => (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{row.name}</TableCell>
          <TableCell align="left">{row.email}</TableCell>
          <TableCell align="left">{row.project}</TableCell>
          <TableCell align="left">{row.description}</TableCell>
          <TableCell align="left">{row.startdate}</TableCell>
          <TableCell align="left">{row.deadline}</TableCell>
          <TableCell align="left"><span className="status-pending" > {row.status}</span></TableCell>
          <TableCell align="left"></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

</div>
  )
}

export default AdminPendingTask