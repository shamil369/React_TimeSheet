import NavbarEntryPage from "../Components/NavbarEntryPage"
import CompletedTask from "../Components/CompletedTask"
import Sidebar from "../Components/Sidebar"

function CompletedTaskPage(){
    return(
        <div>
             <NavbarEntryPage/>
                <Sidebar/>
                <CompletedTask/>
        </div>
    )
}

export default CompletedTaskPage