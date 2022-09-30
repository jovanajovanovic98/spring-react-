import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import InternalRulePage from './components/InternalRulePage';
import Navigation from './components/Navigation';
import OrdersPage from './components/OrdersPage';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={(<InternalRulePage />)} />
        <Route path='/orders' element={(<OrdersPage />)} />
      </Routes>
    </div>
  );
}

export default App;
