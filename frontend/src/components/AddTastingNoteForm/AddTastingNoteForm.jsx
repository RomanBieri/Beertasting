// src/components/AddTastingNoteForm/AddTastingNoteForm.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { addTastingNote } from '../../services/api.service';

function AddTastingNoteForm({ beerId, onNoteAdded }) {
    const [rating, setRating] = useState(5);
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('Du musst eingeloggt sein, um eine Notiz zu erstellen.');
            return;
        }

        try {
            const newNoteData = { rating, notes, beerId, userId };
            const response = await addTastingNote(newNoteData);
            onNoteAdded(response.data);
            
            setRating(5);
            setNotes('');
        } catch (err) {
            setError('Fehler beim Speichern der Notiz.');
            console.error("Fehlerdetails:", err); // <-- KORREKTUR
        }
    };

    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>Neue Notiz hinzufügen</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Bewertung (1-5)</Form.Label>
                        <Form.Control 
                            type="number" 
                            min="1" 
                            max="5" 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Notizen</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Speichern</Button>
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
        </Card>
    );
}

export default AddTastingNoteForm;