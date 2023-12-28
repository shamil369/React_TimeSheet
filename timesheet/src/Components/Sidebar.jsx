import { useState } from 'react'
import './Sidebar.css'
import EntryPageMain from './EntryPageMain'
import {Link,Routes,Route} from 'react-router-dom'
import MyTask from './MyTask'


function Sidebar(){

    const [selectSidebarImage,setSelectSidebarImage] = useState("")
    const [selectSidebarMenu,setSelectSidebarMenu] = useState(false)

    return(
        <div className="sidebar-pages-cover">

        <div className="sidebar-background">
            <div className="sidebar-shortcut">
                <div>{selectSidebarMenu ? <img onClick={()=>setSelectSidebarMenu(false)} src="/close3.png" className="width-sidebar-menu"/> : <img onClick={()=>setSelectSidebarMenu(true)} src="/menu.svg" className="width-sidebar-menu"/>  }</div>
                <div><Link  to="/timepage"><img onClick={()=>setSelectSidebarImage("mytask")} src="/home.png" className={ selectSidebarImage==="mytask" ? "sidebar-img-select" : "width-sidebar-img" }/></Link></div>
                <div><Link to="/timepage/active"><img onClick={()=>setSelectSidebarImage("active")} src="/task.png" className={ selectSidebarImage==="active" ? "sidebar-img-select" : "width-sidebar-img" }/></Link></div>
                <div><Link to="/timepage/pending"><img onClick={()=>setSelectSidebarImage("pending")} src="/pendingTask.png" className= { selectSidebarImage==="pending" ? "sidebar-img-select" :  "width-sidebar-img" } /></Link></div>
                <div><Link to="/timepage/completed"><img onClick={()=>setSelectSidebarImage("completed")} src="/completedTask.png" className= { selectSidebarImage==="completed" ? "sidebar-img-select-sm" :  "width-sidebar-img-sm" } /></Link></div>
            </div>
            <div className={selectSidebarMenu? "sidebar" : "sidebar-none"}>
                <div><label className="width-sidebar-label-top">My Task</label></div>
                <div><Link className="text-decor" to="/timepage"><label onClick={()=>setSelectSidebarImage("mytask")} className={ selectSidebarImage==="mytask" ? "width-sidebar-label-selected" : "width-sidebar-label"} >Home</label></Link></div>
                <div><Link className="text-decor" to="/timepage/active"><label onClick={()=>setSelectSidebarImage("active")} className={ selectSidebarImage==="active" ? "width-sidebar-label-selected" : "width-sidebar-label"} >Active Task</label></Link></div>
                <div><Link className="text-decor" to="/timepage/pending"><label onClick={()=>setSelectSidebarImage("pending")} className={ selectSidebarImage==="pending" ? "width-sidebar-label-selected" : "width-sidebar-label"} >Pending Task</label></Link></div>
                <div><Link className="text-decor" to="/timepage/completed"><label onClick={()=>setSelectSidebarImage("completed")} className= { selectSidebarImage==="completed" ? "width-sidebar-label-selected" : "width-sidebar-label" } >Completed Task</label></Link></div>
            </div>
        </div>
        <div className='sidebar-pages'>
<div>

</div>
    
        </div>
        </div>
    )
}

export default Sidebar