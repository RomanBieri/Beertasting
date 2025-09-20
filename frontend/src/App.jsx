import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BeerListPage from './pages/BeerListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddBeerPage from './pages/AddBeerPage';
import BeerDetailPage from './pages/BeerDetailPage';
import EditNotePage from './pages/EditNotePage'; 
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<BeerListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-beer" element={<AddBeerPage />} />
            <Route path="/beer/:beerId" element={<BeerDetailPage />} />
            
            {/* NEUE ROUTE FÜR DIE BEARBEITEN-SEITE */}
            <Route path="/edit-note/:noteId" element={<EditNotePage />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;