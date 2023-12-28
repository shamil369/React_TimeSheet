
import NavbarEntryPage from "../Components/NavbarEntryPage"
import ActiveTask from "../Components/ActiveTask"
import Sidebar from "../Components/Sidebar"

function ActiveTaskPage(){
    return (
            <div>
                <NavbarEntryPage/>
                <Sidebar/>
                <ActiveTask/>
            </div>
    )
}

export default ActiveTaskPage