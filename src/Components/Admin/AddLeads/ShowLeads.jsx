import React, { useState, useEffect } from 'react';

function ShowLeads() {
  const [showLeadsDetails, setShowLeadsDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leads`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setShowLeadsDetails(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleDeleteLead = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leads/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }
      // Remove the deleted lead from the state
      setShowLeadsDetails(prevLeads => prevLeads.filter(lead => lead._id !== _id));
    } catch (error) {
      console.error('Error deleting lead:', error.message);
    }
  };
  

  return (
    <div className='font-family bg-[--main-color]'>
      <div className='px-4 lg:px-28 md:px-20 py-10'>
        <div className='bg-white lg:p-10 md:p-10 p-2 rounded-lg shadow-lg'>
          <div className="">
            <div className="text-4xl font-semibold mb-6 mt-4 text-center">All Leads Display</div>
            {showLeadsDetails.map(lead => (
              <div key={lead._id} className="lg:p-10 md:p-10 p-2 border rounded-md shadow-lg mb-5">
                <p><strong>Title:</strong> {lead.title}</p>
                <p><strong>Description:</strong> {Array.isArray(lead.description) ? lead.description.reduce((acc, cur, idx) => acc + (idx !== 0 ? ', ' : '') + cur, '') : lead.description}</p>
                <p><strong>Tags:</strong> {Array.isArray(lead.tags) ? lead.tags.reduce((acc, cur, idx) => acc + (idx !== 0 ? ', ' : '') + cur, '') : lead.tags}</p>
                <p><strong>Timestamp:</strong> {lead.timestamp}</p>
                <p><strong>Level:</strong> {lead.level}</p>
                <p><strong>Duration:</strong> {lead.duration}</p>
                <p><strong>Budget:</strong> {lead.budget}</p>
                <p className='break-words'><strong>Link:</strong> {lead.link}</p>
                <div className='text-center pt-3'>
                  <button onClick={() => handleDeleteLead(lead._id)} className='font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300'>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowLeads;

// const demoLeadDetails = [
//   {
//     id: 1,
//     title: 'Design App Using Figma',
//     description: ['We are a new startup looking for an experience and creative mobile app designer to design the user interface.', 'hy'],
//     tags: ['Figma', 'UI/UX'],
//     timestamp: '7 hours ago',
//     // dis: 'That is highly scalable for impliment APIs',
//     level: "Intermidiat"
//   },
//   {
//     id: 2,
//     title: 'Backend Developer',
//     description: ['We are looking for an experienced backend developer proficient in Node.js and MongoDB for our upcoming project.', 'hello i am new pragraph.', 'hello.', 'i urgent need backend developer.'],
//     tags: ['Node.js', 'MongoDB', 'Backend'],
//     timestamp: '2 days ago',
//     level: 'Expert',
//     duretion: "1-3 Month",
//     budget: '$30 - $250',
//     link: "https://www.freelancer.in/projects/java/Animated-Homepage-Creation-For-Black-37873412?sb=t",
//   },
//   {
//       id: 3,
//       title: 'Frontend Developer Needed',
//       description: ['We are looking for an experienced frontend developer proficient in react.js and express for our upcoming project.'],
//       tags: ['React.js', 'Express.js', 'Frontend'],
//       timestamp: '2 days ago'
//     }
// ];
