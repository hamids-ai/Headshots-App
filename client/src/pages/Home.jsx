import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import UploadSection from '../components/UploadSection';
import StyleSelector from '../components/StyleSelector';
import LoadingSpinner from '../components/LoadingSpinner';
import { uploadImage, generateHeadshot } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const {
    uploadedImage,
    selectedStyle,
    setGeneratedHeadshot,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useApp();

  const [step, setStep] = useState(1); // 1: Upload, 2: Select Style

  const handleUploadComplete = () => {
    setStep(2);
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle) {
      setError('Please upload an image and select a style');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Upload image to backend
      const uploadResponse = await uploadImage(uploadedImage.file);

      // For Milestone 1, we'll use a mock response
      // In Milestone 2, this will call the actual AI API
      setTimeout(() => {
        // Mock generated headshot (using the original image as placeholder)
        setGeneratedHeadshot(uploadedImage.preview);
        setIsLoading(false);
        navigate('/results');
      }, 2000);

      // Uncomment for Milestone 2:
      // const generateResponse = await generateHeadshot(
      //   uploadResponse.imageId,
      //   selectedStyle.id
      // );
      // setGeneratedHeadshot(generateResponse.imageUrl);
      // setIsLoading(false);
      // navigate('/results');
    } catch (err) {
      console.error('Error generating headshot:', err);
      setError(err.response?.data?.message || 'Failed to generate headshot. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Headshot AI
          </h1>
          <p className="text-lg text-gray-600">
            Transform your photo into a professional headshot in seconds
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              } font-semibold`}
            >
              1
            </div>
            <div
              className={`w-20 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}
            ></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              } font-semibold`}
            >
              2
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {isLoading ? (
            <LoadingSpinner message="Generating your professional headshot..." />
          ) : (
            <>
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Step 1: Upload Your Photo
                  </h2>
                  <UploadSection onUploadComplete={handleUploadComplete} />
                  {uploadedImage && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => setStep(2)}
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Continue to Style Selection
                      </button>
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div>
                  <button
                    onClick={() => setStep(1)}
                    className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Upload
                  </button>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Step 2: Choose Your Style
                  </h2>
                  <StyleSelector />
                  {selectedStyle && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={handleGenerate}
                        className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg"
                      >
                        Generate Professional Headshot
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-semibold">Error:</p>
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p>Powered by AI Image Generation Technology</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
