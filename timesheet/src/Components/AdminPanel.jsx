import './AdminPanel.css'
import { Navigate,useNavigate } from "react-router-dom"
import AdminSidebar from './AdminSidebar'


function AdminPanel({children}){

const navigate = useNavigate()

return (
<div className="admin-panel-background">
    <div className="admin-panel-glass">
        <AdminSidebar/>
        <div>
        
            <div>
            {children}
            </div>
        </div>
        <div>

        </div>
        
      
    
    </div>
</div>
        )
}

export default AdminPanel