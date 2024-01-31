import React, { useContext } from "react";
import { JobsContext } from "../context";
import axios from "axios";


const JobPostings = () => {
  const {jobData} = useContext(JobsContext);

  const acceptShift = async (job) => {
    try {
      const response = await axios.post('/api/send-email', job);
      console.log('Accepted job details:', job);
      console.log(response.data);
  
      console.log('Email sent successfully');  // Log success message
    } catch (error) {
      // Handle errors (you might want to show an error message to the user)
      console.error("Error accepting job:", error);
    }
  };
  



  return (
    <>
   
      <h1 className="text-6xl p-8 text-[#24233E] text-center">Jobs</h1>
    <div className="p-16 grid gap:8 3xl:grid-cols-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xs:flex justify-center gap-8">
      {jobData &&
        jobData.map((job, index) => (
          
      <div className="relative overflow-hidden h-[270px] w-[350px] rounded-lg bg-white text-left shadow-[0_1px_10px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="p-6 z-0">
          <h5 className="mb-2.5 text-xl font-medium leading-tight">
          {job.facility_name}
          </h5>
          <p className="mb-4 text-base">
            {job.title}
          </p>
        </div>
        <div className="lower-card absolute w-full bottom-0 px-6 z-10 bg-white">
          <div className="job-btns">
            <p className="mb-8 text-base font-medium">${job.rate}/ hr</p>
            <button 

              type="button"
              className="inline-block rounded px-6 pb-2 mb-1 pt-2.5 mr-4 text-xs font-medium uppercase leading-normal shadow-[0_2px_7px_-3px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
            >
              Details
            </button>
            <button
              onClick={() => acceptShift(job)}
              type="button"
              className="bg-[#6547A5] hover:bg-[#7D67AC] text-white inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_2px_7px_-3px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
            >
              Accept Job
            </button>
            {/* <p className="mt-8 w-full text-center rounded px-6 pb-2 mb-1 pt-2.5 mr-4 text-xs font-medium uppercase leading-normal shadow-[0_1px_5px_-3px_#3b71ca] transition duration-150 ease-in-out bg-gray-100">Reserved</p> */}
          </div>
          <div className="px-1 py-3 text-[#7775ad]">2 days ago</div>
        </div>
      </div>
      ))}
    </div>
    </>
  );
};

export default JobPostings;