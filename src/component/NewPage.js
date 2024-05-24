import React, { useState } from 'react'
import EventForm from './EventForm'
import TopBar from './TopBar'
import SidePanel from './SidePanel'
import './NewPage.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';


const MAX_LENGTH = 100;

const NewPage = () => {


    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [tags, setTags] = useState([]);
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedTags, setSelectedTags] = useState(['PLAY2EARN']);
    const [dropdownOpen, setDropdownOpen] = useState(false);


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
            tags: selectedTags,
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

        console.log(eventData);

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
                console.log(response.error.details);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            console.log(eventData);

        } catch (error) {
            console.error('Error:', error);
        }

        setEventName("");
        setFile(null);
        setDescription("");
        setStartDate("");
        setEndDate("");
        setSelectedTags(["PLAY2EARN"])

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


    const availableTags = [
        'PLAY2EARN', 'AIRDROP', 'ETHEREUM', 'POLYGON', 'HARMONEY', 'DID',
        'NFT', 'METAVERSE', 'DEFI', 'COSMOS'
    ];

    const addTag = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
        <div className='main-new-event'>
            <TopBar />
            <SidePanel />
            <div className='ce-new-event'>
                Create Events
                <div className='new-event-info'>
                    <img src={`/blue_dot.png`} alt={"megaphone"} />
                    <span >Basic Info</span>
                </div>
            </div>
            <div className='form-area'>
                <div className="form-section-new-event">
                    <label htmlFor="event-name">Event Name<span className='count-name-new-event'>{`${eventName.length}/20`}</span></label>
                    <input type="text" id="event-name" placeholder="Event name" maxLength="20" value={eventName}
                        onChange={(e) => setEventName(e.target.value)} />
                </div>
                <div className="form-section-new-event">
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
                <div className="form-section-new-event">
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
                <div className="form-section-new-event">
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
                </div>
                <div className="form-section-new-event">
                    <label htmlFor="tags">Tags</label>
                    <div className='tag-area'>
                        <div className="tags-input">
                            <div className="selected-tags">
                                {selectedTags.map(tag => (
                                    <div className="tag" key={tag}>
                                        {tag}
                                        <button onClick={() => removeTag(tag)}>×</button>
                                    </div>
                                ))}
                            </div>
                            <button className="dropdown-toggle" onClick={toggleDropdown}>
                                {dropdownOpen ? "-" : "+"}
                            </button>
                            {dropdownOpen && (
                                <div className="tags-selection">
                                    {availableTags.map(tag => (
                                        <button key={tag} onClick={() => addTag(tag)}>
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className='blank-button-new-ev'><span></span></div>
                <div className='create-button-ev'>
                    <button className="save-button12" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default NewPage
