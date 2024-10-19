import express from 'express';
import cors from 'cors';
import dotenv, { configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import postRouter from './routers/postRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialisation
configDotenv();
const app = express();
const port = process.env.PORT || 4000;

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// api endpoints
app.use('/api/posts', postRouter);

// server listening
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
});
