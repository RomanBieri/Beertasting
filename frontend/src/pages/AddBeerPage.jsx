import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service.js';

function AddBeerPage() {
  const [formData, setFormData] = useState({ name: '', brewery: '', style: '', rating: 3, comment: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Bitte einloggen, um eine Bewertung abzugeben.');
      return;
    }
    try {
      await apiService.createTastingNote({ ...formData, userId: user.id });
      setSuccess('Bewertung erfolgreich gespeichert! Du wirst weitergeleitet...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      // KORRIGIERTER CATCH-BLOCK
      console.error("Fehler beim Hinzufügen:", err);
      setError(err.response?.data?.message || 'Ein Fehler ist aufgetreten.');
    }
  };

  if (!user) {
    return <div style={{ textAlign: 'center' }}><h2>Bitte einloggen</h2><p>Du musst eingeloggt sein, um ein Bier zu bewerten.</p></div>;
  }

  return (
    <div>
      <h2>Bewerte ein neues Bier</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name des Bieres</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="z.B. Guinness Draught" required />
        </div>
        <div className="form-group">
          <label htmlFor="brewery">Brauerei</label>
          <input id="brewery" name="brewery" value={formData.brewery} onChange={handleChange} placeholder="z.B. St. James's Gate Brewery" required />
        </div>
        <div className="form-group">
          <label htmlFor="style">Bierstil</label>
          <input id="style" name="style" value={formData.style} onChange={handleChange} placeholder="z.B. Stout" required />
        </div>
        <div className="form-group">
          <label>Bewertung: {formData.rating} / 5 Sterne</label>
          <input name="rating" type="range" min="1" max="5" value={formData.rating} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Dein Kommentar (optional)</label>
          <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} placeholder="Beschreibe deinen Eindruck..." />
        </div>
        <button type="submit">Bewertung speichern</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>{success}</p>}
    </div>
  );
}
export default AddBeerPage;