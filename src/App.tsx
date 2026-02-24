/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Gamepad2, Code, LayoutDashboard, Menu, X, BookOpen, Monitor, Languages } from "lucide-react";
import { useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { HelmetProvider } from 'react-helmet-async';

// Pages
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import BlogPage from "./pages/BlogPage";

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [crtMode, setCrtMode] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Router>
      <div className={`min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-violet-500/30 ${crtMode ? 'crt-effect' : ''}`}>
        {/* CRT Overlay */}
        {crtMode && (
          <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
            <div className="absolute inset-0 animate-flicker bg-white/5 pointer-events-none" />
          </div>
        )}

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:text-violet-400 transition-colors group">
              <div className="relative">
                <Gamepad2 className="w-6 h-6 text-violet-500 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-violet-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
              <span className="relative z-10">SashaGame</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
              <Link to="/" className="hover:text-white transition-colors hover:scale-105 transform duration-200">{t.nav.home}</Link>
              <Link to="/#games" className="hover:text-white transition-colors hover:scale-105 transform duration-200">{t.nav.games}</Link>
              <Link to="/blog" className="hover:text-white transition-colors hover:scale-105 transform duration-200">{t.nav.blog}</Link>
              
              <div className="h-4 w-px bg-white/10 mx-2" />
              
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
                title="Switch Language"
              >
                <Languages className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>

              <button 
                onClick={() => setCrtMode(!crtMode)}
                className={`p-2 rounded-full transition-all duration-300 ${crtMode ? 'text-green-400 bg-green-400/10 shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'text-gray-500 hover:text-white'}`}
                title={crtMode ? t.nav.crtOff : t.nav.crtOn}
              >
                <Monitor className="w-4 h-4" />
              </button>

              <Link to="/admin" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-violet-500/30">
                <LayoutDashboard className="w-4 h-4" />
                <span>{t.nav.admin}</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-lg font-medium text-gray-300">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>{t.nav.home}</Link>
              <Link to="/#games" onClick={() => setIsMenuOpen(false)}>{t.nav.games}</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)}>{t.nav.blog}</Link>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-violet-400">{t.nav.admin}</Link>
              
              <div className="h-px w-full bg-white/10 my-2" />
              
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-left"
              >
                <Languages className="w-5 h-5" />
                Switch to {language === 'ru' ? 'English' : 'Russian'}
              </button>

              <button 
                onClick={() => {
                  setCrtMode(!crtMode);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-left"
              >
                <Monitor className="w-5 h-5" />
                {crtMode ? t.nav.crtOff : t.nav.crtOn}
              </button>
            </div>
          </motion.div>
        )}

        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <footer className="relative border-t border-white/10 py-24 mt-24 overflow-hidden">
          {/* Creative Footer Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a0b2e] to-[#0a0a0a] z-0" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
            
            {/* Creative Logo & Poetic Line Layout */}
            <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto mb-16 h-64">

              {/* Left Side: Building Worlds Animation (Image Reveal) */}
              <div className="absolute left-0 md:left-10 flex flex-col items-center justify-center h-48 w-48">
                <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.2)] border border-white/10">
                  {/* Image revealing from bottom to top to simulate building */}
                  <motion.div
                    animate={{
                      clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0% 0 0 0)", "inset(100% 0 0 0)"],
                      scale: [1.1, 1, 1, 1.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, times: [0, 0.3, 0.8, 1], ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src="/images/building.jpg"
                      alt="Building World"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {/* Scanning light line effect */}
                  <motion.div
                    animate={{ top: ["100%", "0%", "0%", "100%"], opacity: [1, 0, 0, 1] }}
                    transition={{ duration: 8, repeat: Infinity, times: [0, 0.3, 0.8, 1], ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-1 bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,1)] z-10"
                  />
                </div>
                <div className="mt-4 text-xs font-mono text-violet-400/50 uppercase tracking-widest">Building Worlds</div>
              </div>

              {/* Center: Logo and Spinning Curved Text */}
              <div className="relative z-20 flex items-center justify-center w-80 h-80">
                {/* Spinning Curved Text SVG */}
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]">
                  <defs>
                    <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                  </defs>
                  <text className="text-[11px] font-serif italic tracking-[0.2em] uppercase fill-gray-400 opacity-80">
                    <textPath href="#circlePath" startOffset="0%">
                      {t.hero.poeticLine}
                    </textPath>
                  </text>
                </svg>

                {/* Logo */}
                <Link to="/" className="relative flex flex-col items-center gap-2 font-bold text-3xl tracking-tight group bg-[#0a0a0a]/80 p-8 rounded-full backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.2)] hover:scale-105 transition-transform">
                  <Gamepad2 className="w-12 h-12 text-violet-500 group-hover:animate-pulse" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-2xl">SashaGame</span>
                </Link>
              </div>

              {/* Right Side: Real Angel with Opening Wings (Image Reveal) */}
              <div className="absolute right-0 md:right-10 flex flex-col items-center justify-center h-48 w-48">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* Angel Image with animated clip-path to simulate wings spreading */}
                  <motion.div
                    animate={{
                      clipPath: [
                        "ellipse(20% 100% at 50% 50%)",
                        "ellipse(100% 100% at 50% 50%)",
                        "ellipse(100% 100% at 50% 50%)",
                        "ellipse(20% 100% at 50% 50%)"
                      ],
                      scale: [0.9, 1.05, 1.05, 0.9],
                      filter: ["brightness(0.5)", "brightness(1.2)", "brightness(1.2)", "brightness(0.5)"]
                    }}
                    transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-white/10 z-10"
                  >
                    <img
                      src="/images/angel.jpg"
                      alt="Real Angel"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Glowing aura behind the angel */}
                  <motion.div
                    animate={{ opacity: [0, 0.6, 0.6, 0], scale: [0.8, 1.2, 1.2, 0.8] }}
                    transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
                    className="absolute inset-0 bg-fuchsia-500/30 blur-2xl rounded-full -z-10"
                  />
                </div>
                <div className="mt-4 text-xs font-mono text-fuchsia-400/50 uppercase tracking-widest">Giving Wings</div>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8 mt-8" />

            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
              <div className="text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} SashaGame. Shop. {t.footer.rights}</p>
                <p className="mt-2 flex items-center justify-center md:justify-start gap-2">
                  {t.footer.madeWith} <span className="text-violet-500 animate-pulse">❤</span>
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://t.me/cawa079" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#0088cc] hover:border-[#0088cc]/50 hover:bg-[#0088cc]/10 transition-all hover:scale-110"
                  title="Telegram"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.411-.168.56-.505 1.247-1.111 1.362-.656.125-1.431-.252-2.022-.614-1.226-.75-1.92-1.214-3.102-1.984-1.353-.882-.476-1.367.15-2.016.164-.17 3.016-2.766 3.072-3.001.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.254-.243-1.868-.44-.752-.243-1.349-.374-1.297-.789.027-.216.325-.437.893-.666 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.12.098.152.228.166.331.016.117.033.359.014.527z" />
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCwTRciuTuKvBucdsaavjdsA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#FF0000] hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 transition-all hover:scale-110"
                  title="YouTube @cawa079"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </HelmetProvider>
  );
}

