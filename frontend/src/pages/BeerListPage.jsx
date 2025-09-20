import React, { useState, useEffect } from 'react';
import apiService from '../services/api.service.js';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios'; 

function BeerListPage() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadPageData = async () => {
      const userString = localStorage.getItem('user');
      if (!userString) {
        setIsLoading(false);
        return;
      }
      try {
        const userData = JSON.parse(userString);
        setUser(userData);
        const response = await apiService.getNotesForUser(userData.id);
        setNotes(response.data);
      } catch (err) {
       
        console.error("Fehlerdetails beim Laden der Liste:", err);
        if (err instanceof AxiosError && err.response) {
          setError(err.response.data.message || 'Fehler beim Laden der Biere.');
        } else {
          setError('Ein unerwarteter Fehler ist aufgetreten.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadPageData();
  }, []);

  const handleDelete = async (noteId) => {
    if (window.confirm('Bist du sicher, dass du diese Bewertung löschen möchtest?')) {
      try {
        await apiService.deleteNote(noteId);
        setNotes(notes.filter((note) => note._id !== noteId));
      } catch (err) {
       
        console.error("Fehler beim Löschen:", err);
        if (err instanceof AxiosError && err.response) {
          setError(err.response.data.message || "Die Bewertung konnte nicht gelöscht werden.");
        } else {
          setError('Ein unerwarteter Fehler ist aufgetreten.');
        }
      }
    }
  };

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Lade Biere...</p>;
  }
  
  if (!user) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Willkommen bei BeerTasting!</h2>
        <p>Bitte <Link to="/login">logge dich ein</Link> oder <Link to="/register">registriere dich</Link>, um deine Bier-Bewertungen zu sehen und zu verwalten.</p>
      </div>
    );
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Meine bewerteten Biere</h2>
      {notes.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Du hast noch keine Biere bewertet. <Link to="/add-beer">Füge jetzt dein erstes hinzu!</Link></p>
      ) : (
        <ul className="beer-list">
          {notes.map((note) => (
            <li key={note._id} className="beer-card">
              <strong>{note.beer.name}</strong> von {note.beer.brewery}
              <p>Stil: {note.beer.style}</p>
              <p>Deine Bewertung: {note.rating}/5 Sterne</p>
              {note.comment && <p><em>"{note.comment}"</em></p>}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Link to={`/edit-note/${note._id}`} state={{ note: note }}>
                  <button>Bearbeiten</button>
                </Link>
                <button 
                  onClick={() => handleDelete(note._id)} 
                  style={{ backgroundColor: '#e74c3c' }}
                >
                  Löschen
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BeerListPage;