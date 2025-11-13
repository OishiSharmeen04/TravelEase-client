import { auth } from '../firebase/firebase.config';

const BASE_URL = 'http://localhost:5000';


export const apiCall = async (endpoint, options = {}) => {
  try {
    const user = auth.currentUser;
    
    
    let headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (user) {
      const token = await user.getIdToken();
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// GET
export const get = (endpoint) => {
  return apiCall(endpoint);
};

// POST
export const post = (endpoint, data) => {
  return apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// PUT
export const put = (endpoint, data) => {
  return apiCall(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

// DELETE
export const del = (endpoint) => {
  return apiCall(endpoint, {
    method: 'DELETE'
  });
};