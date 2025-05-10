import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Add global styles for animations
import './animations.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Detect which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Apply theme to body
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  useEffect(() => {
    // Set initial theme
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
    // Set page title
    document.title = "Creative Portfolio | Shubham Kumar";
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Custom cursor */}
      <Cursor color={isDarkMode ? '#ff5e00' : '#ff5e00'} />
      
      {/* Animated particle background */}
      <ParticleBackground 
        count={80}
        colorPalette={isDarkMode 
          ? ['#ff5e00', '#fbae3c', '#04e762', '#89fc00', '#15616d'] 
          : ['#ff5e00', '#dd7230', '#f7b538', '#a88c0d', '#594302']
        }
      />
      
      {/* Navigation */}
      <Navigation 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      {/* Main content */}
      <main>
        <Hero setActiveSection={setActiveSection} isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        <Skills isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </main>
      
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;