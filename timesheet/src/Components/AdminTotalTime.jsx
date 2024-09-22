import React, { useEffect,useState } from 'react'
import axios from 'axios'
function AdminTotalTime() {
  const [allProject,setAllProject] = useState([])
  const [allUser,setAllUser] = useState([])

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
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select Project</option>
                 { allProject.length>0 && allProject.map((projectobject)=>{
                   return(
                     <option value="1">{projectobject.projectName}</option>
                   )
                 })
                 }
                </select>  
                </div>
                <div>
                <select class="form-select" aria-label="Default select example" size="5">
                  <option selected>Select User</option>
                  { allUser.length>0 && allUser.map((user)=>{
                    return(
                      <option value="1">{user.email}</option>
                    )
                  })
                    }
                </select>  
                </div>
                <div>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select Subtask</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>  
                </div>
            </div>
            <div className='bg-primary mt-2 text-center'>
              <button>View Timelogs</button>
            </div>
          </div>  
        </div>

    </div>
  )
}

export default AdminTotalTime
