import rateLimit from 'express-rate-limit';

// Rate limiter for upload endpoint
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 uploads per windowMs
  message: {
    success: false,
    message: 'Too many upload requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for generate endpoint
export const generateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 generation requests per windowMs
  message: {
    success: false,
    message: 'Too many generation requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
