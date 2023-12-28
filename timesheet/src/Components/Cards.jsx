import React,{useEffect,useState} from 'react'
import './Cards.css'
import { cardData } from '../Data/Data'
import Card from './Card'
import axios from 'axios';
import {UilEstate,UilCheckCircle,UilProcess,UilUsersAlt,UilPackage,UilChart,UilSignOutAlt,UilUsdSquare} from '@iconscout/react-unicons'


function Cards() {

  const [dataCard,setDataCard] = useState();
  const [dataForCard,setDataForCard] = useState();

  
useEffect(()=>{
  const tokenvalue =  localStorage.getItem("validTokenadmin")
      const tokenjson = JSON.parse(tokenvalue);
      
      let token = {
          tokenjson:tokenjson
          
      }

axios.post("http://localhost:5000/allTask",token,{withCredentials:true}).then((res)=>{
  console.log("card data",res.data)

  let dataCard = res.data

  let totalData = dataCard.length
let completeData = dataCard.filter((obj)=>{
  return obj.status==="Completed"
})
let completeDatalength = completeData.length
let activeData = dataCard.filter((obj)=>{
  return obj.status==="Completed"
}).length

let pendingData = dataCard.filter((obj)=>{
  return obj.status==="pending"
}).length
setDataForCard( [
{
  title:"Completed",
  color:{
      background:"linear-gradient(180deg,#bb67ff,#c484f3)",
      boxshadow:"0px 10px 20px 0px #e0c6f5",    
      },
  barvalue:parseInt((completeDatalength/totalData)*100),
  value:`Total ${totalData}`,
  png: UilUsdSquare,
  series:[parseInt((completeDatalength/totalData)*100) ,100],

},
{
  title:"Pending",
  color:{
      background:"linear-gradient(180deg,#bb67ff,#c484f3)",
      boxshadow:"0px 10px 20px 0px #e0c6f5",    
      },
  barvalue:parseInt((pendingData/totalData)*100),
  value:`Total ${totalData}`,
  png: UilUsdSquare,
  series:[parseInt((pendingData/totalData)*100) ,100],

},
{
  title:"Active",
  color:{
      background:"linear-gradient(180deg,#bb67ff,#c484f3)",
      boxshadow:"0px 10px 20px 0px #e0c6f5",    
      },
  barvalue:parseInt((activeData/totalData)*100),
  value:`Total ${totalData}`,
  png: UilUsdSquare,
  series:[ parseInt((activeData/totalData)*100),100],

},

])


})


},[dataCard])



  return (
    <div className='cards'>
      {dataForCard && dataForCard.map((card,index)=>{
        return (
          <div key={index} className="parent-card">
            <Card  title={card.title} color={card.color} barvalue={card.barvalue} value={card.value} png={card.png} series={card.series} />
          </div>
        )
      })}
    </div>
  )
}

export default Cards