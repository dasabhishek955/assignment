import React, { useState, useEffect, useRef } from 'react';
import './EventCard.css';
import { FiMoreVertical } from 'react-icons/fi';
import { format } from 'date-fns';

function EventCard({ event }) {
    const statusClass = event.status === 'active' ? 'active' : 'inactive';
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);


    return (
        <div className="event-card">
            <img className="event-header" src={event.banner} alt="Event" />
            <div className="event-details">
                <h2>{event.eventName}</h2>
                <p>{format(new Date(event.startDate), "MMM d, y,  p")} to {format(new Date(event.endDate), "MMM d, y, p")}</p>
                <p> {event.participantCount} Participants </p>
                <div className='event-rewards'>
                    {event.rewards.map(r => (
                        <span>{r.rewardPerPerson} {r.rewardType} </span>
                    ))}
                </div>
                <div className="event-tags">
                    {event.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="menu-container" ref={menuRef}>
                <FiMoreVertical className="menu-icon" onClick={toggleMenu} />
                {menuOpen && (
                    <div className="menu">
                        <div className='menu-button'><img src={`./Link.png`} alt={"Link"} /><span>  Link</span></div>
                        <div className='menu-button'><img src={`./Edit.png`} alt={"Edit"} /><span>  Edit</span></div>
                        <div className='menu-button'><img src={`./Clone.png`} alt={"Clone"} /><span>  Clone</span></div>
                        <div className='menu-button'><img src={`./Delete.png`} alt={"Delete"} /><span>  Link</span></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventCard;
