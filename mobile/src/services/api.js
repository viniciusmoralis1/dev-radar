import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.86.2:2222',
});

export default api;