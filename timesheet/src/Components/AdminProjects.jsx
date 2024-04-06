import React,{useLayoutEffect,useEffect, useState} from 'react'
import './AdminProjects.css'
import AdminProjectPopup from './AdminProjectPopup'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import axios from 'axios';
import AdminProjectDetailsPopup from './AdminProjectDetailsPopup';
import AdminProjectEditPopup from './AdminProjectEditPopup';
import AdminProjectDeletePopup from './AdminProjectDeletePopup';

function AdminProjects() {

  const [adminprojectPopup,setAdminProjectPopup] = useState()
  const [projectDatas,setProjectDatas] = useState()
  const [detailedSubTask,setDetailedSubTask] = useState()
  const [adminprojectDetailsPopup,setAdminProjectDetailsPopup] = useState()
  const [whichProject,setWhichProject] = useState()
  const [adminProjectEditPopup,setadminProjectEditPopup] = useState()
  const [adminProjectDeletePopup,setAdminProjectDeletePopup] = useState()
  


    useEffect(()=>{

      const tokenvalue =  localStorage.getItem("validTokenadmin")
      const tokenjson = JSON.parse(tokenvalue);
      
      let token = {
          tokenjson:tokenjson,
        
      }
  
      console.log("get project inside")
      axios.post("http://localhost:5000/getProject",token,{withCredentials:true}).then((res)=>{
          console.log("get Project response:",res.data)
          
           setProjectDatas(res.data)
  
      })

    },[adminprojectPopup,adminProjectEditPopup,adminProjectDeletePopup])

   
    



  return (
    <div>
      { detailedSubTask && adminprojectDetailsPopup && <AdminProjectDetailsPopup projectDatas={whichProject}  detailedSubTask={detailedSubTask} setAdminProjectDetailsPopup={setAdminProjectDetailsPopup}/> }
      {adminprojectPopup && <AdminProjectPopup setAdminProjectPopup={setAdminProjectPopup} /> }
      { adminProjectEditPopup && whichProject && <AdminProjectEditPopup setadminProjectEditPopup={setadminProjectEditPopup} whichProject={whichProject} />}
      { adminProjectDeletePopup && whichProject && <AdminProjectDeletePopup setAdminProjectDeletePopup={setAdminProjectDeletePopup} whichProject={whichProject} /> }
      <div className="container mt-5">
        <div className={projectDatas ?"create-project-with-data":"create-project"}>
          <div className="create-project-button-background">
            <button className="create-project-button " onClick={()=>setAdminProjectPopup(true)}>create project</button>
          </div>
          <div className="create-project-data">
           
          </div>
          <div>
             <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell >Description</TableCell>
                    <TableCell >Start Date</TableCell>
                    <TableCell >End Date</TableCell>
                    <TableCell > </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectDatas && projectDatas.map((row,index) => {

                   let start = row.startDate.split("-").reverse().join("-")
                   let end = row.endDate.split("-").reverse().join("-")
                   console.log("date",start)
                    return (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.projectName}
                      </TableCell>
                      <TableCell >{row.description}</TableCell>
                      <TableCell >{start}</TableCell>
                      <TableCell >{end}</TableCell>
                      <TableCell >
                        <button className="edit-details-button" onClick={()=>{setadminProjectEditPopup(true);setWhichProject(row)}}>Edit</button>
                        <button className="see-details-button" onClick={()=>{setDetailedSubTask(row.subTask);setAdminProjectDetailsPopup(true);setWhichProject(row)}}>See Details</button>
                        <button className="delete-details-button" onClick={()=>{setAdminProjectDeletePopup(true);setWhichProject(row)}}>Delete</button>
                      
                      </TableCell>
                    </TableRow>
                )  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

    </div>
  </div>
  )
}

export default AdminProjects