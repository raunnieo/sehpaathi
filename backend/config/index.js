const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

// Fallback config in case the API is unavailable
const defaultConfig = {
  branches: ['CSE', 'ECE', 'EEE', 'MECH'],
  semesters: ['1', '2', '3', '4', '5', '6', '7', '8'],
  subjects: [],
  materialTypes: ['Notes', 'Assignments', 'Question Papers', 'Resources']
};

const getAcademicConfig = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/academic-config');
    return {
      success: true,
      data: response.data.data || response.data // handle both data structures
    };
  } catch (error) {
    console.error('Failed to fetch academic config:', error);
    // Return in consistent format
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        success: false,
        data: defaultConfig,
        error: error.response.data.message || 'Server error'
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        success: false,
        data: defaultConfig,
        error: 'No response from server'
      };
    } else {
      // Something happened in setting up the request
      return {
        success: false,
        data: defaultConfig,
        error: error.message
      };
    }
  }
};

module.exports = { getAcademicConfig };