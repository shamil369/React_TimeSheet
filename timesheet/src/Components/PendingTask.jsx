import "./PendingTask.css"
import Table from 'react-bootstrap/Table'
import { useEffect,useState } from "react"
import axios from 'axios'

function PendingTask(){

    let [pendingData,setPendingData] = useState()

    useEffect(()=>{
      
        const tokenvalue =  localStorage.getItem("validToken")
        const tokenjson = JSON.parse(tokenvalue);
        
        let token = {
            tokenjson:tokenjson
        }
    
        axios.post("http://localhost:5000/taskData",token,{withCredentials:true}).then((res)=>{
            console.log("taskdata:",res.data);
        
           const pendData = res.data.filter((data)=>{
                return data.status==="pending"
            })
            console.log("pendData",pendData)
            setPendingData(pendData);
           
            console.log("pending DAta:",pendingData);
           
        })
           
    },[])


    return (
        <div className="container">
            <div className="pending-background">
                <Table className="pending-background">
                <thead className="thead-pending">
                    
                    <th></th>
                    <th>Name</th>
                    <th>Project</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Approval</th>
        
                </thead>
                <tbody className="tbody-pending">
                  { pendingData && pendingData.map((obj)=>{

                    return (
                        <>
                    <td className="pd"></td>
                    <td className="pd">{obj.name? obj.name : ""}</td>
                    <td className="pd">{obj.project? obj.project : ""}</td>
                    <td className="pd">{obj.description? obj.description : ""}</td>
                    <td className="pd">{obj.startdate? obj.startdate : ""}</td>
                    <td className="pd">{obj.deadline? obj.deadline : ""}</td>
                    <td className="pd">{obj.status? obj.status : ""}</td>
                    <td className="pd"></td>
                    </>
                    )
                })
                }
                </tbody>

                </Table>
            </div>
            
        </div>
    )
}

export default PendingTask