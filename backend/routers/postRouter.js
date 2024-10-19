import express from 'express'
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/postContoller.js';
import upload from '../middleware/multerConfig.js';

const router=express.Router();

router.get('/',getPosts);
router.get('/:id',getPostById);
router.post('/',upload.single('image'),createPost);
router.put('/:id',upload.single('image'),updatePost)
router.delete('/:id',deletePost);

export default router;