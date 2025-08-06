import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ManageProjects.css'; // Assuming you have a shared admin CSS file

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        tags: '', // Tags will be a comma-separated string
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch all projects on component mount
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            Swal.fire('Error', 'Could not fetch projects.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', link: '', tags: '' });
        setImageFile(null);
        setImagePreview('');
        setIsEditing(false);
        setCurrentProjectId(null);
        document.getElementById('image-input').value = null; // Clear file input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const projectData = new FormData();
        projectData.append('title', formData.title);
        projectData.append('description', formData.description);
        projectData.append('link', formData.link);
        projectData.append('tags', formData.tags);
        if (imageFile) {
            projectData.append('image', imageFile);
        }

        try {
            if (isEditing) {
                // Update existing project
                await axios.put(`${API_BASE_URL}/api/projects/${currentProjectId}`, projectData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                Swal.fire('Success', 'Project updated successfully!', 'success');
            } else {
                // Create new project
                if (!imageFile) {
                    Swal.fire('Validation Error', 'Project image is required.', 'error');
                    return;
                }
                await axios.post(`${API_BASE_URL}/api/projects`, projectData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                Swal.fire('Success', 'Project created successfully!', 'success');
            }
            fetchProjects();
            resetForm();
        } catch (error) {
            console.error('Error saving project:', error);
            Swal.fire('Error', 'Could not save the project.', 'error');
        }
    };

    const handleEdit = (project) => {
        setIsEditing(true);
        setCurrentProjectId(project._id);
        setFormData({
            title: project.title,
            description: project.description,
            link: project.link || '',
            tags: project.tags.join(', '), // Convert array to comma-separated string
        });
        setImagePreview(`${API_BASE_URL}${project.imageUrl}`);
        window.scrollTo(0, 0); // Scroll to top to see the form
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_BASE_URL}/api/projects/${id}`);
                    Swal.fire('Deleted!', 'The project has been deleted.', 'success');
                    fetchProjects();
                } catch (error) {
                    console.error('Error deleting project:', error);
                    Swal.fire('Error', 'Could not delete the project.', 'error');
                }
            }
        });
    };

    return (
        <div className="admin-container">
            <h2>{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
            
            <form onSubmit={handleSubmit} className="admin-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Project Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma-separated, e.g., React, Node.js)"
                    value={formData.tags}
                    onChange={handleInputChange}
                />
                <input
                    type="url"
                    name="link"
                    placeholder="Project Link (e.g., https://example.com)"
                    value={formData.link}
                    onChange={handleInputChange}
                />
                <label htmlFor="image-input">Project Image</label>
                <input
                    id="image-input"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Project Preview" style={{ width: '150px', marginTop: '10px', borderRadius: '8px' }} />
                    </div>
                )}
                <div className="form-actions">
                    <button type="submit">{isEditing ? 'Update Project' : 'Add Project'}</button>
                    {isEditing && <button type="button" onClick={resetForm} className="cancel-btn">Cancel Edit</button>}
                </div>
            </form>

            <hr className="divider" />

            <h2>Existing Projects</h2>
            {loading ? <p>Loading projects...</p> : (
                <div className="admin-list">
                    {projects.map((project) => (
                        <div key={project._id} className="admin-item">
                            <div className="item-details">
                                <img src={`${API_BASE_URL}${project.imageUrl}`} alt={project.title} className="item-image" />
                                <div>
                                    <h4>{project.title}</h4>
                                    <p>{project.description.substring(0, 100)}...</p>
                                    <div className="item-tags">
                                        {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                    </div>
                                </div>
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleEdit(project)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(project._id)} className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageProjects;
