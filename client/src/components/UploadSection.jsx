import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useApp } from '../context/AppContext';
import { validateImage, validateImageDimensions, formatFileSize } from '../utils/imageValidation';

const UploadSection = ({ onUploadComplete }) => {
  const { setUploadedImage, setError } = useApp();
  const [preview, setPreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isValidating, setIsValidating] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setValidationErrors([]);
    setError(null);

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    // Basic validation
    const basicValidation = validateImage(file);
    if (!basicValidation.isValid) {
      setValidationErrors(basicValidation.errors);
      return;
    }

    // Dimension validation
    setIsValidating(true);
    const dimensionValidation = await validateImageDimensions(file);
    setIsValidating(false);

    if (!dimensionValidation.isValid) {
      setValidationErrors(dimensionValidation.errors);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = {
        file,
        preview: reader.result,
        name: file.name,
        size: file.size,
        dimensions: dimensionValidation.dimensions,
      };
      setPreview(reader.result);
      setUploadedImage(imageData);
      if (onUploadComplete) {
        onUploadComplete(imageData);
      }
    };
    reader.readAsDataURL(file);
  }, [setUploadedImage, setError, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const clearImage = () => {
    setPreview(null);
    setUploadedImage(null);
    setValidationErrors([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 bg-white'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {isDragActive ? (
              <p className="text-lg text-blue-600 font-semibold">Drop your photo here</p>
            ) : (
              <>
                <p className="text-lg text-gray-700 font-semibold mb-2">
                  Drag & drop your photo here
                </p>
                <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                <p className="text-xs text-gray-400">
                  Supports JPG, PNG, WebP (max 10MB, min 512x512px)
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain rounded-lg"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
              aria-label="Remove image"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {isValidating && (
        <div className="mt-4 text-center text-gray-600">
          <p>Validating image...</p>
        </div>
      )}

      {validationErrors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold mb-2">Validation Errors:</p>
          <ul className="list-disc list-inside text-red-700 text-sm">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
