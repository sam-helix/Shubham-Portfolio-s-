import { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface SkillsProps {
  isDarkMode: boolean;
}

const Skills = ({ isDarkMode }: SkillsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML5/CSS3", level: 95, color: "#e34c26" },
        { name: "JavaScript", level: 90, color: "#f7df1e" },
        { name: "React & Next.Js", level: 89, color: "#61dafb" },
        { name: "TypeScript", level: 70, color: "#007acc" },
        { name: "Tailwind CSS", level: 88, color: "#38b2ac" },
      ],
    },
    {
      title: "Animation & Graphics",
      skills: [
        { name: "GSAP", level: 80, color: "#88ce02" },
        { name: "Three.js", level: 75, color: "#049ef4" },
        { name: "Framer Motion", level: 70, color: "#ff9a00" },
        { name: "Canvas API", level: 70, color: "#e535ab" },
        { name: "CSS Animations", level: 90, color: "#ff5e00" },
      ],
    },
    {
      title: "Design & Tools",
      skills: [
        { name: "Figma", level: 85, color: "#f24e1e" },
        { name: "Git", level: 88, color: "#f05032" },
        { name: "Responsive Design", level: 95, color: "#38b2ac" },
        { name: "UI/UX", level: 80, color: "#9b59b6" },
        { name: "Performance Optimization", level: 75, color: "#3498db" },
      ],
    },
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          skillsRef.current?.classList.add('animate-in');
          
          // Animate all skill bars
          const skillBars = document.querySelectorAll('.skill-bar-inner');
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              (bar as HTMLElement).style.width = (bar as HTMLElement).dataset.width || '0%';
            }, 200 + index * 100);
          });
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
      id="skills" 
      ref={sectionRef}
      className={`relative min-h-screen py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">Skills</span>
        </h2>
        
        <div 
          ref={skillsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 transform translate-y-20 opacity-0 transition-all duration-1000 ease-out"
        >
          {skillCategories.map((category, catIndex) => (
            <div 
              key={catIndex}
              className={`rounded-xl shadow-lg p-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              style={{ 
                opacity: 0,
                transform: 'translateY(20px)',
                animation: `fadeInUp 0.6s ease-out ${0.2 + catIndex * 0.2}s forwards`
              }}
            >
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className={`font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {skill.name}
                      </span>
                      <span className={`${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className={`w-full h-3 rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="skill-bar-inner h-full rounded-full"
                        style={{ 
                          width: '0%',
                          backgroundColor: skill.color,
                          transition: 'width 1s cubic-bezier(0.65, 0, 0.35, 1)'
                        }}
                        data-width={`${skill.level}%`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Skill cloud animation */}
        <div className="mt-20 flex justify-center">
          <div className="relative w-full max-w-3xl h-64 overflow-hidden">
            {[
              "JavaScript", "React", "CSS", "Animation", "GSAP", "Three.js",
              "Responsive", "UI/UX", "TypeScript", "HTML5", "Canvas", "SVG",
              "Tailwind", "Performance", "Figma", "Accessibility", "Git"
            ].map((skill, i) => (
              <div 
                key={i} 
                className={`absolute hover-target ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                } font-bold transition-all duration-500 ease-out hover:text-orange-500`}
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  fontSize: `${Math.random() * 1.5 + 0.8}rem`,
                  opacity: Math.random() * 0.5 + 0.5,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                  animation: `float ${Math.random() * 10 + 20}s ease-in-out infinite alternate`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;