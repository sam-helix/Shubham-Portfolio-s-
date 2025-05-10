import { Heart } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer = ({ isDarkMode }: FooterProps) => {
  return (
    <footer className={`py-8 ${
      isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
              Portfolio
            </p>
          </div>
          
          <p className="flex items-center">
            <span>Made with</span>
            <Heart size={16} className="mx-1 text-red-500 animate-pulse" />
            <span>using React & TailwindCSS</span>
          </p>
          
          <p className="mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;