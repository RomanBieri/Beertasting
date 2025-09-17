import express from 'express';
import { User } from '../models/user.model.js';
const router = express.Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich.' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Benutzer erfolgreich registriert.' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler bei der Registrierung.', error });
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Ungültige Anmeldedaten.' });
        }
        res.status(200).json({ message: 'Login erfolgreich.', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Login.', error });
    }
});
export default router;