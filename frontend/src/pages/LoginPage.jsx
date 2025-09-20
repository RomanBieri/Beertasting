// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service.js';

function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiService.login(formData);
      
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/'); // Zur Hauptseite weiterleiten
    } catch (err) {
      setError(err.response?.data?.message || 'Login fehlgeschlagen.');
    }
  };

  return (
    <div>
      <h2>Einloggen</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" onChange={handleChange} placeholder="Benutzername" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Passwort" required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginPage;