// -- APPLICATION ROUTING CONFIGURATION -- //

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import CalendarComponent from "./components/CalendarComponent";
import MapPage from "./components/MapPage";
import JobPostings from "./components/JobPostings";
import { JobsContextProvider } from "./context/index";
import ProfilePage from "./components/ProfilePage";
import UserHeader from "./components/UserHeader";
import { ApplicationDataProvider, useApplicationData } from "./hooks/useApplicationData";
import ChatBox from "./components/ChatBox";
import MarkerDetail from "./components/MarkerDetail";
import AdminPostShift from "./components/AdminPostShift";
import Home from './components/home/Home';

function App() {
  const { addShift, state, handleCalendarDate, getShiftForDate } = useApplicationData();

  const handleContactAdmin = (id) => {
    //console.log("Admin contacted with ID:", id);
  };

  return (
    <ApplicationDataProvider>
      <JobsContextProvider>
        <Navbar />
        <UserHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maps" element={<MapPage />} />
          <Route path="/jobs" element={<JobPostings />} />
          <Route path="/jobs/:jobId" element={<JobPostings />} />
          <Route
            path="/calendar"
            element={<CalendarComponent state={state} handleCalendarDate={handleCalendarDate} addShift={addShift} getShiftForDate={getShiftForDate} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatBox onContactAdmin={handleContactAdmin} />} />
          <Route path="/marker-detail" element={<MarkerDetail updateCalendarState={addShift} />} />
        </Routes>
        <Footer />
      </JobsContextProvider>
    </ApplicationDataProvider>
  );
}

export default App;