# Professional Headshot AI App - Specification


## Overview

A web application that transforms user-uploaded photos into professional headshots using AI-powered image generation. Users can select from multiple professional styles and compare the AI-generated headshot side-by-side with their original photo.



## Core Features



### 1. Photo Upload

- Users can upload a single photo (JPG, PNG, WebP formats)

- File size limit: 10MB

- Image dimension validation (minimum 512x512px)

- Basic validation for file size (max 10MB) and format




### 2. Style Selection

Users can choose from four professional headshot styles:



- **Corporate Classic**: Traditional business headshot with neutral background, professional attire emphasis

- **Creative Professional**: Modern, approachable look with subtle creative elements

- **Executive Portrait**: High-end, polished executive presence with premium lighting

- **Authentically Creative Social Media**: Vibrant, personality-driven style optimized for social platforms



### 3. AI Image Generation

- Integration with Google's Gemini Nano Banana API (https://ai.google.dev/gemini-api/docs/image-generation)

- Style-specific prompts to guide the AI generation

- Processing status feedback to users

- Processing time estimation display

- Error handling for API failures or rate limits



### 4. Side-by-Side Comparison

- Split-screen view showing original vs. generated headshot

- Download functionality for the AI-generated headshot

- Metadata preservation where applicable for download

- Option to generate another headshot with a different style

- Responsive design for mobile and desktop viewing



## Technical Requirements



### Frontend (React)



#### Core Dependencies

- **React 18+**: UI framework

- **React Router**: Navigation and routing

- **Axios/Fetch API**: HTTP requests to backend

- **Tailwind CSS v3 (instead of v4)**: Styling framework

- **React Dropzone**: File upload handling

- **React Compare Image**: Side-by-side image comparison component



#### Key Components

```

src/

├── components/

│   ├── UploadSection.jsx       # Photo upload interface

│   ├── StyleSelector.jsx       # Style selection buttons/cards

│   ├── ComparisonView.jsx      # Side-by-side image display

│   ├── LoadingSpinner.jsx      # Processing feedback

│   └── DownloadButton.jsx      # Download generated image

├── pages/

│   ├── Home.jsx                # Main application page

│   └── Results.jsx             # Results/comparison page

├── services/

│   └── api.js                  # API client for backend

├── utils/

│   └── imageValidation.js      # Image validation utilities

└── App.jsx                     # Main application component

```



#### State Management

- React Context API or useState/useReducer for:

  - Uploaded image data

  - Selected style

  - Generated headshot

  - Loading states

  - Error messages



### Backend (Express)



#### Core Dependencies

- **Express**: Web server framework

- **Multer**: File upload handling

- **Sharp**: Image processing and optimization

- **Google AI SDK**: Integration with Imagen 3 API

- **Dotenv**: Environment variable management

- **Cors**: Cross-origin resource sharing

- **Express Rate Limit**: API rate limiting



#### API Endpoints

```

POST /api/upload          # Handle image upload

POST /api/generate        # Generate headshot with selected style

GET  /api/status/:jobId   # Check generation status (if async)

GET  /api/download/:id    # Download generated image

```



#### Server Structure

```

server/

├── routes/

│   └── headshot.js            # Headshot generation routes

├── controllers/

│   └── headshotController.js  # Business logic

├── middleware/

│   ├── upload.js              # Multer configuration

│   ├── errorHandler.js        # Error handling middleware

│   └── rateLimiter.js         # Rate limiting

├── services/

│   └── imageGeneration.js     # Google Imagen 3 integration

├── utils/

│   └── imageProcessor.js      # Image optimization utilities

└── server.js                  # Express app entry point

```



#### Environment Variables

```

PORT=5000

NODE_ENV=development

GOOGLE_API_KEY=your_google_api_key

MAX_FILE_SIZE=10485760

UPLOAD_DIR=./uploads

```



### Database (Optional for MVP)

- **Option 1**: File system storage for temporary images

- **Option 2**: PostgreSQL/MongoDB for user history (future feature)

- Session/request tracking for usage analytics



### External Services

- **Google Imagen 3 API**: Image-to-image generation

  - API Documentation: https://ai.google.dev/gemini-api/docs/image-generation

  - Model: `imagen-3.0-generate-001`

  - Requires Google AI API key



## Style Prompt Templates



Each style will have a specific prompt template for the Imagen 3 API:



### Corporate Classic

```

"Professional corporate headshot of a person, neutral gray or blue background,

business formal attire, confident expression, studio lighting, high resolution,

professional photography style"

```



### Creative Professional

```

"Modern professional headshot with creative flair, person with approachable

expression, soft natural lighting, contemporary office or minimal background,

business casual attire, warm tones, professional yet relaxed"

```



### Executive Portrait

```

"High-end executive portrait, person in premium business attire, sophisticated

solid background, dramatic professional lighting, confident authoritative presence,

luxury photography style, sharp details"

```



### Authentically Creative Social Media

```

"Vibrant creative professional headshot for social media, person with genuine

friendly expression, colorful or artistic background, modern casual professional

attire, natural lighting, energetic and personable, high engagement style"

```



## Milestones



### Milestone 1: UI Setup and Frontend Foundation

**Goal**: Build a fully functional frontend interface without AI integration



#### Tasks

1. **Project Initialization**

   - Set up React project with Create React App or Vite

   - Install Tailwent CSS version 3

   - Configure Tailwind CSS version 3

   - Set up React Router for navigation

   - Create basic project structure



2. **Upload Interface**

   - Implement photo upload component with drag-and-drop

   - Add image preview functionality

   - Implement client-side validation (file type, size)

   - Create file upload UI/UX with progress indicator



3. **Style Selection Component**

   - Design and implement 4 style selection cards

   - Add hover states and selection indicators

   - Create responsive grid layout

   - Add style descriptions and preview thumbnails



4. **Comparison View**

   - Implement side-by-side image comparison component

   - Add responsive layout (stacked on mobile, side-by-side on desktop)

   - Create download button component

   - Add "Try Another Style" navigation



5. **State Management**

   - Set up React Context or state management

   - Implement navigation flow: Upload → Select Style → View Results

   - Add loading states and error boundaries



6. **Express Backend Foundation**

   - Initialize Express server

   - Configure CORS for frontend connection

   - Set up Multer for file uploads

   - Create basic API endpoints (stubbed responses)

   - Add error handling middleware



**Deliverables**:

- Fully functional UI with mock data

- File upload and preview working

- Style selection functional

- Side-by-side comparison view with placeholder images

- Backend server accepting uploads and returning mock responses



**Acceptance Criteria**:

- User can upload an image and see preview

- User can select from 4 styles

- User can navigate through the flow

- Comparison view displays two images side-by-side

- Mobile responsive design

- Basic Express server running and accepting requests



---



### Milestone 2: Google Gemini Nano Banana API Integration

**Goal**: Integrate Google's Gemini Nano Banana API Integration



#### Tasks

1. **Google AI Setup**

   - Obtain Google AI API key

   - Install Google AI SDK (`@google/generative-ai`)

   - Configure environment variables

   - Set up API client in backend



2. **Image-to-Image Generation Service**

   - Implement API integration

   - Create style-specific prompt generation

   - Handle image format conversion (ensure compatibility)

   - Implement base64 encoding for image transmission

   - Add retry logic for API failures



3. **Backend API Enhancement**

   - Connect upload endpoint to temporary storage

   - Implement `/api/generate` endpoint with Imagen 3 call

   - Add request validation and sanitization

   - Implement proper error responses

   - Add rate limiting to prevent abuse



4. **Frontend-Backend Integration**

   - Connect upload component to backend API

   - Implement generate headshot API call with selected style

   - Add loading states during generation (can take 10-30 seconds)

   - Handle and display error messages from API

   - Implement image download from generated result



5. **Image Processing Pipeline**

   - Optimize uploaded images before sending to API

   - Process generated images for optimal display

   - Implement caching strategy for generated images

   - Add cleanup for temporary files



6. **Testing and Optimization**

   - Test all 4 style prompts for quality

   - Refine prompts based on output quality

   - Test error scenarios (API down, rate limits, invalid images)

   - Optimize image sizes for faster processing

   - Add logging for debugging



**Deliverables**:

- Fully functional AI headshot generation

- All 4 styles producing quality results

- Proper error handling and user feedback

- Working download functionality

- Optimized image processing pipeline



**Acceptance Criteria**:

- User uploads photo → receives AI-generated headshot

- All 4 styles produce distinct, high-quality results

- Generation completes within 30 seconds

- Errors are gracefully handled with user-friendly messages

- Side-by-side comparison shows original vs. AI-generated image

- User can download the generated headshot

- Rate limiting prevents API abuse

- Application handles API quota/rate limit errors



## User Flow



1. **Landing**: User arrives at homepage with clear CTA to upload photo

2. **Upload**: User uploads or drags photo into upload zone

3. **Preview & Validate**: Image preview shown, validation feedback provided

4. **Style Selection**: User selects one of four professional styles

5. **Processing**: Loading indicator while AI generates headshot (15-30 seconds)

6. **Results**: Side-by-side comparison view displays original vs. generated

7. **Actions**: User can download image or try another style



## Non-Functional Requirements



### Performance

- Image upload: < 2 seconds

- AI generation: < 30 seconds

- Page load: < 3 seconds

- Mobile responsive across all screen sizes



### Security

- File type validation on frontend and backend

- File size limits enforced

- API key secured in environment variables

- Rate limiting to prevent abuse

- Input sanitization for all user inputs



### Scalability Considerations

- Stateless backend for horizontal scaling

- Image storage cleanup (TTL for temporary files)

- API rate limit handling with queue system (future)

- CDN for static assets (future)




## Future Enhancements (Post-MVP)

- User accounts and generation history

- Batch processing (multiple photos)

- Custom style creation with fine-tuning

- Social media direct sharing

- Advanced editing tools (crop, filters)

- API usage dashboard




## Success Metrics

- Image generation success rate > 95%

- Average generation time < 25 seconds

- User completes flow (upload → download) > 60%

- Mobile usage > 40%

- API error rate < 5%





## References

- React Documentation: https://react.dev

- Express Documentation: https://expressjs.com
