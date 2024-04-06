import React, { memo } from 'react'
import { useStopwatch } from 'react-timer-hook';
function Stopwatch({timeStatus}) {
        console.log("stopwatch")
        let stopwatchOffset = new Date();
         stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300)
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ stopwatchOffset });
      
      timeStatus({start,pause,reset,totalSeconds})

  return (
    <div>
    <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
    </div>
   
  
  )
}

export default memo(Stopwatch)