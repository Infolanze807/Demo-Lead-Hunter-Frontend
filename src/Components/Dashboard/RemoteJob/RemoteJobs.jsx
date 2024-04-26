import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft, FaArrowLeft } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function RemoteJobs() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [remoteLeadDetails, setRemoteLeadDetails] = useState(null);

  const fetchRemoteLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get("localhost:9000/api/remoteleads/remote");
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching remote leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRemoteLeads();
  }, []);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("/api/remoteleads/tag", {
        params: { tags: searchTerm },
      });
      setLeads(response.data);
    } catch (error) {
      console.error("Error searching remote leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadClick = (details) => {
    setRemoteLeadDetails(details);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setRemoteLeadDetails(null);
  };

  const redirectToLink = () => {
    if (remoteLeadDetails && remoteLeadDetails.link) {
      window.open(remoteLeadDetails.link, "_blank");
    }
  };

  return (
    <div>
      <div className="px-4 lg:px-28 md:px-20 lg:py-10 md:py-10 py-4 bg-[--main-color] font-family">
        <div className="bg-white rounded-lg shadow-lg pb-5">
          <div className="border-b px-4 py-7 mb-10">
            <div className="">
              <form className="flex items-center max-w-lg mx-auto">
                <label htmlFor="voice-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="voice-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[--main-color] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 "
                    placeholder="Search HTML, CSS..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      fetchRemoteLeads();
                    }}
                    className="absolute inset-y-0 end-0 flex outline-none items-center pe-3"
                  >
                    {loading && (
                      <FaSpinner className="animate-spin h-4 w-4" />
                    )}
                    {!loading && (
                      <MdClose className="text-xl text-gray-500 hover:text-black" />
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center p-3 ms-2 text-sm font-medium text-white bg-[--three-color] rounded-lg border border-[--three-color] hover:bg-white hover:text-[--three-color] relative"
                  disabled={loading}
                  onClick={handleSearchSubmit}
                >
                  {loading && (
                    <FaSpinner className="animate-spin h-4 w-4 mr-1.5" />
                  )}
                  {!loading && (
                    <svg
                      className="w-3.5 h-3.5 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  )}
                  Search
                </button>
              </form>
            </div>
          </div>
          {leads.map((lead, index) => (
            <div
              key={lead.id}
              className="grid lg:grid-cols-6 grid-col-3 border rounded-lg hover:shadow-md shadow-sm cursor-pointer items-center lead mb-5 m-4"
            >
              <div
                className="lg:col-span-4 col-span-2 p-5"
                onClick={() => handleLeadClick(lead)}
              >
                <div className="flex items-center">
                  <div className="p-4 px-5 bg-[--main-color] w-max rounded-md me-4">
                    {index + 1 + (currentPage - 1) * 10}.
                  </div>
                  <div>
                    <div className="title font-semibold">{lead.title}</div>
                    <div className="text-sm leads_wrap">
                      {lead.description}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="p-5 text-center"
                onClick={() => handleLeadClick(lead)}
              >
                {Array.isArray(lead.tags) ? (
                  <div>{lead.tags.length > 0 && lead.tags[0]}</div>
                ) : (
                  <div>{lead.tags.split("\n")[0]}</div>
                )}
              </div>
              <div
                className="m-5 text-center bg-[--main-color] rounded"
                onClick={() => handleLeadClick(lead)}
              >
                {lead.formattedCreatedAt}
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-8 mb-3">
            <nav
              aria-label="Page navigation example"
              className="pagination-container flex space-x-2"
            >
              {/* Pagination logic */}
            </nav>
          </div>
        </div>
        {showPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 p-2 z-50">
            <div className="bg-white rounded-lg lg:w-[800px] md:w-[650px] w-[500px]">
              {/* Popup content */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RemoteJobs;
