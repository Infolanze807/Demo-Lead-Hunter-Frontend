import React, {useState} from 'react'

function AddLeads() {

  const [formData, setFormData] = useState({
    title: '',
    description: [],
    tags: [],
    level: '',
    timestamp: '',
    duration: '',
    budget: '',
    link: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you need, like authentication headers
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
  
      console.log('Form data submitted successfully!');
      // Optionally, you can reset the form after successful submission
      setFormData({
        title: '',
        description: [],
        tags: [],
        level: '',
        timestamp: '',
        duration: '',
        budget: '',
        link: '',
      });
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
  };

  return (
    <div className='font-family bg-[--main-color]'>
      <div className='px-4 lg:px-28 md:px-20 py-10'>
        <div>
          <div>
            <div className="mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl font-semibold mb-4 text-center">Input Leads Details</div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block font-medium mb-1">Add Title:</label>
                  <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block font-medium mb-1">Add Description:</label>
                  <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="tags" className="block font-medium mb-1">Add Skills:</label>
                  <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="level" className="block font-medium mb-1">Add Level:</label>
                  <input type="text" id="level" name="level" value={formData.level} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="timestamp" className="block font-medium mb-1">Add Time:</label>
                  <input type="text" id="timestamp" name="timestamp" value={formData.timestamp} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="durationl" className="block font-medium mb-1">Add Durection:</label>
                  <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="budget" className="block font-medium mb-1">Add Budget:</label>
                  <input type="text" id="budget" name="budget" value={formData.budget} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="link" className="block font-medium mb-1">Add Link:</label>
                  <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div className='text-center'>
                  <button type="submit" className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLeads;