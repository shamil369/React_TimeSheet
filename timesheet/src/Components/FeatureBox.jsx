import React from 'react'
import './FeatureBox.css'
import { UilChartGrowth, UilStopwatch,UilUserArrows } from '@iconscout/react-unicons'


function FeatureBox() {
  return (<>
      <h2 className="main-heading">Why Timesheet?</h2>
    <div className='container feature-box'>
        <div className="boost-productivity">
            <UilChartGrowth className="img-size"/>
            <h3 className="heading" >Boost Productivity</h3>
            <div className="feature-para-width">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos architecto iure tenetur ad! Ipsa asperiores perspiciatis vitae nulla.
            </div>
        </div>
        <div className="time">
            <UilStopwatch className="img-size"/>
            <h3 className="heading" >Time Management</h3>
            <div className="feature-para-width">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos architecto iure tenetur ad! Ipsa asperiores perspiciatis vitae nulla.
            </div>
        </div>
        <div className="team">
             <UilUserArrows className="img-size"/>
             <h3 className="heading" >Team Mangement</h3>
            <div className="feature-para-width">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos architecto iure tenetur ad! Ipsa asperiores perspiciatis vitae nulla.
            </div>
        </div>

    </div>
    </>
  )
}

export default FeatureBox