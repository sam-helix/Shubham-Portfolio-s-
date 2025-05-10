import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Code, Mail, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navigation = ({ activeSection, setActiveSection, isDarkMode, toggleTheme }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'about', label: 'About', icon: <User size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={20} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? `${isDarkMode ? 'bg-gray-900/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} shadow-lg` 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
              Portfolio
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`hover-target group relative flex items-center text-lg font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-orange-500'
                      : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                  <span 
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                      activeSection === item.id ? 'w-full' : 'group-hover:w-full'
                    }`} 
                  />
                </button>
              ))}
              
              <button 
                onClick={toggleTheme}
                className="hover-target ml-4 p-2 rounded-full transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </button>
            </div>
            
            <button 
              className="md:hidden hover-target p-2 rounded-lg"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-lg`}></div>
        
        <div className="relative h-full flex flex-col">
          <div className="p-6 flex justify-end">
            <button 
              onClick={() => setIsOpen(false)}
              className="hover-target p-2 rounded-lg"
              aria-label="Close menu"
            >
              <X size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center space-y-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`hover-target group flex items-center text-2xl font-bold transition-transform duration-300 hover:scale-110 ${
                  activeSection === item.id
                    ? 'text-orange-500'
                    : isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="hover-target mt-8 p-3 rounded-full transition-colors duration-300 border-2 border-orange-500"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun size={24} className="text-yellow-400" />
              ) : (
                <Moon size={24} className="text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;