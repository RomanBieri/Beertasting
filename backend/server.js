const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Erfolgreich mit MongoDB verbunden');
  } catch (err) {
    console.error('Verbindungsfehler zur Datenbank:', err.message);
    process.exit(1);
  }
};
connectDB();

// KORREKTUR: Wir fügen das '/api' Präfix hier wieder hinzu.
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/tasting', require('./routes/tasting.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));

module.exports = app;