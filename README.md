# BeerTasting - Ein digitales Biertagebuch

BeerTasting ist eine Full-Stack-Webanwendung, die als digitales Tagebuch für Bierliebhaber dient. Benutzer können sich registrieren, einloggen und ihre Bier-Verkostungen verwalten, indem sie Bewertungen erstellen, ansehen, bearbeiten und löschen.

Dieses Projekt wurde als Abschlussprojekt im Rahmen der TEKO Weiterbildung mit dem MERN-Stack entwickelt.

---

### **Live-Demo**

Die Anwendung ist live auf Render.com verfügbar:

* **Frontend:** [https://beertasting-frontend.onrender.com/](https://beertasting-frontend.onrender.com/)
* **Backend:** [https://beertasting-backend.onrender.com/](https://beertasting-backend.onrender.com/)

---

## Features

* **Benutzer-Authentifizierung:** Registrierung und Login mit Benutzername und Passwort.
* **CRUD-Funktionalität:**
    * **Create:** Neue Bier-Bewertungen mit Name, Brauerei, Stil, Bewertung und Kommentar hinzufügen.
    * **Read:** Alle eigenen Bewertungen in einer übersichtlichen Liste anzeigen.
    * **Update:** Bestehende Bewertungen direkt in der Liste bearbeiten ("in-place editing").
    * **Delete:** Bewertungen nach einer Sicherheitsabfrage löschen.
* **Dynamische Benutzeroberfläche:** Die Navigation passt sich dynamisch an, je nachdem, ob ein Benutzer eingeloggt ist oder nicht.
* **Modernes Design:** Eine saubere, responsive Benutzeroberfläche für eine angenehme User Experience.

---

## Verwendete Technologien

| Bereich      | Technologie         |
| :----------- | :------------------ |
| **Frontend** | React.js (mit Vite) |
| **Backend** | Node.js, Express.js |
| **Datenbank**| MongoDB (Atlas)     |
| **Deployment**| Render.com          |

---

## Lokale Installation und Setup

Um das Projekt lokal auf deinem Computer auszuführen, befolge diese Schritte.

### Voraussetzungen

* [Node.js](https://nodejs.org/) (Version 18 oder höher)
* Ein kostenloses [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Konto für die Datenbank.

### 1. Projekt klonen

Klone dieses Repository auf deinen lokalen Computer:
```bash
git clone [https://github.com/RomanBieri/Beertasting.git](https://github.com/RomanBieri/Beertasting.git)
cd Beertasting

---

### 2. Backend-Setup
Navigiere in den Backend-Ordner:
Bash
cd api

### Umgebungsvariablen erstellen:
Erstelle eine Datei namens .env im api-Ordner und füge deine MongoDB-Verbindungs-URL hinzu:
MONGO_URI=mongodb+srv://DEIN_BENUTZERNAME:DEIN_PASSWORT@deincluster...

### Abhängigkeiten installieren:
Bash
npm install

### Backend-Server starten:
Bash
npm start

Der Server läuft jetzt auf http://localhost:5000.

---

### 3. Frontend-Setup
Öffne ein neues, separates Terminal.

Navigiere in den Frontend-Ordner:
Bash
cd frontend

### Abhängigkeiten installieren:
Bash
npm install

### Frontend-App starten:
Bash
npm run dev

### Die React-Anwendung ist jetzt unter http://localhost:5173 (oder einem ähnlichen Port) erreichbar.

---

### Das Projekt ist als Monorepo strukturiert, das Backend und Frontend in getrennten Ordnern enthält:

├── api/          # Der Node.js/Express.js Backend-Server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
│
└── frontend/     # Die React.js Frontend-Anwendung
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    └── ...
