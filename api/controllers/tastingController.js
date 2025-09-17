const Beer = require('../models/beer.model.js');
const TastingNote = require('../models/tastingNote.model.js');

exports.createTastingNote = async (req, res) => {
  try {
    const { name, brewery, style, rating, comment, userId } = req.body;
    let beer = await Beer.findOne({ name, brewery });
    if (!beer) {
      beer = new Beer({ name, brewery, style });
      await beer.save();
    }
    const newNote = new TastingNote({
      rating,
      comment,
      beer: beer._id,
      user: userId,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('SERVER-ABSTURZ BEIM ERSTELLEN EINER NOTIZ:', error);
    res.status(500).json({ message: 'Serverfehler beim Erstellen der Notiz.' });
  }
};

exports.getNotesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await TastingNote.find({ user: userId }).populate('beer');
    res.status(200).json(notes);
  } catch (error) {
    console.error('SERVER-ABSTURZ BEIM LADEN DER NOTIZEN:', error);
    res.status(500).json({ message: 'Serverfehler beim Laden der Notizen.' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const deletedNote = await TastingNote.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Bewertung nicht gefunden.' });
    }
    res.status(200).json({ message: 'Bewertung erfolgreich gelöscht.' });
  } catch (error) {
    console.error('SERVER-ABSTURZ BEIM LÖSCHEN EINER NOTIZ:', error);
    res.status(500).json({ message: 'Serverfehler beim Löschen der Notiz.' });
  }
};

// NEUE FUNKTION ZUM AKTUALISIEREN
exports.updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { rating, comment } = req.body; // Nur Rating und Kommentar können geändert werden

    const updatedNote = await TastingNote.findByIdAndUpdate(
      noteId,
      { rating, comment },
      { new: true, runValidators: true } // {new: true} gibt das aktualisierte Dokument zurück
    ).populate('beer'); // .populate() hinzugefügt, um die vollen Bier-Daten zurückzugeben

    if (!updatedNote) {
      return res.status(404).json({ message: 'Bewertung nicht gefunden.' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('SERVER-ABSTURZ BEIM AKTUALISIEREN:', error);
    res.status(500).json({ message: 'Serverfehler beim Aktualisieren.' });
  }
};