import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import apiService from "../services/api.service.js";
import { AxiosError } from "axios"; // WICHTIGER IMPORT

function EditNotePage() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [beerName, setBeerName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Diese Methode zum Laden der Daten ist nicht ideal, da sie bei einem Refresh der Seite fehlschlägt.
    // Für den MVP behalten wir sie bei, aber in einer echten App müsste hier ein API-Call stehen.
    if (location.state && location.state.note) {
      const { note } = location.state;
      setBeerName(note.beer.name);
      setRating(note.rating);
      setComment(note.comment || "");
      setIsLoading(false);
    } else {
      setError(
        "Notiz-Daten konnten nicht geladen werden. Bitte gehe zurück zur Übersicht."
      );
      setIsLoading(false);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateNote(noteId, { rating, comment });
      navigate("/"); // Nach Erfolg zurück zur Liste
    } catch (err) {
      // KORRIGIERTER CATCH-BLOCK
      console.error("Fehler beim Speichern:", err);
      if (err instanceof AxiosError && err.response) {
        setError(
          err.response.data.message || "Fehler beim Speichern der Änderungen."
        );
      } else {
        setError("Ein unerwarteter Fehler ist aufgetreten.");
      }
    }
  };

  if (isLoading) {
    return <p>Lade Bewertung...</p>;
  }

  if (error && !beerName) {
    return <p style={{ color: "red" }}>{error}</p>;
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
      {error && beerName && (
        <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
      )}
    </div>
  );
}

export default EditNotePage;
