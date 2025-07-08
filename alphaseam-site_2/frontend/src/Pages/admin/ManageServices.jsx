import React, { useEffect, useState } from 'react';
import api from '../../api';
import './admin.css';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    icon: '',
  });

  const fetchServices = () => {
    api.get('/api/services')
      .then((res) => setServices(res.data))
      .catch((err) => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = () => {
    api.post('/api/services', newService)
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
    api.delete(`/api/services/${id}`)
      .then(fetchServices)
      .catch((err) => console.error('Delete error:', err));
  };

  const handleUpdate = (id, updatedService) => {
    api.put(`/api/services/${id}`, updatedService)
      .then(fetchServices)
      .catch((err) => console.error('Update error:', err));
  };

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
        {services.map((service) => (
          <div key={service._id} className="admin-item">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button onClick={() => handleDelete(service._id)}>Delete</button>
            {/* Optional: Add inline editing or modal for update */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;
