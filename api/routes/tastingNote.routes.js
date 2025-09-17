// backend/routes/tastingNote.routes.js

import express from 'express';
import { TastingNote } from '../models/tastingNote.model.js';

const router = express.Router();

// CREATE: Eine neue Verkostungsnotiz erstellen (POST /api/tasting-notes)
router.post('/', async (req, res) => {
    try {
        const { rating, notes, beerId, userId } = req.body;
        if (!rating || !beerId || !userId) {
            return res.status(400).json({ message: 'Rating, Beer-ID und User-ID sind erforderlich.' });
        }
        const newNote = new TastingNote({ rating, notes, beerId, userId });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen der Notiz.', error });
    }
});

// READ ALL FOR A BEER: Alle Notizen für ein Bier abrufen (GET /api/tasting-notes/beer/:beerId)
router.get('/beer/:beerId', async (req, res) => {
    try {
        const notes = await TastingNote.find({ beerId: req.params.beerId }).populate('userId', 'username');
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Notizen.', error });
    }
});

// UPDATE: Eine Notiz aktualisieren (PUT /api/tasting-notes/:id)
router.put('/:id', async (req, res) => {
    try {
        const updatedNote = await TastingNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Notiz nicht gefunden.' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Aktualisieren der Notiz.', error });
    }
});

// DELETE: Eine Notiz löschen (DELETE /api/tasting-notes/:id)
router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await TastingNote.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Notiz nicht gefunden.' });
        }
        res.status(200).json({ message: 'Notiz erfolgreich gelöscht.' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen der Notiz.', error });
    }
});

export default router;