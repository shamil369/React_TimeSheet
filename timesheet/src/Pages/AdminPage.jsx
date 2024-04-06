import {Route, Routes ,useNavigate } from "react-router-dom"
import AdminNavbar from '../Components/AdminNavbar'
import AdminPanel from '../Components/AdminPanel'
import AdminEdit from '../Components/AdminEdit'
import AdminMain from "../Components/AdminMain"
import AdminCompletedTask from "../Components/AdminCompletedTask"
import AdminPendingTask from "../Components/AdminPendingTask"
import AdminActiveTask from "../Components/AdminActiveTask"
import SignIn from './SignIn'
import AdminAllUsers from "../Components/AdminAllUsers"
import AdminProjects from "../Components/AdminProjects"

function AdminPage(){

    

    if(!localStorage.getItem("validTokenadmin")){
        return <SignIn />
    }
    return (
        <div>
            <AdminNavbar/>
            <AdminPanel>
                <Routes>
                    

                    <Route path="" Component={AdminMain}/>                
                    <Route path="edit" Component={AdminEdit}/>
                    <Route path="completed" Component={AdminCompletedTask}/>
                    <Route path="pending" Component={AdminPendingTask}/>
                    <Route path="activ" Component={AdminActiveTask}/>
                    <Route path="users" Component={AdminAllUsers}/>
                    <Route path="project" Component={AdminProjects}/>
                </Routes>
            </AdminPanel>

        </div>

    )
}

export default AdminPage