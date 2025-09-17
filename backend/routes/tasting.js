const express = require('express');
const router = express.Router();
const tastingController = require('../controllers/tastingController.js');

router.post('/notes', tastingController.createTastingNote);
router.get('/notes/user/:userId', tastingController.getNotesByUser);
router.delete('/notes/:noteId', tastingController.deleteNote);

// NEUE ROUTE FÜR DAS UPDATE
router.put('/notes/:noteId', tastingController.updateNote);

module.exports = router;