import axios from 'axios';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect,useState } from 'react';
import {Link } from 'react-router-dom'
import MyProjectUserView from './MyProjectUserView';
function MyprojectsUser() {
  const [projectArray,setProjectArray] = useState([])
  const [selectedProject,setSelectedProject] = useState();

  useEffect(()=>{
    
    const tokenvalue =  localStorage.getItem("validToken")
    const tokenjson = JSON.parse(tokenvalue);
    
    
    let token = {
        tokenjson:tokenjson
      
    }
  
    axios.post("http://localhost:5000/SubTaskPerUser",token,{withCredentials:true}).then(res=>{
      console.log("myprojectuser ",res.data)
      setProjectArray(res.data)
    })

  },[])

  return (
    <div className='container p-5 d-flex '>
      {selectedProject!==undefined && <MyProjectUserView project={selectedProject} setSelectedProject={setSelectedProject}/>}
      { projectArray.length!==0 && projectArray.map((item,index)=>{
        return (
      <div className='m-2 ' onClick={()=>setSelectedProject(item)}>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/task.png" />
      <Card.Body>
        <Card.Title>{item.projectName}</Card.Title>
        <Card.Text>
         {item.description}
        </Card.Text>
      <Button variant="primary" onClick={()=>setSelectedProject(item)}>View</Button>
      </Card.Body>
    </Card>
      </div>
        )
      })
      
}
    </div>
  )
}

export default MyprojectsUser