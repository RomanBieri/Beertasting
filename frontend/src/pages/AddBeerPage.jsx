import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service.js";

function AddBeerPage() {
  const [formData, setFormData] = useState({
    name: "",
    brewery: "",
    style: "",
    rating: 3,
    comment: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("Du musst eingeloggt sein, um ein Bier hinzuzufügen.");
      return;
    }

    try {
      // KORREKTUR HIER: Wir verwenden 'user.id' anstatt 'user._id'
      const noteData = { ...formData, userId: user.id };

      await apiService.createTastingNote(noteData);

      setSuccess("Bier erfolgreich hinzugefügt! Du wirst weitergeleitet...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Fehler beim Hinzufügen des Bieres:", err);
      setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
    }
  };

  if (!user) {
    return <div>Bitte logge dich ein, um ein Bier zu bewerten.</div>;
  }

  return (
    <div>
      <h2>Neues Bier bewerten</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name des Bieres"
          required
        />
        <input
          name="brewery"
          value={formData.brewery}
          onChange={handleChange}
          placeholder="Brauerei"
          required
        />
        <input
          name="style"
          value={formData.style}
          onChange={handleChange}
          placeholder="Bierstil"
          required
        />
        <div>
          <label>Bewertung: {formData.rating} / 5</label>
          <input
            name="rating"
            type="range"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Dein Kommentar..."
        />
        <button type="submit">Bewertung speichern</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default AddBeerPage;
