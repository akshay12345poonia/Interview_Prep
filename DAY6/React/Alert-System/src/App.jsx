import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlertProvider, AlertContainer } from './components/Alert';
import Index from './pages/Index';

const App = () => (
  <AlertProvider>
    <AlertContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </AlertProvider>
);

export default App;
