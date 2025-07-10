import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Dashboard = () => {
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <nav className="admin-nav">
        <Link to="/admin/manage-services">Manage Services</Link>
        <Link to="/admin/manage-blogs">Manage Blogs</Link>
        <Link to="/admin/manage-careers">Manage Careers</Link>
        <Link to="/admin/manage-contacts">Manage Contacts</Link>
<Link to="/admin/resumes">Manage Resume</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
