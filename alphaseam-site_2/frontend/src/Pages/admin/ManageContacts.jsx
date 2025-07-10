import React, { useEffect, useState } from 'react';
import api from '../../api';
import './Admin.css';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/api/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="admin-container">
      <h2>Manage Contact Submissions</h2>

      <div className="admin-list">
        {contacts.length === 0 ? (
          <p>No contact messages found.</p>
        ) : (
          contacts.map((contact) => (
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
