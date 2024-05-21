import React, { useEffect, useState } from 'react';
import { fetchEvents } from './eventService';
import EventCard from './EventCard';
import './EventList.css';


const ITEMS_PER_PAGE = 4;

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const eventavailable = ['All', "Ongoing", "Completed", "Drafts", "Pending Rewards"];

    useEffect(() => {
        async function loadEvents() {
            try {
                const eventsData = await fetchEvents();
                console.log(eventsData);
                setEvents(eventsData.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadEvents();
    }, []);

    console.log(events.data);

    const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedEvents = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className='heading'>
                <h1>Your Events</h1>

            </div>
            <div className="tabs-container">
                <div className="tabs">
                    {eventavailable.map((tab) => (
                        <div>
                            {tab}
                        </div>
                    ))}
                </div>
                <div className="search-container">
                    <input type="text" placeholder="Search events by name or tags" />
                </div>
            </div>
            <div className="events-container">
                {selectedEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            <div className="pagination">
                <button className="pagination-buttons" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    &lt;
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className=
                        {currentPage === index + 1 ? 'active' : 'not'}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="pagination-buttons" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default EventList;