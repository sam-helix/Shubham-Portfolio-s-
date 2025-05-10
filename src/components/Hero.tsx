import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
  isDarkMode: boolean;
}

const Hero = ({ setActiveSection, isDarkMode }: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add text animation on load
    const animateText = () => {
      if (titleRef.current) titleRef.current.classList.add('animate-in');
      
      setTimeout(() => {
        if (subtitleRef.current) subtitleRef.current.classList.add('animate-in');
      }, 400);
      
      setTimeout(() => {
        if (buttonRef.current) buttonRef.current.classList.add('animate-in');
      }, 800);
    };

    window.addEventListener('scroll', handleScroll);
    animateText();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    setActiveSection('about');
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ 
        transform: `translateY(${scrollY * 0.3}px)`,
      }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 z-10 text-center">
        <h1 
          ref={titleRef}
          className={`text-5xl md:text-7xl font-bold mb-6 transform opacity-0 transition-all duration-1000 ease-out ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
          style={{ 
            transitionDelay: '0.2s',
            textShadow: isDarkMode ? '0 0 15px rgba(255, 94, 0, 0.7)' : 'none' 
          }}
        >
          <span className="block">Creative</span> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
            Portfolio
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className={`max-w-2xl mx-auto text-xl md:text-2xl mb-12 transform opacity-0 transition-all duration-1000 ease-out ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          Crafting immersive digital experiences with stunning animations and intuitive interactions
        </p>
        
        <button
          ref={buttonRef}
          onClick={scrollToNext}
          className="hover-target group relative inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-medium overflow-hidden transform opacity-0 hover:scale-105 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(255,94,0,0.5)]"
          style={{ transitionDelay: '0.6s' }}
        >
          <span className="relative z-10">Explore My Work</span>
          <span className="relative z-10">
            <ChevronDown size={20} />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <ChevronDown size={32} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
        </div>
      </div>
    </section>
  );
};

export default Hero;