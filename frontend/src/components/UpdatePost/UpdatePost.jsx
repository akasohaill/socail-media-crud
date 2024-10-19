import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdatePost.css'; // Import CSS for styling

const UpdatePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', description: '', image: '' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    if (image) formData.append('image', image);

    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, formData);
      navigate('/posts'); // Navigate to the PostList page after update
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update-post-container">
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit} className="update-post-form">
        <input
          type="text"
          value={post.title}
          onChange={e => setPost({ ...post, title: e.target.value })}
          placeholder="Title"
          required
          className="form-input"
        />
        <textarea
          value={post.description}
          onChange={e => setPost({ ...post, description: e.target.value })}
          placeholder="Description"
          required
          className="form-textarea"
        />
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
          className="form-file-input"
          accept="image/*"
        />
        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
};

export default UpdatePost;
