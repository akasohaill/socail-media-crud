import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'; // Import the CSS file for styling

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/posts', formData);
      navigate('/posts'); // Navigate back to the posts list after creation
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Title" 
          className="form-input" 
          required 
        />
        <textarea 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Description" 
          className="form-textarea" 
          required 
        />
        <input 
          type="file" 
          onChange={e => setImage(e.target.files[0])} 
          className="form-file-input" 
          accept="image/*" 
          required 
        />
        <button type="submit" className="submit-button">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
