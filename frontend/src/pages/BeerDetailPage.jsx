import React from 'react';
import { Link, useParams } from 'react-router-dom';

function BeerDetailPage() {
  // useParams würde verwendet, um die ID aus der URL zu lesen, z.B. /beer/123
  const { beerId } = useParams();

  return (
    <div>
      <h2>Bier-Detailansicht (Platzhalter)</h2>
      <p>
        Diese Seite wird in Zukunft die Details für ein spezifisches Bier anzeigen
        (z.B. alle Bewertungen von allen Benutzern für dieses eine Bier).
      </p>
      <p>
        In unserem aktuellen MVP werden alle relevanten Informationen bereits auf der Hauptseite angezeigt.
      </p>
      <p>Die ID des Bieres aus der URL lautet: {beerId}</p>
      <Link to="/">Zurück zur Übersicht</Link>
    </div>
  );
}

export default BeerDetailPage;