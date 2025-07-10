import React, { useEffect, useState } from 'react';
import api from '../../api';
import './Admin.css';

const ManageCareers = () => {
  const [careers, setCareers] = useState([]);
  const [newCareer, setNewCareer] = useState({
    position: '',
    location: '',
    experience: '',
    description: '',
  });

  const fetchCareers = async () => {
    try {
      const res = await api.get('/api/careers');
      setCareers(res.data);
    } catch (err) {
      console.error('Error fetching careers:', err);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleInputChange = (e) => {
    setNewCareer({ ...newCareer, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const { position, location, experience, description } = newCareer;

    if (!position || !location || !experience || !description) {
      alert('All fields are required');
      return;
    }

    try {
      await api.post('/api/careers', newCareer);
      fetchCareers();
      setNewCareer({ position: '', location: '', experience: '', description: '' });
    } catch (err) {
      console.error('Career create error:', err);
      alert(err.response?.data?.message || 'Error adding career');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/careers/${id}`);
      fetchCareers();
    } catch (err) {
      console.error('Error deleting career:', err);
    }
  };

  return (
    <div className="admin-container">
      <h2>Manage Careers</h2>

      <div className="admin-form">
        <input
          name="position"
          type="text"
          placeholder="Position"
          value={newCareer.position}
          onChange={handleInputChange}
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={newCareer.location}
          onChange={handleInputChange}
        />
        <input
          name="experience"
          type="text"
          placeholder="Experience"
          value={newCareer.experience}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newCareer.description}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Add Career</button>
      </div>

      <div className="admin-list">
        {careers.map((career) => (
          <div key={career._id} className="admin-item">
            <h3>{career.position} — {career.location}</h3>
            <p><strong>Experience:</strong> {career.experience}</p>
            <p>{career.description}</p>
            <button onClick={() => handleDelete(career._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCareers;
