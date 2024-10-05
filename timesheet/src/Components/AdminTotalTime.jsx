import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function AdminTotalTime() {
  const [allProject,setAllProject] = useState([])
  const [allUser,setAllUser] = useState([])
  const [allSubtask,setAllSubtask] = useState([])
  const [tableData,setTableData] = useState([])
  const [selectedDetails,setSelectedDetails] = useState({})
  
  const handleProjectSelection = (e)=>{
    setSelectedDetails((prev)=>({...prev,projectId:e.target.value}))
    alert(e.target.value)
    let selectedProject = allProject.find((item)=>item._id === e.target.value)
    setAllSubtask(selectedProject.subTask)
  //   const tokenvalue =  localStorage.getItem("validTokenadmin")
  //   const tokenjson = JSON.parse(tokenvalue);
    
  //   let token = {
  //       tokenjson:tokenjson,
      
  //   }
  //   axios.post("http://localhost:5000/getuserSubTaskById",{token,id:e.target.value},{withCredentials:true}).then((res)=>{
  //     console.log("get Project response:",res.data)
  //     setAllSubtask(res.data)
      
  // })
  }

  const handleUserSelection = (e)=>{
    setSelectedDetails((prev)=>({...prev,userId:e.target.value}))
  }

  const handleSubtaskSelection = (e)=>{
    setSelectedDetails((prev)=>({...prev,subTaskId:e.target.value}))
  }

  const handleViewTimelog = ()=>{
console.log(selectedDetails,"selected details object++")

    const tokenvalue =  localStorage.getItem("validTokenadmin")
    const tokenjson = JSON.parse(tokenvalue);
    
    let token = {
        tokenjson:tokenjson,
      
    }
    axios.post("http://localhost:5000/getuserSubTaskById",{token,...selectedDetails},{withCredentials:true}).then((res)=>{
      console.log("get TableDaatatt:",res.data)
      console.log("tabledaataa++++" ,tableData)
      setTableData(res.data[0].timespend)

      
  })

  }

  useEffect(()=>{
    const tokenvalue =  localStorage.getItem("validTokenadmin")
    const tokenjson = JSON.parse(tokenvalue);
    
    let token = {
        tokenjson:tokenjson,
      
    }

    // console.log("get project inside")
    axios.post("http://localhost:5000/getProject",token,{withCredentials:true}).then((res)=>{
        console.log("get Project response:",res.data)
        setAllProject(res.data)
    })

    axios.post("http://localhost:5000/adminAllUsers",token,{withCredentials:true}).then((res)=>{
      console.log("adminAllUsers adata:",res.data);
      setAllUser(res.data);
  }).catch((err)=>{
    console.log("axios error in adminAll user error:",err)
  })
  },[])

  return (
    <div className="container">
        <div className='mt-5'>
            <div className=''>
              <div className='bg-danger d-flex justify-content-between'>
                <div>
                <select class="form-select" aria-label="Default select example" onChange={handleProjectSelection}>
                  <option selected>Select Project</option>
                 { allProject.length>0 && allProject.map((projectobject)=>{
                   return(
                     <option value={`${projectobject._id}`}>{projectobject.projectName}</option>
                   )
                 })
                 }
                </select>  
                </div>
                <div>
                <select className="form-select" aria-label="size 3 select example" onChange={handleUserSelection} >
                  <option selected>Select User</option>
                  { allUser.length>0 && allUser.map((user)=>{
                    return(
                      <option value={`${user._id}`}>{user.email}</option>
                    )
                  })
                    }
                </select>  
                </div>
                <div>
                <select class="form-select" aria-label="Default select example" onChange={handleSubtaskSelection}>
                  <option selected>Select Subtask</option>
                  { allSubtask.length>0 && allSubtask.map((task)=>{
                    return(
                      <option value={`${task.subTaskId}`}>{task.subTaskName}</option>
                    )
                  })
                    }
                 
                </select>  
                </div>
            </div>
            <div className='bg-primary mt-2 text-center'>
              <button onClick={handleViewTimelog}>View Timelogs</button>
            </div>

            <TableContainer component={Paper} className="admin-completed-table-container">
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Day</TableCell>
        <TableCell align="left">Date</TableCell>
        <TableCell align="left">Start time</TableCell>
        <TableCell align="left">End time</TableCell>
        <TableCell align="left">Hours Worked</TableCell>
        {/* <TableCell align="left">End Date</TableCell>
        <TableCell align="left">Status</TableCell> */}
        <TableCell align="left"></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      { tableData && tableData.map((row,index) =>{ 

      let startDate = new Date(row.start)
      let endDate = new Date(row.end)
      let difference = ((((endDate - startDate)/1000)/60)/60)

        return(
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{row.day}</TableCell>
          <TableCell align="left">{row.date}</TableCell>
          <TableCell align="left">{startDate.toLocaleTimeString()}</TableCell>
          <TableCell align="left">{endDate.toLocaleTimeString()}</TableCell>
          <TableCell align="left">{difference.toFixed(2)}</TableCell>
          {/* <TableCell align="left">{row.deadline}</TableCell>
          <TableCell align="left"><span className="status-completed" > {row.status}</span></TableCell> */}
          <TableCell align="left"></TableCell>
        </TableRow>
      )})}
    </TableBody>
  </Table>
</TableContainer>

            
          </div>  
        </div>

    </div>
  )
}

export default AdminTotalTime
