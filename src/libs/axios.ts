import axios from 'axios';

const url = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: url,
});
// return response body only
axiosInstance.interceptors.response.use((value) => value.data);

export default axiosInstance;
