import React, { useEffect, useState } from 'react';
import './SidePanel.css';
import { useNavigate } from 'react-router-dom'


const SidePanel = () => {
    let navigate = useNavigate();
    const [smallSide, setSmallSide] = useState(false);

    useEffect(() => {
        const currentPathname = window.location.pathname;
        console.log(currentPathname, "currentPathname");
        if (currentPathname === '/create-event')
            setSmallSide(true);
        else
            setSmallSide(false);
    }, []);


    const handleOpenForm = () => {
        navigate("/");
    };


    return (
        <div className={smallSide ? "side-panel-ev" : "side-panel"}>
            <div className="side-panel-header">
                <div className="profile">
                    <div className="profile-pic1">
                        <buttom className="nibi-buttom" onClick={handleOpenForm}> <img src={`/nibiru.webp`} alt="Profile" /></buttom>
                    </div>
                    {smallSide ? "" : (
                        <div className="profile-info">
                            <div className="profile-name">Nibiru</div>
                            <div className="profile-role">Owner</div>
                        </div>
                    )
                    }
                </div >
            </div >

            < div className="events" >
                < button > <img src={`/megaphone.png`} alt={"megaphone"} />
                    {smallSide ? "" : "Events"}
                </button >
            </div >

            < div className="footer" >
                <div className="help-icon">
                    <img src={`/circle.png`} alt={"circle"} />
                </div>
                {smallSide ? "" : (
                    <div>
                        <div className="help-text">
                            <div>Need help? </div>
                            <div> Please check our docs </div>

                        </div>
                    </div>
                )
                }

                {smallSide ? "" : (
                    <button className="documentation">Documentation</button>
                )
                }
            </div >
        </div >
    );
};

export default SidePanel;
