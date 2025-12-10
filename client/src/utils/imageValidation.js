export const validateImage = (file) => {
  const errors = [];

  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    errors.push('File must be JPG, PNG, or WebP format');
  }

  // Check file size (10MB max)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const minDimension = 512;

      if (img.width < minDimension || img.height < minDimension) {
        resolve({
          isValid: false,
          errors: [`Image dimensions must be at least ${minDimension}x${minDimension}px`],
        });
      } else {
        resolve({
          isValid: true,
          errors: [],
          dimensions: { width: img.width, height: img.height },
        });
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        isValid: false,
        errors: ['Failed to load image'],
      });
    };

    img.src = objectUrl;
  });
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
