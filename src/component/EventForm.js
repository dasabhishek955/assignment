import React, { useState } from 'react';
import './EventForm.css';
import SidePanel from './SidePanel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EventDescription.css';
import { useDropzone } from 'react-dropzone';


const MAX_LENGTH = 100;
const EventForm = () => {

    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [tags, setTags] = useState([]);
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (eventName > 20) {
            setError('Event name cannot exceed 20 characters.');
        } else {
            setError('');
        }

        const apiUrl = 'https://api.fyre-stage.hypersign.id/api/v1/event';
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRBZGRyZXNzIjoiMHgzQjI2NjdjRDRiNjAxMkU2YkFGNzNhMGExYzcxRjA5MDdDY0UzNjg0IiwiZGlkIjoiZGlkOmhpZDp0ZXN0bmV0OjB4M0IyNjY3Y0Q0YjYwMTJFNmJBRjczYTBhMWM3MUYwOTA3Q2NFMzY4NCIsImlkIjoiNjYzYTg1OGE1MjQwOTcyM2I2NzllNDk1IiwiaWF0IjoxNzE1NTU3NDc1LCJleHAiOjE3MjU2NDM4NzV9.z0Bcfe42eBs_D95vwcygCJb8YKH_maX_6b3nBonz6dA'; // Replace with your actual token
        const eventData = {
            communityId: "662a2311f1937f80209e5345",
            eventName: eventName,
            banner: "https://qph.cf2.quoracdn.net/main-qimg-c6bb3257e87d07f96732bfd3e113e712",
            startDate: startDate,
            endDate: endDate,
            isDraft: false,
            isPublished: true,
            tags: tags,
            isOpenToAll: false,
            referral: {
                refereeXp: 0,
                referralXp: 0,
                difficultyLevel: 0,
                limit: 0
            },
            rewards: [
                {
                    rewardType: "NFT",
                    title: "ERC720 worth 50$",
                    winnerCount: 0,
                    rewardPerPerson: 0,
                    distributionType: "FYRE"
                }
            ],
            description: description.replace(/<\/?p>/g, '')
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            console.log(eventData);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleTagDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };



    const handleChange = (content, delta, source, editor) => {

        const text = editor.getText();
        if (text.length - 1 > MAX_LENGTH) {
            setValue(content);
        }
        else {
            setDescription(content);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'blockquote'],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'list', 'bullet',
        'bold', 'italic', 'underline', 'blockquote',
        'align', 'link', 'image'
    ];

    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && selectedFile.size <= 400 * 1024) { // Check file size <= 400kb
            setFile(selectedFile);
        } else {
            alert('File size should be less than 400kb');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxSize: 400 * 1024,
    });



    return (
        <div className="container">
            <div className='column'><SidePanel /> </div>
            <div className="column sidebar">
                <h2>Create Events</h2>
                <div className='info'><img src={`/blue_dot.png`} alt={"megaphone"} />
                    <span >Basic Info</span>
                </div>
            </div>
            <div className='column'>
                <div className="event-form">
                    <div className='form'>
                        <div className="form-section">
                            <label htmlFor="event-name">Event Name <span className='count-name'>{`${eventName.length}/20`}</span></label>
                            <input type="text" id="event-name" placeholder="Event name" maxLength="20" value={eventName}
                                onChange={(e) => setEventName(e.target.value)} />
                            <div className="char-count"></div>
                        </div>
                        <div className="form-section ">
                            <div className="banner-upload">
                                <div className='banner-image'><label htmlFor="event-description">Banner Image </label></div>
                                <div {...getRootProps({ className: 'upload-area' })}>
                                    <input {...getInputProps()} />
                                    {file ? (
                                        <div>{file.name}</div>
                                    ) : (
                                        <div>
                                            {isDragActive ? (
                                                <div className=''>Drop the image here...</div>
                                            ) : (
                                                <div>
                                                    Drag & Drop or <span className="upload-link">Click to Upload</span>, Max size of 400kb
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-section">
                            <label htmlFor="event-description">Event Description </label>
                            <div className="editor-container">
                                <ReactQuill
                                    value={description}
                                    onChange={handleChange}
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Enter descriptions here for your event"
                                    class="plac"
                                />
                                <div className="char-count">{`${description.replace(/(<([^>]+)>)/gi, "").length}/${MAX_LENGTH}`}</div>
                            </div>
                        </div>
                        <div className="form-section date-section">
                            <div>
                                <label htmlFor="start-date">Start Date</label>
                                <input type="date" id="start-date" value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)} placeholder="Event1 name" />
                            </div>
                            <div>
                                <label htmlFor="end-date">End Date</label>
                                <input type="date" id="end-date" value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                        <div className='form-section tag-area'>
                            <label htmlFor="tags">Tags</label>
                            <div className="tags">
                                {tags.map((tag, index) => (
                                    <div key={index} className="tag">
                                        {tag + " "}
                                        <button onClick={() => handleTagDelete(index)} className="delete-tag-button">x</button>
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleInputKeyDown}
                                placeholder="Press enter to add a tag"
                                className="tag-input"
                            />
                        </div>
                    </div>
                </div>
                <div className='create-button'>
                    <button className="save-button" onClick={handleSubmit}>Save</button>
                </div>
            </div>

        </div>
    );
};

export default EventForm;
