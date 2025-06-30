/**
 * This folder contains helper functions and utilities.
 * Example: loading spinners, formatters, Axios instances, etc.
 */

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;