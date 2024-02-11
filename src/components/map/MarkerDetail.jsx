import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { ApplicationDataContext } from "../../hooks/useApplicationData";
import "../../styles/MarkerDetail.css";

const MarkerDetail = ({ markerData, viewJobDetails, onClose, onContactAdmin, openDirections }) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const modalRef = useRef(); // Create a ref for the modal

  // Close the modal if clicked outside of it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      if (typeof onClose === 'function') {
        onClose(); // Call onClose if it's a function
      }
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]); // Dependency array updated to include onClose

  // Context
  const contextValue = useContext(ApplicationDataContext);
  const { addCalendarEntry } = contextValue ?? {}; 

  // Auth
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userId = user?.sub;

  return (
    <div className="marker-details-container bg-white rounded-lg shadow-lg overflow-hidden transform transition-opacity duration-500 ease-in opacity-0 animate-fade-in" ref={modalRef}>
      <img src={markerData.imageUrl} alt={markerData.title} className="w-full object-cover transition-opacity duration-700 ease-in-out" style={{ height: '200px' }} />

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{markerData.title}</h3>
        </div>
        <p className="text-l">{markerData.description}</p>
        <div className="text-gray-600 text-sm my-2">
          <span className="font-bold">4.2</span> ★★★★☆ <span>74 reviews</span>
        </div>
        <div className="bg-green-100 text-green-800 p-2 rounded my-2">
          Fully wheelchair accessible
        </div>
        <div className="flex space-x-2 my-2">
          <span className="bg-blue-100 text-blue-800 p-1 rounded">Restroom</span>
          <span className="bg-blue-100 text-blue-800 p-1 rounded">Parking</span>
          <span className="bg-blue-100 text-blue-800 p-1 rounded">Relaxation Space</span>
        </div>
      </div>

      <div className="flex justify-around p-4 border-t border-gray-200">
        <button className="bg-[#6547A5] text-white py-2 px-4 rounded-lg uppercase shadow hover:scale-105 transform transition-transform duration-300" onClick={() => viewJobDetails(markerData.id)}>
          View
        </button>
        <button className="bg-green-700 text-white py-2 px-4 rounded-lg uppercase shadow hover:scale-105 transform transition-transform duration-300" onClick={openDirections}>
          Directions
        </button>
      </div>
    </div>
  );
};

export default MarkerDetail;