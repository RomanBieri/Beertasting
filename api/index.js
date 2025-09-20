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
    console.error('Verbindungsfehler:', err.message);
  }
};
connectDB();

app.use('/auth', require('./routes/auth.js'));
app.use('/tasting', require('./routes/tasting.js'));

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});