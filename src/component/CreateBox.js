// src/components/CreateBox.js
import React, { useState } from 'react';
import './CreateBox.css';
import { useNavigate } from 'react-router-dom'



const CreateBox = () => {
    let navigate = useNavigate();

    const handleOpenForm = () => {
        navigate("/create-event");

    };
    return (
        <div>
            <div className="create-box">
                <div className='create-box-description'>
                    <h2>Create Events</h2>
                    <p>
                        Craft exciting challenges and tasks for participants to win amazing prizes effortlessly.
                        Our user-friendly interface and powerful tool make event creation a breeze. Let's get started!
                    </p>
                </div>
                <div className='create-event-area'>
                    <button className="create-event-button" onClick={handleOpenForm}>
                        + Create Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBox;
