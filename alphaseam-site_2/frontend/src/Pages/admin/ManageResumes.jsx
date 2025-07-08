import React, { useEffect, useState } from 'react';
import api from '../../api';
import './admin.css';

const ManageResumes = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    api.get('/api/resumes')
      .then(res => setResumes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-container">
      <h2>Manage Resume Submissions</h2>
      {resumes.map(r => (
        <div className="admin-item" key={r._id}>
          <h4>{r.name} - {r.job}</h4>
          <p>Email: {r.email}</p>
          <p>Phone: {r.phone}</p>
          <p>Message: {r.message}</p>
          {r.resumePath ? (
            <a
              href={`http://localhost:5000/${r.resumePath.replace(/\\/g, '/')}`}
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
