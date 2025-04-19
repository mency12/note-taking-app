import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

export const HomePage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const token = ''
  //location.state.token;

  const handleClick = async (e) => {

    console.log(token);
   
    const url = process.env.REACT_APP_API_KEY+'/create-note'; 
    const headers = {
      'Authorization': `Bearer ${token}`
    };

      try {
        await axios.post(url, { headers }).then( (res) => {
          const data = JSON.parse(res.data.body);
          const fileId = data.fileId;
          console.log(fileId);
          navigate('/texteditor', { state: { fileId: fileId, token:token } });
          toast.success('Note created successfully !');
        });
      } catch (error) {
        toast.error('Failed to create a note. Please try again !!');
        console.log(error);
      }
    };

    const handleViewClick = async (e) => {
      navigate('/allnotes', { state: { token: token } });
    };

  return (
    <div className="bg-gradient-to-r from-teal-300 to-blue-500 min-h-screen flex flex-col justify-center items-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to QuickNotez</h1>
        <p className="text-xl mb-8">Write, remember, and thrive.</p>
        <div className="mr-4 bg-white rounded-full py-2 px-4 inline-flex items-center hover:bg-black-600 hover:text-white hover:shadow-lg 
              transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <button className="bg-white rounded-full text-black font-bold py-2 px-4 rounded " 
          onClick={handleClick}>Start Creating</button>
        </div>
        <div className="ml-4 bg-white rounded-full py-2 px-4 inline-flex items-center hover:bg-black-600 hover:text-white hover:shadow-lg 
              transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <button className=" bg-white rounded-full text-black font-bold py-2 px-4 rounded " 
          onClick={handleViewClick}>View Notes</button>
        </div>
      </div>
    </div>
  );
};