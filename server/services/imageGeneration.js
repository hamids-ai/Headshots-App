import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Google GenAI with API key for consumer API (not Vertex AI)
console.log('🔑 Initializing Google GenAI...');
console.log('API Key present:', !!process.env.GOOGLE_API_KEY);
console.log('API Key length:', process.env.GOOGLE_API_KEY?.length || 0);

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// Style-specific prompts from prompts.md
const stylePrompts = {
  'corporate-classic': `Transform this photo into a polished profile shot maintaining the exact facial features and identity. Subject framed chest-up with headroom, eyes looking directly at camera while body angles slightly away. White t-shirt with black leather jacket, open smile. Neutral studio background. High-angle perspective with soft, diffused lighting creating gentle catchlights. 85mm lens aesthetic with shallow depth of field - sharp focus on eyes, soft bokeh background. Natural skin texture with visible hair detail. Bright, airy feel. Make subject look great and accurate to their original appearance.`,

  'creative-professional': `Transform this photo into a close-up portrait with shallow depth of field creating soft bokeh background. Warm, natural lighting highlighting subject's features. Casual attire and genuine, engaging smile. Subject fills more of the frame. Background hints at creative workspace or outdoor setting with beautiful blur. Preserve natural skin texture and authentic features. Modern, approachable creative professional aesthetic. Make subject look great and accurate to their original appearance.`,

  'executive-portrait': `Transform this photo into a dramatic black and white portrait in editorial style. Preserve subject's authentic features and character. Apply these specifications: monochromatic treatment with rich grayscale tones, deep charcoal or black background with subtle gradation, dramatic side lighting creating strong shadows and highlights on face (Rembrandt or split lighting), preserve all natural skin texture and detail - no smoothing, sharp focus capturing fine details in eyes and facial features, relaxed and contemplative expression - not smiling, casual professional attire (dark textured jacket, no tie), hand gesture near chest or face for dynamic composition, high contrast with deep blacks and bright highlights, cinematic film grain for texture. Maintain editorial photography aesthetic - artistic but professional. Make subject look great and accurate to their original appearance.`,

  'creative-social': `Transform this photo into a stunning Instagram profile picture that is cool, unique, positive, authentic, and creative.

Key Requirements:
- Maintain the subject's recognizable features and authentic likeness
- Enhance the image with artistic flair while keeping it genuine and natural
- Optimize for circular crop (Instagram profile format)
- Create visual interest that stands out in a small thumbnail
- Use vibrant, positive color grading with warm, inviting tones
- Add subtle creative elements like:
  * Artistic lighting effects (golden hour glow, rim lighting, or soft bokeh)
  * Tasteful color pop or selective color enhancement
  * Slight artistic blur or depth-of-field effects
  * Clean, uncluttered background or subtle gradient
  * Professional retouching while maintaining natural skin texture

Style Guidelines:
- Modern and contemporary aesthetic
- Confidence-inspiring and approachable vibe
- Eye-catching but not over-processed
- Professional yet personable
- Emphasize the subject's best features naturally

Technical Specs:
- High resolution and sharp focus on face/subject
- Well-balanced exposure and contrast
- Colors that pop on both light and dark mode interfaces
- Consider how it looks at small sizes (150x150px)`,
};

/**
 * Generate a professional headshot using Google's Gemini API
 * @param {string} imagePath - Path to the uploaded image
 * @param {string} styleId - Style ID (corporate-classic, creative-professional, etc.)
 * @returns {Promise<string>} - Base64 encoded generated image
 */
export const generateHeadshotWithAI = async (imagePath, styleId) => {
  try {
    console.log(`📥 Starting generation for image: ${imagePath}, style: ${styleId}`);

    // Validate style
    const prompt = stylePrompts[styleId];
    if (!prompt) {
      const error = `Invalid style ID: ${styleId}. Available: ${Object.keys(stylePrompts).join(', ')}`;
      console.error('❌', error);
      throw new Error(error);
    }

    console.log('✓ Style validated');

    // Read the image file
    console.log('📂 Reading image file...');
    const imageData = await fs.readFile(imagePath);
    const base64Image = imageData.toString('base64');
    console.log(`✓ Image read successfully (${imageData.length} bytes)`);

    // Get file extension to determine mime type
    const ext = path.extname(imagePath).toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.webp') mimeType = 'image/webp';

    console.log(`✓ MIME type: ${mimeType}`);

    // Prepare the prompt for the API
    const promptArray = [
      { text: prompt },
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
    ];

    console.log(`🎨 Calling Google Gemini API...`);
    console.log(`   Model: gemini-2.5-flash-image`);
    console.log(`   Prompt length: ${prompt.length} chars`);

    // Call Google Gemini API using the new SDK pattern
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: promptArray,
    });

    console.log('✓ API call completed');
    console.log('Response structure:', JSON.stringify(response, null, 2).substring(0, 500));

    // Extract the generated image from the response
    if (!response.candidates || response.candidates.length === 0) {
      console.error('❌ No candidates in response');
      throw new Error('No candidates returned from API');
    }

    const candidate = response.candidates[0];
    if (!candidate.content || !candidate.content.parts) {
      console.error('❌ Invalid candidate structure:', JSON.stringify(candidate, null, 2));
      throw new Error('Invalid response structure from API');
    }

    // Find the image part in the response
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        console.log('✅ Headshot generated successfully');
        console.log('   Image size:', part.inlineData.data.length, 'bytes (base64)');
        return part.inlineData.data; // Return base64 encoded image
      }
    }

    console.error('❌ No image data in response parts:', JSON.stringify(candidate.content.parts, null, 2));
    throw new Error('No image data found in API response');
  } catch (error) {
    console.error('❌ Error generating headshot:');
    console.error('   Message:', error.message);
    console.error('   Stack:', error.stack);
    if (error.response) {
      console.error('   API Response:', JSON.stringify(error.response, null, 2));
    }
    throw error;
  }
};

/**
 * Get the prompt for a specific style
 * @param {string} styleId - Style ID
 * @returns {string} - The prompt text
 */
export const getStylePrompt = (styleId) => {
  return stylePrompts[styleId] || stylePrompts['corporate-classic'];
};
