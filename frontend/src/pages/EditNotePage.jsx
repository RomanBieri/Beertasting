import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import apiService from '../services/api.service.js';

function EditNotePage() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const [beerName, setBeerName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state && location.state.note) {
      const { note } = location.state;
      setBeerName(note.beer.name);
      setRating(note.rating);
      setComment(note.comment || '');
    } else {
      setError('Notiz-Daten konnten nicht geladen werden. Bitte gehe zurück zur Übersicht.');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateNote(noteId, { rating, comment });
      navigate('/'); // Nach Erfolg zurück zur Liste
    } catch (err) {
      // KORRIGIERTER CATCH-BLOCK:
      console.error('Fehler beim Speichern:', err); // Loggt den vollen Fehler
      // Zeigt die spezifische Fehlermeldung vom Server an, falls vorhanden
      setError(err.response?.data?.message || 'Fehler beim Speichern der Änderungen.');
    }
  };

  if (error && !beerName) { // Zeigt Ladefehler an, wenn keine Bier-Infos da sind
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Bewertung bearbeiten für: {beerName}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bewertung: {rating} / 5</label>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
            required 
          />
        </div>
        <textarea 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Dein Kommentar..." 
        />
        <button type="submit">Änderungen speichern</button>
      </form>
      {/* Zeigt Speicherfehler unter dem Formular an */}
      {error && beerName && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}

export default EditNotePage;