import { useApp } from '../context/AppContext';
import DownloadButton from './DownloadButton';

const ComparisonView = ({ onTryAnother }) => {
  const { uploadedImage, generatedHeadshot } = useApp();

  if (!uploadedImage) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Compare Your Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Original Image */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Original Photo
          </h3>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={uploadedImage.preview}
              alt="Original"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>{uploadedImage.name}</p>
            {uploadedImage.dimensions && (
              <p>
                {uploadedImage.dimensions.width} × {uploadedImage.dimensions.height}px
              </p>
            )}
          </div>
        </div>

        {/* Generated Headshot */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            AI-Generated Headshot
          </h3>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {generatedHeadshot ? (
              <img
                src={generatedHeadshot}
                alt="Generated Headshot"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg
                    className="w-16 h-16 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">Your generated headshot will appear here</p>
                </div>
              </div>
            )}
          </div>
          {generatedHeadshot && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p className="font-semibold text-green-600">Generation Complete!</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {generatedHeadshot && (
          <DownloadButton
            imageUrl={generatedHeadshot}
            filename={`headshot-${Date.now()}.png`}
          />
        )}
        <button
          onClick={onTryAnother}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Try Another Style
        </button>
      </div>
    </div>
  );
};

export default ComparisonView;
