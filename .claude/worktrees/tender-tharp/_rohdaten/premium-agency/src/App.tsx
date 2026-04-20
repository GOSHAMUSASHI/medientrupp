import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Ecommerce } from './pages/Ecommerce';
import { Portfolio } from './pages/Portfolio';
import { About } from './pages/About';
import { Kontakt } from './pages/Kontakt';
import { GlobalChatbot } from './components/ui/GlobalChatbot';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { CookieBanner } from './components/ui/CookieBanner';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { CtaBanner } from './components/sections/CtaBanner';
import { CursorEffect } from './components/ui/CursorEffect';
import { PageTransitionWrapper } from './components/ui/PageTransitionWrapper';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ cursor: 'none' }}>
        <CursorEffect />
        <ScrollProgressBar />
        <Navbar />

        <PageTransitionWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/kontakt" element={<Kontakt />} />
          </Routes>
        </PageTransitionWrapper>

        <CtaBanner />
        <GlobalChatbot />
        <CookieBanner />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
