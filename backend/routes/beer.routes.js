// backend/routes/beer.routes.js

import express from 'express';
import { Beer } from '../models/beer.model.js';

const router = express.Router();

// CREATE: Ein neues Bier anlegen (POST /api/beers)
router.post('/', async (req, res) => {
  try {
    const { name, brewery, style } = req.body;
    if (!name || !brewery) {
      return res.status(400).json({ message: 'Name und Brauerei sind erforderlich.' });
    }
    const newBeer = new Beer({ name, brewery, style });
    const savedBeer = await newBeer.save();
    res.status(201).json(savedBeer);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Bieres.', error });
  }
});

// READ ALL: Alle Biere abrufen (GET /api/beers)
router.get('/', async (req, res) => {
  try {
    const beers = await Beer.find();
    res.status(200).json(beers);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Biere.', error });
  }
});

// READ ONE: Ein spezifisches Bier abrufen (GET /api/beers/:id)
router.get('/:id', async (req, res) => {
  try {
    const beer = await Beer.findById(req.params.id);
    if (!beer) {
      return res.status(404).json({ message: 'Bier nicht gefunden.' });
    }
    res.status(200).json(beer);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen des Bieres.', error });
  }
});

export default router;