import React from 'react'
import './AdminSidebar.css'
import {sidebarData} from '../Data/Data'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function AdminSidebar() {

    const [selected,setSelected] = useState(0)

    const navigate = useNavigate();

  return (
    <div className="admin-sidebar">
        <div className="admin-sidebar-logo">
            <img src="/timelogo.png" alt="sidebarLogo" width='40' height="40"/>
            <span>TimeSheet</span>

        </div>
        <div className="admin-sidebar-menu">
            { sidebarData.map((item,index)=>{

                return (
            <div key={index} onClick={()=>{setSelected(index);navigate(item.path);}} className={selected ===index ? "admin-sidebar-menuitem active" : "admin-sidebar-menuitem"}>
                <div>
                    <item.icon/>
                </div>
                <span>{item.heading}</span>
            </div>
            )}) }             
        </div>

    </div>
  )
}

export default AdminSidebar