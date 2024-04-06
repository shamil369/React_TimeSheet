import React,{memo} from 'react'
import NavbarEntryPage from "../Components/NavbarEntryPage"

import Sidebar from "../Components/Sidebar"
import MyprojectsUser from '../Components/MyprojectsUser'

function MyProjectsPage() {
  console.log("project page ")
  return (
    <div>
         <NavbarEntryPage/>
                <Sidebar/>
                <MyprojectsUser/>
    </div>
  )
}

export default  memo(MyProjectsPage)