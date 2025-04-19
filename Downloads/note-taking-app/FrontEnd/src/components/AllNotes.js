import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

export const AllNotes = () => {
  
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.state.token;
  
    useEffect(() => {
  
      const fetchFileID = async () => {
        setIsLoading(true);

        const url = process.env.REACT_APP_API_KEY+'/get-all-notes';
  
        const headers = {
          'Authorization': `Bearer ${token}`
        };
  
        try {
          const response = await axios.get(url, { headers });
          console.log('Data Received successfully:', response.data);
          setData(response.data);
        } catch (error) {
          console.error('Error sending data:', error);
          throw error; 
        } finally {
          setIsLoading(false); 
        }
      };
      fetchFileID();
    }, []);
  
    const handleHomeClick = () => {
      navigate('/home', { state: { token:token } });
    }
  
    if (isLoading) {
      return <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>;
    }
    return (
      <>
        <div className="flex justify-center items-center h-screen flex-col bg-sky-100">
          <h1 className="text-4xl font-bold mb-6">All saved notes</h1>
          <div className="mt-4 grid grid-cols-3 gap-12">
            {data.map((item, index) => (
              item.Body &&
              <div key={index} className="bg-white p-6 rounded shadow w-64 h-32">
                <p>{item.Body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex">
            <button
              className="bg-blue-500 text-white hover:bg-black-600 px-4 py-2 rounded-md transition duration-300 
                        ease-in-out transform hover:-translate-y-1 hover:scale-110 mx-2"
              onClick={handleHomeClick}>
              Home
            </button>
          </div>
        </div>
      </>
    );
  };

export default AllNotes;