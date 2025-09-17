import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  register(userData) {
    return apiClient.post('/auth/register', userData);
  },
  login(userData) {
    return apiClient.post('/auth/login', userData);
  },
  getNotesForUser(userId) {
    return apiClient.get(`/tasting/notes/user/${userId}`);
  },
  createTastingNote(noteData) {
    return apiClient.post('/tasting/notes', noteData);
  },
  deleteNote(noteId) {
    return apiClient.delete(`/tasting/notes/${noteId}`);
  },
  // NEUE FUNKTION ZUM AKTUALISIEREN
  updateNote(noteId, noteData) {
    return apiClient.put(`/tasting/notes/${noteId}`, noteData);
  },
};

export default apiService;