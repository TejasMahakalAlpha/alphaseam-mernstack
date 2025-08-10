import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Use axios directly instead of the old 'api' file
import './Admin.css';

// This line is correct
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ManageResumes = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    // Add ${API_BASE_URL} to the API call
    axios.get(`${API_BASE_URL}/api/resumes`)
      .then(res => setResumes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-container">
      <h2>Manage Resume Submissions</h2>
      {/* Add Array.isArray check for safety */}
      {Array.isArray(resumes) && resumes.map(r => (
        <div className="admin-item" key={r._id}>
          <h4>{r.name} - {r.job}</h4>
          <p>Email: {r.email}</p>
          <p>Phone: {r.phone}</p>
          <p>Message: {r.message}</p>
          {r.resumePath ? (
            <a
              // This link part was already correct
              href={`${API_BASE_URL}/${r.resumePath.replace(/\\/g, '/')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          ) : (
            <span style={{ color: 'red' }}>No File</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageResumes;