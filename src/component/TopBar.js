import React, { useEffect, useState } from 'react';
import './TopBar.css';


const TopBar = () => {
    const [smallSide, setSmallSide] = useState(false);


    useEffect(() => {
        const currentPathname = window.location.pathname;
        console.log(currentPathname, "currentPathname");
        if (currentPathname === '/create-event')
            setSmallSide(true);
        else
            setSmallSide(false);
    }, []);


    return (
        <div className={smallSide ? "top-bar-ev" : "top-bar"}>
            <div className='top-icons'>
                <img src={`/invite.png`} alt={"invite"} className='icon'/>
                <img src={`/notification.png`} alt={"notification"}className='icon' />
                <img src={`/profile.png`} alt={"profile"} className='icon'/>
            </div>
        </div>
    );
};

export default TopBar;
