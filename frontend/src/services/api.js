import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const shortenUrl = (data) => API.post('/shorten', data);
export const getStats = (shortCode) => API.get(`/stats/${shortCode}`);
export const connectWalletAPI = (data) => API.post('/connect-wallet', data);
export const getMyUrls = (wallet) => API.get(`/my-urls/${wallet}`);
export const incrementClick = async (shortCode) => {
  return await axios.patch(`/api/click/${shortCode}`);
};

export default API;
