import React, { useState, useEffect } from 'react';
import { CgCloseR } from "react-icons/cg";

function ShowLeads() {
  const [activeTab, setActiveTab] = useState('freelance');
  const [freelanceLeads, setFreelanceLeads] = useState([]);
  const [remoteLeads, setRemoteLeads] = useState([]);
  const [showFreelanceUpdateForm, setShowFreelanceUpdateForm] = useState(false);
  const [showRemoteUpdateForm, setShowRemoteUpdateForm] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [freelanceFormData, setFreelanceFormData] = useState({
    title: '',
    description: '',
    tags: '',
    timestamp: '',
    level: '',
    duration: '',
    project_budget: '',
    link: ''
  });
  
  const [remoteFormData, setRemoteFormData] = useState({
    Title: '',
    Description: '',
    Tags: '',
    timestamp: '',
    Level: '',
    Duration: '',
    Project_Budget: '',
    Link: ''
  });
  

  useEffect(() => {
    fetchData('freelance');
    fetchData('remote');
  }, []);

  const fetchData = async (type) => {
    try {
      let apiUrl = '';
      if (type === 'freelance') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/leads`;
      } else if (type === 'remote') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/remoteleads/remotelead`;
      }
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (type === 'freelance') {
        setFreelanceLeads(data);
      } else if (type === 'remote') {
        setRemoteLeads(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleDeleteLead = async (_id, type) => {
    try {
      let apiUrl = '';
      if (type === 'freelance') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/leads/lead`;
      } else if (type === 'remote') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/remoteleads/remote`;
      }
      const response = await fetch(`${apiUrl}/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }
      if (type === 'freelance') {
        setFreelanceLeads(prevLeads => prevLeads.filter(lead => lead._id !== _id));
      } else if (type === 'remote') {
        setRemoteLeads(prevLeads => prevLeads.filter(lead => lead._id !== _id));
      }
    } catch (error) {
      console.error('Error deleting lead:', error.message);
    }
  };

  const handleEditLead = async (_id, type) => {
    try {
      let apiUrl = '';
      if (type === 'freelance') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/leads/lead`;
      } else if (type === 'remote') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/remoteleads/remote`;
      }
      const response = await fetch(`${apiUrl}/${_id}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to update lead');
      }
      // Assuming the update was successful, no need to filter out the lead from state
    } catch (error) {
      console.error('Error updating lead:', error.message);
    }
    
    setSelectedLeadId(_id);
    setSelectedType(type);
    if (type === 'freelance') {
      setShowFreelanceUpdateForm(true);
      setShowRemoteUpdateForm(false); // Close the remote update form
    } else if (type === 'remote') {
      setShowRemoteUpdateForm(true);
      setShowFreelanceUpdateForm(false); // Close the freelance update form
    }
    // Fetch existing lead data
    fetchLeadData(_id, type); // Fetch existing data into the form
  };
  
  const fetchLeadData = async (_id, type) => {
    try {
      let apiUrl = '';
      if (type === 'freelance') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/leads/lead/${_id}`;
      } else if (type === 'remote') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/remoteleads/remote/${_id}`;
      }
      const response = await fetch(apiUrl, {
        method: 'GET', // Specify the method as GET
      });
      if (!response.ok) {
        throw new Error('Failed to fetch lead data');
      }
      const data = await response.json();
      // Set the form data based on the fetched data
      if (type === 'freelance') {
        setFreelanceFormData(data);
      } else if (type === 'remote') {
        setRemoteFormData(data);
      }
    } catch (error) {
      console.error('Error fetching lead data:', error.message);
    }
  };
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFreelanceFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setRemoteFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let apiUrl = '';
      if (selectedType === 'freelance') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/leads/lead/${selectedLeadId}`;
      } else if (selectedType === 'remote') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/remoteleads/remote/${selectedLeadId}`;
      }
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(freelanceFormData,remoteFormData)
      });
      if (!response.ok) {
        throw new Error('Failed to update lead');
      }
      // Reset form data and hide update form
      setFreelanceFormData({});
      setRemoteFormData({});
      setShowFreelanceUpdateForm(false);
      setShowRemoteUpdateForm(false);
      // Refetch data after update to reflect changes
      fetchData(selectedType);
    } catch (error) {
      console.error('Error updating lead:', error.message);
    }
  };

  return (
    <div className='font-family bg-[--main-color]'>
      <div className='px-4 lg:px-28 md:px-20 py-10'>
        <div className='bg-white lg:p-10 md:p-10 p-2 rounded-lg shadow-lg'>
          <div className="">
            <div className="text-4xl font-semibold mb-6 mt-4 text-center">All Leads Display</div>
            <div className="flex justify-center mb-4">
              <button
                className={`mr-4 font-semibold text-gray-600 hover:text-black ${activeTab === 'freelance' ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab('freelance')}
              >
                Freelance
              </button>
              <button
                className={`font-semibold text-gray-600 hover:text-black ${activeTab === 'remote' ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab('remote')}
              >
                Remote
              </button>
            </div>
            <div>
              {activeTab === 'freelance' && freelanceLeads.map(lead => (
                <div key={lead._id} className="lg:p-10 md:p-10 p-2 border rounded-md shadow-lg mb-5">
                  <p><strong>Title:</strong> {lead.title}</p>
                  <p><strong>Description:</strong> {Array.isArray(lead.description) ? lead.description.reduce((acc, cur, idx) => acc + (idx !== 0 ? ', ' : '') + cur, '') : lead.description}</p>
                  <p><strong>Tags:</strong> {Array.isArray(lead.tags) ? lead.tags.reduce((acc, cur, idx) => acc + (idx !== 0 ? ', ' : '') + cur, '') : lead.tags}</p>
                  <p><strong>Timestamp:</strong> {lead.timestamp}</p>
                  <p><strong>Level:</strong> {lead.level}</p>
                  <p><strong>Duration:</strong> {lead.duration}</p>
                  <p><strong>Budget:</strong> {lead.project_budget}</p>
                  <p className='break-words'><strong>Link:</strong> {lead.link}</p>
                  <div className='text-center pt-3'>
                    <button onClick={() => handleEditLead(lead._id, 'freelance')} className='font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300'>Edit</button>
                    <button onClick={() => handleDeleteLead(lead._id, 'freelance')} className='font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300'>Delete</button>
                  </div>
                </div>
              ))}
              {activeTab === 'remote' && remoteLeads.map(lead => (
                <div key={lead._id} className="lg:p-10 md:p-10 p-2 border rounded-md shadow-lg mb-5">
                  <p><strong>Title:</strong> {lead.Title}</p>
                  <p><strong>Description:</strong> {Array.isArray(lead.Description) ? lead.Description.reduce((acc, cur, idx) => acc + (idx !== 0 ? ', ' : '') + cur, '') : lead.Description}</p>
                  <p><strong>Tags:</strong> {Array.isArray(lead.Tags) ? lead.Tags.reduce((acc, cur, idx) => acc + (idx !== 0 ? ', ' : '') + cur, '') : lead.Tags}</p>
                  <p><strong>Timestamp:</strong> {lead.timestamp}</p>
                  <p><strong>Level:</strong> {lead.Level}</p>
                  <p><strong>Duration:</strong> {lead.Duration}</p>
                  <p><strong>Budget:</strong> {lead.Project_Budget}</p>
                  <p className='break-words'><strong>Link:</strong> {lead.Link}</p>
                  <div className='text-center pt-3'>
                    <button onClick={() => handleEditLead(lead._id, 'remote')} className='font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300'>Edit</button>
                    <button onClick={() => handleDeleteLead(lead._id, 'remote')} className='font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300'>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Freelance Update Form Modal */}
      {showFreelanceUpdateForm && (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg">
      {/* Render input fields for updating freelance lead */}
      <form onSubmit={handleSubmit} className='w-[250px] md:w-[320px] lg:w-[450px] grid gap-2 relative'>
        <button className='text-black'><CgCloseR className='right-[-15px] top-[-20px] absolute text-2xl text-[--three-color]' onClick={() => setShowFreelanceUpdateForm(false)} /></button>
        <input type="text" name="title" placeholder="Title" value={freelanceFormData.title} onChange={handleChange} className='rounded-xl' />
        {/* Add other input fields as needed */}
        <input type="text" name="description" placeholder="Description" value={freelanceFormData.description} onChange={handleChange} className='rounded-xl' />
        <input type="text" name="tags" placeholder="Tags" value={freelanceFormData.tags} onChange={handleChange} className='rounded-xl' />
        <input type="text" name="timestamp" placeholder="Timestamp" value={freelanceFormData.timestamp} onChange={handleChange} className='rounded-xl' />
        <input type="text" name="level" placeholder="Level" value={freelanceFormData.level} onChange={handleChange}className='rounded-xl' />
        <input type="text" name="duration" placeholder="Duration" value={freelanceFormData.duration} onChange={handleChange} className='rounded-xl' />
        <input type="text" name="project_budget" placeholder="Project Budget" value={freelanceFormData.project_budget} onChange={handleChange}className='rounded-xl' />
        <input type="text" name="link" placeholder="Link" value={freelanceFormData.link} onChange={handleChange} className='rounded-xl' />
        <button type="submit" className='rounded-xl w-full bg-[--three-color] text-white p-2'onClick={handleSubmit}>Update</button>
        <button type="button" className='rounded-xl w-full bg-[--three-color] text-white p-2' onClick={() => {
          setShowFreelanceUpdateForm(false);
          setFreelanceFormData({}); // Reset form data
        }}>Reset</button>
      </form>
    </div>
  </div>
)}

      {/* Remote Update Form Modal */}
      {showRemoteUpdateForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            {/* Render input fields for updating remote lead */}
            <form onSubmit={handleSubmit} className='w-[250px] md:w-[320px] lg:w-[450px] grid gap-2 relative'>
              <button className='text-black'><CgCloseR className='right-[-15px] top-[-20px] absolute text-2xl text-[--three-color]' onClick={() => setShowRemoteUpdateForm(false)} /></button>
              <input type="text" name="Title" placeholder="Title" value={remoteFormData.Title} onChange={handleChange} className='rounded-xl' />
              <input type="text" name="Description" placeholder="Description" value={remoteFormData.Description} onChange={handleChange} className='rounded-xl' />
              <input type="text" name="Tags" placeholder="Tags" value={remoteFormData.Tags} onChange={handleChange} className='rounded-xl' />
              <input type="text" name="timestamp" placeholder="Timestamp" value={remoteFormData.timestamp} onChange={handleChange} className='rounded-xl' />
              <input type="text" name="Level" placeholder="Level" value={remoteFormData.Level} onChange={handleChange}className='rounded-xl' />
              <input type="text" name="Duration" placeholder="Duration" value={remoteFormData.Duration} onChange={handleChange} className='rounded-xl' />
              <input type="text" name="Project_Budget" placeholder="Project Budget" value={remoteFormData.Project_Budget} onChange={handleChange}className='rounded-xl' />
              <input type="text" name="Link" placeholder="Link" value={remoteFormData.Link} onChange={handleChange} className='rounded-xl' />
              <button type="submit" className='rounded-xl w-full bg-[--three-color] text-white p-2' onClick={handleSubmit}>Update</button>
              <button type="button" className='rounded-xl w-full bg-[--three-color] text-white p-2' onClick={() => {
                setShowRemoteUpdateForm(false);
                setRemoteFormData({}); // Reset form data
              }}>Reset</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowLeads;