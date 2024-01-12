import "./ActiveTask.css"
import Table from 'react-bootstrap/Table'
import { useEffect,useState } from "react"
import axios from 'axios'

function ActiveTask(){

    let [activeData,setActiveData] = useState()

    useEffect(()=>{
      
        const tokenvalue =  localStorage.getItem("validToken")
        const tokenjson = JSON.parse(tokenvalue);
        
        let token = {
            tokenjson:tokenjson
        }
    
        axios.post("http://localhost:5000/taskData",token,{withCredentials:true}).then((res)=>{
            console.log("taskdata:",res.data);
        
           const actData = res.data.filter((data)=>{
                return data.status==="Active"
            })
            console.log("actData",actData)
            setActiveData(actData);
           
            console.log("active DAta:",activeData);
           
        })
           
    },[])


    return (
        
  <div className="container">
            <div className="active-background">
                <Table className="active-background">
                <thead className="thead-active">
                    
                    <th></th>
                    <th>Name</th>
                    <th>Project</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    
        
                </thead>
                <tbody className="tbody-active">
                  { activeData && activeData.map((obj)=>{

                    return (
                        <>
                    <td className="pd"></td>
                    <td className="pd">{obj.name? obj.name : ""}</td>
                    <td className="pd">{obj.project? obj.project : ""}</td>
                    <td className="pd">{obj.description? obj.description : ""}</td>
                    <td className="pd">{obj.startdate? obj.startdate : ""}</td>
                    <td className="pd">{obj.deadline? obj.deadline : ""}</td>
                    <td className="pd">{obj.status? obj.status : ""}</td>
                    
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
export default ActiveTask