import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const manageApi = {
  // Analytics
  getAnalytics: () => api.get('/manage/analytics').then(res => res.data),

  // Users
  getUsers: () => api.get('/manage/users').then(res => res.data),
  updateUser: (id, data) => api.put(`/manage/users/${id}`, data).then(res => res.data),
  deleteUser: (id) => api.delete(`/manage/users/${id}`).then(res => res.data),

  // Suggestions
  getSuggestions: (params) => api.get('/manage/suggestions', { params }).then(res => res.data),
  getSuggestionById: (id) => api.get(`/manage/suggestions/${id}`).then(res => res.data),
  updateSuggestion: (id, data) => api.put(`/manage/suggestions/${id}`, data).then(res => res.data),
  deleteSuggestion: (id) => api.delete(`/manage/suggestions/${id}`).then(res => res.data),
};

export default api;
