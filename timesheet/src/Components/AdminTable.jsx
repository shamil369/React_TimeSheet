import React from 'react'
import './AdminTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
import axios from 'axios'


function AdminTable() {

    const [adminData,setAdminData] = useState();
    const [approve,setApprove] = useState()

    useEffect(()=>{
      const tokenvalue =  localStorage.getItem("validTokenadmin")
      const tokenjson = JSON.parse(tokenvalue);
      
      let token = {
          tokenjson:tokenjson
          
      }
      console.log("admin tokenfrom admin table:",token.tokenjson)
      axios.post("http://localhost:5000/adminData",token,{withCredentials:true}).then((res)=>{
            console.log("admindata:",res.data);
        
            let data = res.data;
            let requestData = data.filter((obj)=>{
                  return obj.status==="Requested"
                })
            setAdminData(requestData);
           
            console.log("adminData",adminData);
           
        }).catch((err)=>{
          console.log("axios error in admintable:",err)
        })

    },[approve])

    function approveTask(id){

      const tokenvalue =  localStorage.getItem("validTokenadmin")
      const tokenjson = JSON.parse(tokenvalue);
      
      let token = {
          tokenjson:tokenjson,
          taskId:id
      }
  
      console.log("approved task inside")
      axios.post("http://localhost:5000/approveTask",token,{withCredentials:true}).then((res)=>{
          console.log("approve task:",res.data)
           setApprove(id)
  
      })

    }
    


    return (
    <div className="admin-tab ">
        <h3 className="pt-4 pb-3">Approval Request</h3>
        <TableContainer component={Paper} className="admin-table-container">
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
          { adminData && adminData.map((row,index) => (
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
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left"><label onClick={()=>approveTask(row._id)} className="approve-button">Approve&nbsp;&#10004;</label></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}

export default AdminTable