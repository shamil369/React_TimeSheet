import "./CompletedTask.css"
import Table from 'react-bootstrap/Table'
import { useEffect,useState } from "react"
import axios from 'axios'

function CompletedTask(){

    let [completedData,setCompletedData] = useState()

    useEffect(()=>{
      
        const tokenvalue =  localStorage.getItem("validToken")
        const tokenjson = JSON.parse(tokenvalue);
        
        let token = {
            tokenjson:tokenjson
        }
    
        axios.post("http://localhost:5000/taskData",token,{withCredentials:true}).then((res)=>{
            console.log("taskdata:",res.data);
        
           const completeData = res.data.filter((data)=>{
                return data.status==="completed"
            })
            console.log("completeData",completeData)
            setCompletedData(completeData);
           
            console.log("completed DAta:",completedData);
           
        })
           
    },[])


    return (
        
  <div className="container">
            <div className="completed-background">
                <Table className="completed-background">
                <thead className="thead-completed">
                    
                    <th></th>
                    <th>Name</th>
                    <th>Project</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Approval</th>
        
                </thead>
                <tbody className="tbody-completed">
                  { completedData && completedData.map((obj)=>{

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
export default CompletedTask