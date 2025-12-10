import express from 'express';
import upload from '../middleware/upload.js';
import { uploadLimiter, generateLimiter } from '../middleware/rateLimiter.js';
import {
  uploadImage,
  generateHeadshot,
  checkStatus,
  downloadImage,
} from '../controllers/headshotController.js';

const router = express.Router();

// Upload image
router.post('/upload', uploadLimiter, upload.single('image'), uploadImage);

// Generate headshot
router.post('/generate', generateLimiter, generateHeadshot);

// Check generation status
router.get('/status/:jobId', checkStatus);

// Download generated image
router.get('/download/:id', downloadImage);

export default router;
