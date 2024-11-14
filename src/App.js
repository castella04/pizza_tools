import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import OperationManagement from './components/operationManagement';
import Footer from './components/footer'
import Header from './components/header'
import './css/App.css';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <title>Pizza Tools</title>
      </Helmet>
      <div class="body">  { /* 擬似body */ }
        <div class="body_inner">
          
          <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path='/opemane' element={<OperationManagement />} />
            </Routes>
          </main>
          
          <Footer />
          </BrowserRouter>

          
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
