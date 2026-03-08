import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ── Auth ──────────────────────────────────────
export const authAPI = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),
    signup: (name: string, hospital: string, email: string, password: string) =>
        api.post('/auth/signup', { name, hospital, email, password }),
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

// ── Models ─────────────────────────────────────
export const modelsAPI = {
    list: () => api.get('/models'),
    getById: (id: string) => api.get(`/models/${id}`),
    download: (id: string) => api.get(`/models/${id}/download`, { responseType: 'blob' }),
};

// ── Local Client ───────────────────────────────
export const localAPI = {
    uploadDataset: (formData: FormData) =>
        api.post('/local/upload-dataset', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    trainingStatus: (jobId: string) => api.get(`/local/training-status/${jobId}`),
    downloadReport: (jobId: string) => api.get(`/local/report/${jobId}`, { responseType: 'blob' }),
};

export default api;
