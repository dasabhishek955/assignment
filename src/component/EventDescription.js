import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EventDescription.css';

const MAX_LENGTH = 100;

const EventDescription = () => {
  const [value, setValue] = useState('');

  const handleChange = (content, delta, source, editor) => {
    const text = editor.getText();
    if (text.length - 1 > MAX_LENGTH) {
    console.log("GG");
      return value; 
    }
    else{
        setValue(content);
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

  return (
    <div className="editor-container">
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Enter descriptions here for your event"
      />
      <div className="char-count">{`${value.replace(/(<([^>]+)>)/gi, "").length}/${MAX_LENGTH}`}</div>
    </div>
  );
};

export default EventDescription;
