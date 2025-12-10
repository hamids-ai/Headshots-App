import axios from 'axios';

// Use environment variable if available, otherwise construct from current host
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // In development, use the same host but port 5000
  const currentHost = window.location.hostname;
  const protocol = window.location.protocol;

  // If running on localhost, use localhost
  if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }

  // For forwarded ports, replace the port in the current URL
  const port = window.location.port;
  if (port) {
    // Assume backend is on a different forwarded URL, we'll need to adjust
    // For Claude Code, typically both ports are forwarded
    return `${protocol}//${currentHost.replace(port, '5000')}/api`;
  }

  return `${protocol}//${currentHost}:5000/api`;
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const generateHeadshot = async (imageId, style) => {
  const response = await api.post('/generate', {
    imageId,
    style,
  });

  return response.data;
};

export const checkStatus = async (jobId) => {
  const response = await api.get(`/status/${jobId}`);
  return response.data;
};

export default api;
