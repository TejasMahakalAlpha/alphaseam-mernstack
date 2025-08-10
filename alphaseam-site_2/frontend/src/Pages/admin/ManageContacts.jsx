import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Use axios directly
import './Admin.css';

// Add the API_BASE_URL constant
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      // Add ${API_BASE_URL} to the request
      const res = await axios.get(`${API_BASE_URL}/api/contacts`);
      setContacts(res.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };
  
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Add ${API_BASE_URL} to the request
      await axios.delete(`${API_BASE_URL}/api/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  return (
    <div className="admin-container">
      <h2>Manage Contact Submissions</h2>

      <div className="admin-list">
        {contacts.length === 0 ? (
          <p>No contact messages found.</p>
        ) : (
          Array.isArray(contacts) && contacts.map((contact) => (
            <div key={contact._id} className="admin-item">
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <button onClick={() => handleDelete(contact._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageContacts;
