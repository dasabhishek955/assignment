import React from 'react';
import './TopBar.css';


const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="top-bar-left">
            </div>
            <div className="top-bar-right">
                <div className="top-bar-icon">
                    <img src={`/invite.png`} alt={"invite"} />
                    </div>
                <div className="top-bar-icon">
                <img src={`/notification.png`} alt={"notification"} />
                </div>
                <div className="profile-image">
                    <img src={`/profile.png`} alt="profile" />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
