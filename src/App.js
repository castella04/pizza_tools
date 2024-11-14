import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Index from "./components";
import OperationManagement from "./components/operationManagement";
import Omexport from "./components/omexport";
import Footer from "./components/footer";
import Header from "./components/header";
import "./css/App.css";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <title>Pizza Tools</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div class="body">
        {/* 擬似body */}
        <div class="body_inner">
          <BrowserRouter>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/opemane" element={<OperationManagement />} />
                <Route path="/omexport" element={<Omexport />} />
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
