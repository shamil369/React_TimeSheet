import { useState, useContext } from "react";
import Popup from './Popup'
import Data from './Data'
import Table from 'react-bootstrap/Table'
import NavbarEntryPage from "./NavbarEntryPage";
import Sidebar from "./Sidebar";

function MyTask(){


    const [popClick,setPopClick] = useState(false);
    return(
        <div>
                { popClick &&  <Popup setPopClick={setPopClick}/> }
                <NavbarEntryPage/>
                <Sidebar/>
                
                <div className="mytask-cover">

                <Data setPopClick={setPopClick} popClick={popClick} />

                {/* <div class>
                    <Table  >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </div> */}


            </div>
        </div>    
    )
}

export default MyTask