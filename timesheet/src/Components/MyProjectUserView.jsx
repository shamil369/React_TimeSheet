import React,{useCallback, useState} from 'react'
import './MyProjectUserView.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stopwatch from './Stopwatch';
import { useStopwatch } from 'react-timer-hook';

function MyProjectUserView({project,setSelectedProject}) {
    const[closeOk,setCloseOK]=useState(true)
    const[timer,setTimer]=useState(true);
    const[Array,setArray]=useState([]);

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
    let currentDate = date.getDate() + "-"+date.getMonth()+1+"-"+date.getFullYear();
    let day=days[date.getDay()]
    let starttime ="";
    console.log("datee",date)
    let stopwatchOffset = new Date();
    console.log("stopwatchOffset",stopwatchOffset)
    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300)
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
                        // onSelect
                        className="mb-3"
                      >
                        <Tab eventKey="home" title="Home">
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
                                        <td><button onClick={()=>setArray([...Array,{date:currentDate,day:day,start:null,currentstart:null,end:"",tseconds:0}])}>add</button></td>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        Array && Array.map((obj,index)=>{
                                          return (
                                            <tr>
                                            <td><span className='block text-center'>{obj.day}</span>{obj.date}</td>
                                            <td>{obj.start?obj.start.toLocaleTimeString():""}</td>
                                            <td>{obj.end?obj.end.toLocaleTimeString():""}</td>
                                            <td>{obj.tseconds>0?(`${hours}:${minutes}:${seconds}`):obj.tseconds}</td>
                                            <td><button onClick={()=>{
                                             let time = new Date();
                                             time.setSeconds(time.getSeconds()+obj.tseconds)
                                              reset(time);
                                            setArray((prev)=>{
                                              let datestart = new Date()
                                              let currentstart = datestart.getHours()+":"+datestart.getMinutes()+":"+datestart.getSeconds()
                                              console.log("startvalue",obj.start)
                                              let startvalue = obj.start ===null?new Date():obj.start
                                              prev[index]={date:currentDate,day:day,start:startvalue, currentstart:obj.currentstart===null?currentstart:obj.currentstart,end:""}
                                              return [...prev]
                                            })
                                            // Array[index]={date:currentDate,
                                            // day:day,start:new Date(),end:""}
                                            
                                            }}>start</button>
                                            <button onClick={()=>{pause();
                                             let datestart = new Date()
                                             let currentend = datestart.getHours()+":"+datestart.getMinutes()+":"+datestart.getSeconds()
                                            
                                            Array[index]={date:currentDate,
                                            day:day,start:obj.start,currentstart:obj.currentstart,end:new Date(),currentend,tseconds:totalSeconds}}}>stop</button>
                                            <button onClick={()=>{console.log("arr vaaa",Array)
                                           let currentdiff = obj.end - obj.start;
                                           console.log("Diff",currentdiff/1000)
                                          //  console.log("obj.end",obj.end.getSeconds())
                                           let stop = new Date()
                                           console.log(stop.getTime(),"timeeee",stop.getTimezoneOffset(),"timexone")
                                           stop.setSeconds(stop.getSeconds()+timer.totalSeconds)
                                           reset(stop )
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
                        <Tab eventKey="profile" title="Profile">
                          Tab content for Profile
                        </Tab>
                        <Tab eventKey="contact" title="Contact" >
                          Tab content for Contact
                        </Tab>
                      </Tabs>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProjectUserView