import { Post } from "../models/postModel.js";
import path from 'path';

// Create post
export const createPost = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;  // Store the filename only

  try {
    const newPost = new Post({ title, description, image });
    await newPost.save();
    res.status(201).json({ msg: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ msg: "Error creating the post" });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ msg: "Error retrieving posts" });
  }
};

// Get post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Normalize image path for consistent URLs
    const updatedPost = {
      ...post._doc,
      image: post.image ? path.join('/uploads', post.image).replace(/\\/g, '/') : null
    };

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error retrieving post by ID:', error);
    res.status(500).json({ msg: "Error retrieving the post" });
  }
};

// Update post
export const updatePost = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }  // Return the updated post
    );
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Normalize the image path
    const updatedPost = {
      ...post._doc,
      image: post.image ? path.join('/uploads', post.image).replace(/\\/g, '/') : null
    };

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ msg: "Error updating the post" });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ msg: "Error deleting the post" });
  }
};
