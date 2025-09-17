import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// DIESE ZEILE IST ENTSCHEIDEND.
// Sie lädt alle unsere Styles aus der index.css Datei.
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
