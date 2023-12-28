import React from 'react'
import './Card.css'
import { useState } from 'react'
import {motion,AnimateSharedLayout} from 'framer-motion'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {UilTimes} from '@iconscout/react-unicons'
import Chart from 'react-apexcharts'

function Card(props) {
  const [expanded,setExpanded] = useState(false)
  
    return (
    <AnimateSharedLayout>
      {
        expanded ? <ExpandedCard param={props} setExpanded={()=>setExpanded(false)}/>: <CompactCard param={props} setExpanded={()=>setExpanded(true)}/>
      }
    </AnimateSharedLayout>
  )
}


function CompactCard({param,setExpanded}){

  const Png = param.png;

  return (
    <motion.div className="compact-card" layoutId="expandablecard" onClick={setExpanded}>
      <div className="radial-bar">
        <CircularProgressbar value={param.barvalue} text={`${param.barvalue}%`}/>
        <span>{param.title}</span>
      </div>
      <div className="detail">
          <Png/>
          <span>{param.value}</span>
      </div>

    </motion.div>
  )
}


function ExpandedCard({param,setExpanded}){
  //param.series
    // const data = {
    //   options:{
    //     chart:{
    //       type:"area",
    //       height:"auto"
    //     },
    //     dropshadow:{
    //       enabled:false,
    //       enabledonseries:undefined,
    //       top:0,
    //       left:0,
    //       blur:3,
    //       color:"#000",
    //       opacity:0.35,
    //     },
    //     fill:{
    //       colors:["#fff"],
    //       type:"gradient"
    //     },
    //     datalabels:{
    //       enabled:false,
    //     },
    //     stroke:{
    //       curve:"smooth",
    //       colors:["white"],
    //     },
    //     tooltip:{
    //       x:{
    //         format:"dd/MM/yy HH:mm",
    //       },
    //     },
    //     grid:{
    //       show:true,
    //     },
    //     xaxis:{
    //       type:"datetime",
    //       categories:[
    //         "2018-09-19T00:00:00:000z",
    //         "2018-09-19T01:00:00:000z",
    //         "2018-09-19T02:00:00:000z",
    //         "2018-09-19T03:00:00:000z",
    //         "2018-09-19T04:00:00:000z",
    //         "2018-09-19T05:00:00:000z",
    //         "2018-09-19T06:00:00:000z",
    //       ],
    //     },
    //   }
    // }

       const data = {
          
            series: [44, 100],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['pending', 'Total'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 180
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          
          
          };
        

    return(
      <motion.div layoutId="expandablecard" className="expanded-card">
        <div className="expanded-close-button">
          <UilTimes onClick={setExpanded}/>
        </div>
        <span>
          {param.title}
        </span>
        <div className='chart-container'>
          <Chart series={param.series} type='pie' options={data.options} />
        </div>
      </motion.div>
    )
}

export default Card