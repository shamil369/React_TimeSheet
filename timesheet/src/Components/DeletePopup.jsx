import axios from 'axios'
import './DeletePopup.css'

function DeletePopup({setDelete,deleteID}){


    async function deleteTask(){
        console.log("delete id:",deleteID)
        let res = await axios.delete(`http://localhost:5000/deleteTask/${deleteID}`,{withCredentials:true})
            console.log("delete recieved",res);
            

        setDelete(false)
    }


    return(

    <div className="delete-popup-background">
        <div className='delete-popup'>
            <div className="close-button"><img className="close-image" onClick={()=>setDelete(false)} src="/close.svg" alt="close"/></div>
            <div className="text-center fs"><label >Delete Task?</label></div>
            <div className="delete-popup-label-div">
            <label >Are you sure you want to delete?</label>
           </div>
            <div className="button-div">
                <input className="button" type="submit" value="Delete" onClick={deleteTask}/>
            </div>
        </div>
    </div>
    )
}

export default DeletePopup