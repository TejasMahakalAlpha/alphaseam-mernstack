import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Use axios directly
import './Admin.css';

// Add the API_BASE_URL constant
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    icon: '',
  });

  const fetchServices = () => {
    // Add ${API_BASE_URL} to the request
    axios.get(`${API_BASE_URL}/api/services`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = () => {
    // Add ${API_BASE_URL} to the request
    axios.post(`${API_BASE_URL}/api/services`, newService)
      .then(() => {
        setNewService({ title: '', description: '', icon: '' });
        fetchServices();
      })
      .catch((err) => {
        alert('Failed to add service');
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    // Add ${API_BASE_URL} to the request
    axios.delete(`${API_BASE_URL}/api/services/${id}`)
      .then(fetchServices)
      .catch((err) => console.error('Delete error:', err));
  };

  // handleUpdate function is not used in the JSX, but if you use it, add the URL prefix there too.
  // const handleUpdate = (id, updatedService) => { ... };

  return (
    <div className="admin-container">
      <h2>Manage Services</h2>

      <div className="admin-form">
        <input
          type="text"
          placeholder="Title"
          value={newService.title}
          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Icon"
          value={newService.icon}
          onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
        />
        <button onClick={handleCreate}>Add Service</button>
      </div>

      <div className="admin-list">
        {Array.isArray(services) && services.map((service) => (
          <div key={service._id} className="admin-item">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button onClick={() => handleDelete(service._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;