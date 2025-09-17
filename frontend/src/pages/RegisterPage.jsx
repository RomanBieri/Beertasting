import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service.js";

function RegisterPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await apiService.register(formData);
      setSuccess(
        "Registrierung erfolgreich! Du wirst zum Login weitergeleitet..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registrierung fehlgeschlagen.");
    }
  };

  return (
    <div>
      <h2>Registrieren</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          onChange={handleChange}
          placeholder="Benutzername"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Passwort"
          required
        />
        <button type="submit">Konto erstellen</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default RegisterPage;
