import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import About from './components/About';
import Plans from './components/Plans';
import Subscription from './components/Subscription';
import Community from './components/Community';
import MenusPage from './components/MenusPage';
import RecipesPage from './components/RecipesPage';
import Partners from './components/Partners';
import CartPage from './components/CartPage';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<About />} />
          <Route path="/thuc-don" element={<MenusPage />} />
          <Route path="/goi-dang-ky" element={<Subscription />} />
          <Route path="/cong-dong" element={<Community />} />
          <Route path="/doi-tac" element={<Partners />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/gio-hang" element={<CartPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
