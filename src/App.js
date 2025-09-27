import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import About from './components/About';
import Plans from './components/Plans';
import MenusPage from './components/MenusPage';
import RecipesPage from './components/RecipesPage';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <About />;
      case 'menus':
        return <MenusPage />;
      case 'recipes':
        return <RecipesPage />;
      case 'plans':
        return <Plans />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
