import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(request => {
  console.log('Starting Request', request);
  request.headers = { 'Content-Type': 'application/json' };
  return request;
});

api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

export default api;
