import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import DefaultLayout from './components/containers/DefaultLayout';
import HomePage from './components/Home';

function App() {
  return (
    //<React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    //</React.StrictMode>
  );
}

export default App;
