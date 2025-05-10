import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Loader, Twitter, Linkedin, Github, Dribbble } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

const Contact = ({ isDarkMode }: ContactProps) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset submission state after showing success message
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          formRef.current?.classList.add('animate-in');
          setTimeout(() => {
            infoRef.current?.classList.add('animate-in');
          }, 400);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`relative min-h-screen py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">Me</span>
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div 
            ref={formRef}
            className={`lg:w-2/3 opacity-0 translate-y-20 transition-all duration-1000 ease-out ${
              isDarkMode ? 'bg-gray-700' : 'bg-white'
            }`}
          >
            <div className="rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Send a Message
                </h3>
                
                {submitted ? (
                  <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                    <p className="font-medium">Thank you for your message!</p>
                    <p>I'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label 
                          htmlFor="name" 
                          className={`block mb-2 text-sm font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 ${
                            isDarkMode 
                              ? 'bg-gray-800 text-white border-gray-600 focus:border-orange-500'
                              : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-orange-500'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="email" 
                          className={`block mb-2 text-sm font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 ${
                            isDarkMode 
                              ? 'bg-gray-800 text-white border-gray-600 focus:border-orange-500'
                              : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-orange-500'
                          }`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="subject" 
                        className={`block mb-2 text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 ${
                          isDarkMode 
                            ? 'bg-gray-800 text-white border-gray-600 focus:border-orange-500'
                            : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-orange-500'
                        }`}
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="message" 
                        className={`block mb-2 text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 ${
                          isDarkMode 
                            ? 'bg-gray-800 text-white border-gray-600 focus:border-orange-500'
                            : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-orange-500'
                        }`}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="hover-target group relative inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-medium overflow-hidden hover:scale-105 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(255,94,0,0.3)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader size={20} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            <span>Send Message</span>
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          <div 
            ref={infoRef}
            className="lg:w-1/3 transform translate-x-20 opacity-0 transition-all duration-1000 ease-out"
          >
            <div className={`rounded-xl shadow-lg h-full ${
              isDarkMode ? 'bg-gray-700' : 'bg-white'
            }`}>
              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Contact Information
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500 p-3 rounded-full text-white mt-1">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Email
                      </h4>
                      <a 
                        href="mailto:shiva86869@gmail.com" 
                        className={`hover:text-orange-500 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        shiva86689@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500 p-3 rounded-full text-white mt-1">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Phone
                      </h4>
                      <a 
                        href="tel:+12345678901" 
                        className={`hover:text-orange-500 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        +91 (742) 783-4825
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500 p-3 rounded-full text-white mt-1">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Location
                      </h4>
                      <p className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Jaipur, Rajasthan
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Follow Me
                  </h4>
                  
                  <div className="flex space-x-4">
                    {[
                      { 
                        name: 'Twitter', 
                        icon: Twitter, 
                        color: '#1DA1F2',
                        url: 'https://twitter.com/yourusername'
                      },
                      { 
                        name: 'LinkedIn', 
                        icon: Linkedin, 
                        color: '#0A66C2',
                        url: 'https://linkedin.com/in/er-shubham-kumar-98ba901b0'
                      },
                      { 
                        name: 'Github', 
                        icon: Github, 
                        color: '#24292e',
                        url: 'https://github.com/sam-helix'
                      },
                      { 
                        name: 'Dribbble', 
                        icon: Dribbble, 
                        color: '#EA4C89',
                        url: 'https://dribbble.com/yourusername'
                      },
                    ].map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a 
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover-target group w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-transparent transition-colors duration-300"
                          style={{ 
                            backgroundColor: isDarkMode ? 'transparent' : 'transparent',
                          }}
                        >
                          <IconComponent 
                            size={18}
                            className={`relative z-10 ${
                              isDarkMode ? 'text-white' : 'text-gray-800'
                            } group-hover:text-white transition-colors duration-300`}
                          style={{ 
                            color: `${isDarkMode ? 'white' : 'black'}`,
                          }}
                        >
                          {social.name.charAt(4)}
                          </IconComponent >
                          <span 
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ backgroundColor: social.color }}
                          ></span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;