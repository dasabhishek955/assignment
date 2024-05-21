import React from 'react'
import SidePanel from './SidePanel'
import TopBar from './TopBar'
import EventList from './EventList'
import CreateBox from './CreateBox'
import './Homepage.css';


const Homepage = () => {
    return (
            <div className="Home-page">
            <SidePanel />
            <div className="main">
            <TopBar />
            <CreateBox /> 
            <EventList />
            </div>
        </div>
    )
}

export default Homepage
