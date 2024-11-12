import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import OperationManagement from './components/operationManagement';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/pizza_tools'>
       <Routes>
        <Route path='/opemane' element={<OperationManagement />}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
