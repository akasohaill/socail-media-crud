import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostList.css'; // Make sure to create a CSS file for styling
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id)); // Remove deleted post from state
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post.');
    }
  };

  const handleCreatePost = () => {
    navigate('/create-post');
     // Navigate to the create post page
  };

  const handleUpdate = (id) => {
    navigate(`/update-post/${id}`); // Navigate to the update post page with the post ID
  };

  if (loading) {
    return <p className="loading-message">Loading posts...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <button onClick={handleCreatePost} className="create-post-button">Create Post</button>
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className="post">
              <h2>{user.firstName} {user.lastName}</h2>
              {post?.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image.replace(/\\/g, '/')}`}
                  
                  className="post-image"
                  alt={post.title} // Added alt text for accessibility
                />
              )}
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <div className="post-buttons">
                <button className='update-button' onClick={() => handleUpdate(post._id)}>Update</button>
                <button className='delete-button' onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
};

export default PostList;  