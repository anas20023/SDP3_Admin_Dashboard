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

  // Subscriptions
  getSubscriptions: () => api.get('/subsc').then((res) => res.data),
  createSubscription: (data) => api.post('/subsc', data).then((res) => res.data),
  updateSubscription: (id, data) => {
    //console.log(id,data)
    api.patch(`/subsc/${id}`, data).then((res) => res.data)
  },
  deleteSubscription: (id) => api.delete('/subsc/', { data: { id } }).then((res) => res.data),
  
  // Feedbacks
  getFeedbacks: () => api.get('/feedback').then(res => res.data),
  updateFeedback: (id, data) => api.put(`/feedback/${id}`, data).then(res => res.data),
  deleteFeedback: (id) => api.delete(`/feedback/${id}`).then(res => res.data),
};

export default api;