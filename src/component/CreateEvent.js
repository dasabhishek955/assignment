import React from 'react'
import EventForm from './EventForm'
import TopBar from './TopBar'
import './CreateEvent.css';


const CreateEvent = () => {
    return (
        <div className='Event-page'>
            <TopBar />
            <div className="component">
                <EventForm />
            </div>
        </div>
    )
}

export default CreateEvent
