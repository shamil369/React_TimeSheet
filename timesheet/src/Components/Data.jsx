import './Data.css'
import {useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import DeletePopup from './DeletePopup'
import EditPopup from './EditPopup'

function Data({setPopClick,popClick}){

     const [dataFromDB,setDataFromDB] = useState();
     const [request,setRequest] = useState(false);
     const [updatePopup,setUpdatePopup] = useState(false);
     const [deletePopup,setDeletePopup] = useState(false);
     const [deleteID,setDeleteID] = useState();
     const [updateID,setUpdateID] = useState();
     const [updatePlaceholderData,setUpdatePlaceholderData] = useState();

  

     useEffect(()=>{
        const tokenvalue =  localStorage.getItem("validToken")
        const tokenjson = JSON.parse(tokenvalue);
        
        let token = {
            tokenjson:tokenjson
        }
      
        console.log("tokenvalueeee data:",token.tokenjson)
        axios.post("http://localhost:5000/taskData",token,{withCredentials:true}).then((res)=>{
            console.log("taskdata:",res.data);
        
            setDataFromDB(res.data);
           
            console.log("datFromDB",dataFromDB);
           
        })
        console.log("datFromDB 2 2:",dataFromDB);
     },[popClick,updatePopup,deletePopup,request])
     console.log("datFromDB 33:",dataFromDB);
 console.log("deleteee:",deleteID)
   

 function requestApproval(id){

    const tokenvalue =  localStorage.getItem("validToken")
    const tokenjson = JSON.parse(tokenvalue);
    
    let token = {
        tokenjson:tokenjson,
        taskId:id
    }

    console.log("approval function9i inside")
    axios.post("http://localhost:5000/requestApproval",token,{withCredentials:true}).then((res)=>{
        console.log("request approval:",res.data)
        setRequest(id)

    })


 }



    return (
<div>
        { updatePopup && <EditPopup setUpdatePopup={setUpdatePopup} updateID={updateID} updatePlaceholderData={updatePlaceholderData}/>}
        { deletePopup && <DeletePopup setDelete={setDeletePopup} deleteID={deleteID} />}
    <div>
    <div className="container pt-5">
        <div className="data-head">
            <button onClick={()=>setPopClick(true)}className="data-add-button">+ Add New Task </button>    
        </div>
                <div>
                <Table>
                    <thead className="details-head" >
                        <th>Name</th>
                        <th>Project</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </thead>
            {
                dataFromDB &&  dataFromDB.map((obj,index)=>{

                        let date = new Date(obj.deadline);
                        let dead =date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear()

                        let start = new Date(obj.startdate);
                        let startdate = start.getDate() + "-" + (start.getMonth()+1) + "-" + start.getFullYear()

                        return(
                                <thead className="details-head" key={index}>
                                    <th>{obj.name ? obj.name : ""}</th>
                                    <th>{obj.project ? obj.project : ""}</th>
                                    <th>{obj.description ? obj.description : ""}</th>
                                    <th>{obj.startdate ? startdate : ""}</th>
                                    <th>{obj.deadline ? dead : ""}</th>
                                    <th>{obj.status ? obj.status : ""}</th>
                                    <th><img onClick={()=>{setDeletePopup(true);setDeleteID(obj._id)}} src="/delete.svg" alt="" /><img onClick={()=>{setUpdatePopup(true);setUpdateID(obj._id);setUpdatePlaceholderData({
                                        name:obj.name,
                                        project:obj.project,
                                        description:obj.description,
                                        startdate:obj.startdate,
                                        deadline:obj.deadline
                                    })}} src="/edit.svg" alt="" /></th>
                                    <th ><label onClick={()=>requestApproval(obj._id)} className="button-request">{obj.status==="Requested"? "Requested" : "Request"}</label></th>
                                </thead> 
                            )
                    })
                }
                            
                </Table>
                </div>
    </div>    
    </div>
    </div>
    )
}

export default Data