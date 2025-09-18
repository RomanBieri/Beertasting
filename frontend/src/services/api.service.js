import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://beertasting-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiService = {
  register(userData) {
    return apiClient.post("/auth/register", userData);
  },
  login(userData) {
    return apiClient.post("/auth/login", userData);
  },
  getNotesForUser(userId) {
    return apiClient.get(`/tasting/notes/user/${userId}`);
  },
  createTastingNote(noteData) {
    return apiClient.post("/tasting/notes", noteData);
  },
  deleteNote(noteId) {
    return apiClient.delete(`/tasting/notes/${noteId}`);
  },
  // Diese Funktion ist für die EditPage, die wir nicht gebaut haben,
  // aber wir lassen sie für Vollständigkeit drin.
  getNoteById(noteId) {
    return apiClient.get(`/tasting/notes/${noteId}`);
  },
  updateNote(noteId, noteData) {
    return apiClient.put(`/tasting/notes/${noteId}`, noteData);
  },
};

export default apiService;
