import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const TextEditor = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [note, setNote] = useState('');
  const { fileId, token } = location.state || {};

  useEffect(() => {
    console.log(fileId);
    console.log(token);
  }, []);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSave = async () => {

    console.log('Saved note:', note);

    const url = process.env.REACT_APP_API_KEY+'/save-file';

    try {
      await axios.post(url, {
        fileId: fileId + '.html',
        htmlContentType: note,
      });
      toast.success('Note saved !!');
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note. Please try again !!');
    }
  };

  const handleViewNotes = () => {
    console.log('Saved note:', note);
    navigate('/allnotes', { state: { token: token } });
  };

  const handleHomeClick = () => {
    navigate('/home', { state: { token: token } });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col bg-sky-100">
        <h1 className="text-4xl font-bold mb-10 ">QuickNotez</h1>
        <textarea
          className="outline-none border border-yellow-300 bg-amber-200 rounded-lg p-4 w-1/2 h-1/2 resize-none text-black"
          placeholder="Type here..."
          onChange={handleNoteChange}
          value={note}
          style={{ color: 'black' }}>
        </textarea>
        <div className="flex justify-between mt-6 w-1/2">
          <button
            className="bg-blue-500 text-white hover:bg-black-600 px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-2 "
            onClick={handleHomeClick}>
            Home
          </button>
          <button
            className="bg-blue-500 text-white hover:bg-black-600 px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
            onClick={handleSave}>
            Save
          </button>
          <button
            className="bg-blue-500 text-white hover:bg-black-600 px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-2 "
            onClick={handleViewNotes}>
            All Notes?
          </button>
        </div>
      </div>
    </>

  );

};

export default TextEditor;
