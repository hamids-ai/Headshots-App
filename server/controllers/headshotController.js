import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { generateHeadshotWithAI } from '../services/imageGeneration.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload image endpoint
export const uploadImage = async (req, res, next) => {
  try {
    console.log('📤 Received image upload request');

    if (!req.file) {
      console.error('❌ No file in request');
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const imageData = {
      imageId: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
    };

    console.log('✅ Image uploaded:', imageData.imageId);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: imageData,
    });
  } catch (error) {
    console.error('❌ Error in uploadImage:', error);
    next(error);
  }
};

// Generate headshot endpoint with Google Gemini API
export const generateHeadshot = async (req, res, next) => {
  try {
    console.log('📨 Received headshot generation request');
    console.log('   Request body:', JSON.stringify(req.body, null, 2));

    const { imageId, style } = req.body;

    if (!imageId || !style) {
      console.error('❌ Validation failed: Missing imageId or style');
      return res.status(400).json({
        success: false,
        message: 'Image ID and style are required',
      });
    }

    // Construct path to uploaded image
    const imagePath = path.join(__dirname, '../uploads', imageId);
    console.log('📂 Image path:', imagePath);

    // Check if file exists
    try {
      await fs.access(imagePath);
      console.log('✓ Image file found');
    } catch (err) {
      console.error('❌ Image file not found:', err.message);
      return res.status(404).json({
        success: false,
        message: 'Uploaded image not found',
      });
    }

    console.log(`🚀 Starting headshot generation for ${imageId} with style: ${style}`);

    // Generate headshot using Google Gemini API
    const generatedImageBase64 = await generateHeadshotWithAI(imagePath, style);

    // Return the base64 image directly
    res.status(200).json({
      success: true,
      message: 'Headshot generated successfully',
      data: {
        imageUrl: `data:image/png;base64,${generatedImageBase64}`,
        style: style,
        status: 'completed',
      },
    });
  } catch (error) {
    console.error('Error in generateHeadshot controller:', error);
    next(error);
  }
};

// Check generation status endpoint (for async operations)
export const checkStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID is required',
      });
    }

    // Mock status check for Milestone 1
    res.status(200).json({
      success: true,
      data: {
        jobId: jobId,
        status: 'completed',
        progress: 100,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Download generated image endpoint
export const downloadImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    // For Milestone 1, return a placeholder response
    res.status(200).json({
      success: true,
      message: 'Download functionality will be implemented in Milestone 2',
    });
  } catch (error) {
    next(error);
  }
};
