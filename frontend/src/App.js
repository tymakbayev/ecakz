import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Hero, Products, Services, Clients, Testimonials, About, Contact, Footer, ChatBot, ConsultationModal } from './components';
import './App.css';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      <Hero />
      <Products />
      <Services />
      <Clients />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
      <ChatBot />
      <ConsultationModal />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;