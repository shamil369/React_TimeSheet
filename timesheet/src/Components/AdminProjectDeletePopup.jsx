import React from 'react'
import './AdminProjectDeletePopup.css'
import axios from 'axios'

function AdminProjectDeletePopup({setAdminProjectDeletePopup,whichProject}) {

 
    function deleteProject(id){

        axios.delete(`http://localhost:5000/deleteProject/${id}`,{withCredentials:true}).then((res)=>{
            console.log("adminprojecDelete Delete response",res.data)
            setAdminProjectDeletePopup(false)
          }).catch(err=>console.log("errr in axios in adminDeleteprojectPopup",err))

    }

  return (
    <div className="admin-project-delete-popup-background">
        <div className='admin-project-delete-popup'>
            <label>Are You sure to delete it?</label>
            <div className='admin-project-delete-popup-buttons'>
                <button className='m-3' onClick={()=>deleteProject(whichProject._id)}>Yes</button>
                <button className='m-3' onClick={()=>{setAdminProjectDeletePopup(false)}}>No</button>
            </div>
        </div>
    </div>
  )
}

export default AdminProjectDeletePopup