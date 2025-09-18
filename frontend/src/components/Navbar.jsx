import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        BeerTasting
      </Link>

      <div className="navbar-auth-section">
        {user ? (
          // Wenn ein Benutzer eingeloggt ist:
          <>
            <Link to="/">Meine Biere</Link>
            <Link to="/add-beer">Bier Hinzufügen</Link>
            <button onClick={handleLogout}>Logout ({user.username})</button>
          </>
        ) : (
          // Wenn kein Benutzer eingeloggt ist:
          <>
            <Link to="/register">Registrieren</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
