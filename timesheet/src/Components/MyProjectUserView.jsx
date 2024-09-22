import React,{useCallback, useState,useEffect} from 'react'
import './MyProjectUserView.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stopwatch from './Stopwatch';
import { useStopwatch } from 'react-timer-hook';
import axios from 'axios'

function MyProjectUserView({project,setSelectedProject}) {
    const[closeOk,setCloseOK]=useState(true)
    const[timer,setTimer]=useState(true);
    const[Array,setArray]=useState([]);
    const[dummyArray,setDummyArray]=useState([]);

    let stowatchOffset = new Date();
    stowatchOffset.setSeconds(stowatchOffset.getSeconds() + 300)
const {
   totalSeconds,
   seconds,
   minutes,
   hours,
   isRunning,
   start,
   pause,
   reset,
 } = useStopwatch({ stowatchOffset });


    // const timeStatus =useCallback((value) =>{
    //     setTimer(value)
    // },[])
    console.log("myprojectuserView", project)
    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Saturday"]
    let date = new Date();
    let currentDate = date.getDate() + "-"+(date.getMonth()+Number(1))+"-"+date.getFullYear();
    let day=days[date.getDay()]
    let starttime ="";
    console.log("datee",date)
    let stopwatchOffset = new Date();
    console.log("stopwatchOffset",stopwatchOffset)
    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300)

    const addTimespend = (id,object,subtaskId)=>{
      axios.post("http://localhost:5000/addTimespend",{id,object},{withCredentials:true}).then(res=>{
        console.log("timespen axios",res.data)
        getUserSubTask(project._id,subtaskId)
      })

    }

    const startTimespend = (id,index,object)=>{
      axios.post("http://localhost:5000/startTimespend",{id,index,object},{withCredentials:true}).then(res=>{
        console.log("start timespen axios",res.data)
        setArray(res.data)
      })
    }

    const stopTimespend =(id,index,object)=>{
      axios.post("http://localhost:5000/stopTimespend",{id,index,object},{withCredentials:true}).then(res=>{
        console.log("stop timespen axios",res.data)
        setArray(res.data)
      })
    }
    
    const getUserSubTask = (projectid,subtaskid)=>{
      console.log("++++++++++++++getYserSubTask")
      const tokenvalue =  localStorage.getItem("validToken")
        const tokenjson = JSON.parse(tokenvalue);
        
        let object = {
            tokenjson:tokenjson,
            projectid,
            subtaskid
        }
      axios.post("http://localhost:5000/userSubtaskperid",object,{withCredentials:true}).then((res)=>{
        console.log("response in getusersubtask",res.data)
        setArray(res.data)
      }).catch(err=>console.log("error in getusersubtask",err))
    }

    useEffect(()=>{
      project?.subTask[0]?.subTaskId && getUserSubTask(project._id,project.subTask[0]?.subTaskId)
    },[])
    // useEffect(()=>{
    //   const tokenvalue =  localStorage.getItem("validToken")
    //   const tokenjson = JSON.parse(tokenvalue);
      
    //   let token = {
    //       tokenjson:tokenjson
    //   }
    //   axios.post("http://localhost:5000/getuserSubTask",{withCredentials:true}).then((res)=>{
    //      console.log("usersubtask n mprojectuserview",res.data);
    //      setDummyArray(res.data)
    //   })
    // },[Array])

  return (
    <div className='my-project-userview-popup-background' onClick={()=>closeOk&&setSelectedProject(undefined)}>
        <div className='my-project-userview-popup' onMouseEnter={()=>setCloseOK(false)} onMouseLeave={()=>setCloseOK(true)}>
            <div className=''>
                <div className='bg-white d-flex justify-content-evenly px-5 pt-2 rounded m-2'>
                  <div className='text-start'>
                      <h6 className='text-secondary'>Project Name</h6>
                      <h2>{project.projectName}</h2>
                      <h6 className='text-secondary'>Description</h6>
                      <h4>{project.description}</h4>
                      <h6 className='text-secondary'>Start Date</h6>
                      <h4>{project.startDate}</h4>
                      <h6 className='text-secondary'>End Date</h6>
                      <h4>{project.endDate}</h4>
                  </div>
                  <div className='text-start'>
                       <h6  className='text-secondary'>Total Time Alloted</h6>
                      <h2>{project.projectName}</h2>
                      <h6 className='text-secondary'>Total Day</h6>
                      <h4>{project.description}</h4>
                      <h6 className='text-secondary'>Work Hours</h6>
                      <h4>{project.startDate}</h4>
                      <h6 className='text-secondary'>Total Time Remaining</h6>
                      <h4>{project.endDate}</h4>
                  </div>
                </div>
                <div className=' mt-5 bg-secondary'>
                  <div className='bg-white'>
                      <Tabs
                        id="controlled-tab-example"
                        // activeKey="home"
                          onSelect={(subtaskid)=>getUserSubTask(project._id,subtaskid)}
                        className="mb-3"
                      >
                        { project && project.subTask.map((subtask,index)=>{
                          return (
                          <Tab eventKey={subtask.subTaskId} title={subtask.subTaskName} onMouseDown={()=>getUserSubTask(project._id,subtask.subTaskId)} className='bg-danger'>
                            <div >
                              <div>
                                <div className='bg-light '>
                                    <table className='table'>
                                      <thead className=''>
                                        <tr className=''>
                                          <td><h4>Today</h4></td>
                                          <td><h4>Start</h4></td>
                                          <td><h4>End</h4></td>
                                          <td><h4><span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></h4></td>
                                          <td><button onClick={()=>
                                            // setArray([...Array,{date:currentDate,day:day,start:null,currentstart:null,end:"",tseconds:{sec:0,index:null}}])
                                           Array.length>0 && addTimespend(Array[0]._id,{date:currentDate,day:day,start:null,currentstart:null,end:"",tseconds:{sec:0,index:null}},subtask.subTaskId)
                                          }>add</button></td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {
                                          Array.length>0 && Array[0].timespend.map((obj,index)=>{
                                            var dte = new Date(null)
                                            dte.setSeconds(obj.tseconds.sec)
                                            let vale = dte.toISOString().substring(11,19)

                                            let hr = Math.floor(obj.tseconds.sec/3600)
                                            let mn = Math.floor(obj.tseconds.sec%3600/60)
                                            let sc = Math.floor(obj.tseconds.sec%3600 % 60)
                                            return (
                                              <tr>
                                              <td><span className='block text-center'>{obj.day}</span>{obj.date}</td>
                                              <td>{obj.start?new Date(obj.start).toLocaleTimeString():""}</td>
                                              <td>{obj.end?new Date(obj.end).toLocaleTimeString():""}</td>
                                              <td>{obj.tseconds.index==index?(`${hours}:${minutes}:${seconds}`):vale}</td>
                                              <td><button onClick={()=>{
                                               let time = new Date();
                                               time.setSeconds(time.getSeconds()+obj.tseconds.sec)
                                                reset(time);
                                              // setArray((prev)=>{
                                              //   let datestart = new Date()
                                              //   let currentstart = datestart.getHours()+":"+datestart.getMinutes()+":"+datestart.getSeconds()
                                              //   console.log("startvalue",obj.start)
                                              //   let startvalue = obj.start ===null?new Date():obj.start
                                              //   prev[index]={date:currentDate,day:day,start:startvalue, currentstart:obj.currentstart===null?currentstart:obj.currentstart,end:"",tseconds:{sec:obj.tseconds.sec,index:index}}
                                              //   return [...prev]
                                              // })
                                              let datestart = new Date()
                                                let currentstart = datestart.getHours()+":"+datestart.getMinutes()+":"+datestart.getSeconds()
                                                console.log("startvalue",obj.start)
                                                let startvalue = obj.start ===null?new Date():obj.start
                                                let object = {date:currentDate,day:day,start:startvalue, currentstart:obj.currentstart===null?currentstart:obj.currentstart,end:"",tseconds:{sec:obj.tseconds.sec,index:index}}
                                                startTimespend(Array[0]._id,index, object)
                                             
                                              
                                              }}>start</button>
                                              <button onClick={()=>{pause();
                                               let datestart = new Date()
                                               let currentend = datestart.getHours()+":"+datestart.getMinutes()+":"+datestart.getSeconds()
                                              alert(obj.start)
                                              // Array[index]={date:currentDate,
                                              // day:day,start:obj.start,currentstart:obj.currentstart,end:new Date(),currentend,tseconds:{sec:totalSeconds,index:null}}
                                              var overallseconds = (datestart.getTime() - (new Date(obj.start)).getTime()) / 1000;
                                              let stopObject={date:currentDate,day:day,start:obj.start,currentstart:obj.currentstart,end:new Date(),currentend,tseconds:{sec:overallseconds,index:null}}
                                              stopTimespend(Array[0]._id,index,stopObject)
                                              }}>stop</button>
                                              <button onClick={()=>{
                                                {/* console.log("arr vaaa",Array)
                                             let currentdiff = obj.end - obj.start;
                                             console.log("Diff",currentdiff/1000)
                                            //  console.log("obj.end",obj.end.getSeconds())
                                             let stop = new Date()
                                             console.log(stop.getTime(),"timeeee",stop.getTimezoneOffset(),"timexone")
                                             stop.setSeconds(stop.getSeconds()+timer.totalSeconds)
                                             reset(stop ) */}
                                             addTimespend(subtask.subTaskId)
                                            }}>submit </button></td>
                                            </tr>
                                            )
                                          })
                                        }
                                       
                                      </tbody>
                                    </table>
                                </div>
                                <div>
                                {/* <Stopwatch/> */}
                                </div>
                              </div>
                            </div>
                          </Tab>
                          )
                        })
                       
}
                        {/* <Tab eventKey="profile" title="Profile">
                          Tab content for Profile
                        </Tab>
                        <Tab eventKey="contact" title="Contact" >
                          Tab content for Contact
                        </Tab> */}
                      </Tabs>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProjectUserView