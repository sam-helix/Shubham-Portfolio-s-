import { useEffect, useRef } from 'react';
import { Award, Briefcase, Workflow } from 'lucide-react';

interface AboutProps {
  isDarkMode: boolean;
}

const About = ({ isDarkMode }: AboutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          textRef.current?.classList.add('animate-in');
          setTimeout(() => {
            imageRef.current?.classList.add('animate-in');
          }, 400);
        }
      },
      { threshold: 0.2 }
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

  const timelineItems = [
    {
      year: '2025',
      title: 'Frontend Developer',
      company: 'Cognus Technology.',
      description: 'Build applications in React & Next.js with focus on performance and accessibility.',
      icon: <Briefcase className="w-5 h-5 text-white" />,
    },
    {
      year: '2024',
      title: 'Frontend Specialist',
      company: 'Creative Digital Agency',
      description: 'Created award-winning websites and interactive experiences for major brands.',
      icon: <Award className="w-5 h-5 text-white" />,
    },
    {
      year: '2023',
      title: 'SEO Executive - 2',
      company: '',
      description: 'Worked with 3 different projects to boost website perfromance and traffic ratio.',
      icon: <Workflow className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`relative min-h-screen py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">Me</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div 
            ref={textRef}
            className="md:w-1/2 transform translate-y-20 opacity-0 transition-all duration-1000 ease-out"
          >
            <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Crafting Digital Experiences
            </h3>
            
            <p className={`text-lg mb-6 leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I'm a passionate web developer and designer with over 2 years of experience creating immersive digital
              experiences. My approach combines technical expertise with creative design thinking to build websites
              that not only function flawlessly but also captivate users.
            </p>
            
            <p className={`text-lg mb-8 leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Specializing in interactive animations and intuitive user interfaces along with Great SEO optimization, I strive to push the boundaries
              of what's possible on the web while maintaining performance and accessibility.
            </p>
            
            {/* Timeline */}
            <div className="relative mt-12 pl-8 border-l-2 border-orange-500">
              {timelineItems.map((item, index) => (
                <div 
                  key={index} 
                  className="mb-10 relative"
                  style={{ 
                    opacity: 0,
                    transform: 'translateY(20px)',
                    animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.2}s forwards`
                  }}
                >
                  <div className="absolute -left-[41px] p-2 rounded-full bg-orange-500 shadow-lg">
                    {item.icon}
                  </div>
                  
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold mt-1">{item.title}</h4>
                    <p className="text-sm italic mb-2">{item.company}</p>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="md:w-1/2 transform translate-x-20 opacity-0 transition-all duration-1000 ease-out"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className={`relative overflow-hidden rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}>
                <div className="aspect-w-4 aspect-h-5 overflow-hidden rounded-lg mb-6">
                  <img
                    src="/shubhamImg.jpg"
                    alt="Portrait"
                    className="object-cover w-full h-full rounded-lg transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                <div className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <h3 className="text-2xl font-bold mb-3">Er. Shubham Kumar</h3>
                  <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 mb-4">
                    Creative Developer
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["React", "TypeScript", "Tailwind", "Three.js", "GSAP", "UX/UI"].map((skill, i) => (
                      <span 
                        key={i} 
                        className={`px-3 py-1 text-sm rounded-full ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-200' 
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    "I believe that the intersection of design and technology is where the most innovative digital experiences are born."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;