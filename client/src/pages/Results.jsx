import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ComparisonView from '../components/ComparisonView';

const Results = () => {
  const navigate = useNavigate();
  const { resetApp } = useApp();

  const handleTryAnother = () => {
    navigate('/');
  };

  const handleStartOver = () => {
    resetApp();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Professional Headshot
          </h1>
          <p className="text-lg text-gray-600">
            Compare your original photo with the AI-generated result
          </p>
        </div>

        {/* Comparison View */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <ComparisonView onTryAnother={handleTryAnother} />
        </div>

        {/* Additional Actions */}
        <div className="text-center">
          <button
            onClick={handleStartOver}
            className="text-gray-600 hover:text-gray-800 underline"
          >
            Start Over with New Photo
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm mt-8">
          <p>Powered by AI Image Generation Technology</p>
        </div>
      </div>
    </div>
  );
};

export default Results;
