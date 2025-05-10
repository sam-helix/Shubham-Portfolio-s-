import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

interface ProjectsProps {
  isDarkMode: boolean;
}

const Projects = ({ isDarkMode }: ProjectsProps) => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Promptazia Prompt Sharing App",
      description: "A WebGL-powered portfolio with interactive 3D elements and physics-based animations. Created using Three.js and React.",
      image: "https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "Three.js", "WebGL", "GSAP"],
      githubUrl: "https://github.com/sam-helix/Promptazia",
      liveUrl: "https://promptazia.vercel.app/",
    },
    {
      id: 2,
      title: "E-Education Dashboard",
      description: "Full-featured order now page in react and new testimonial section using animation.",
      image: "https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "TypeScript", "Tailwind", "Chart.js"],
      githubUrl: "#",
      liveUrl: "https://www.globalassignmenthelp.com",
    },
    {
      id: 3,
      title: "Food Corner App",
      description: "An interactive Food corner app with custom scroll-based animations and image transitions with awesome backdrop filter.",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg",
      tags: ["JavaScript", "CSS", "Canvas API", "Locomotive Scroll"],
      githubUrl: "https://github.com/sam-helix/Food-Corner-App",
      liveUrl: "https://food-corner-app.netlify.app/",
    },
    {
      id: 4,
      title: "Weather App Redesign",
      description: "Modern weather application with location tracking, animated weather icons, and forecast visualization.",
      image: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "APIs", "SVG Animation", "Geolocation"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          projectsRef.current?.classList.add('animate-in');
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
      id="projects" 
      ref={sectionRef}
      className={`relative min-h-screen py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">Projects</span>
        </h2>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 transform translate-y-20 opacity-0 transition-all duration-1000 ease-out"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group hover-target"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className={`overflow-hidden rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              } shadow-lg transition-all duration-500 
                ${activeProject === project.id ? 'transform scale-[1.03]' : ''}`}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">
                          {project.title}
                        </h3>
                        <div className="flex space-x-3">
                          <a 
                            href={project.githubUrl} 
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors duration-300"
                            aria-label="GitHub Repository"
                          >
                            <Github size={20} className="text-white" />
                          </a>
                          <a 
                            href={project.liveUrl} 
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors duration-300"
                            aria-label="Live Demo"
                          >
                            <ExternalLink size={20} className="text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>
                  
                  <p className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full ${
                          isDarkMode 
                            ? 'bg-gray-600 text-gray-200' 
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-700/10">
                    <a 
                      href={project.githubUrl} 
                      className={`flex items-center gap-2 ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      } transition-colors duration-300`}
                    >
                      <Github size={18} />
                      <span>Repository</span>
                    </a>
                    <a 
                      href={project.liveUrl} 
                      className={`flex items-center gap-2 ${
                        isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      } transition-colors duration-300`}
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;