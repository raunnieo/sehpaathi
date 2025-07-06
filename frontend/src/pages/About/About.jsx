import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/useTheme";
import { 
  BookOpen, 
  Mail, 
  School, 
  Lightbulb,
  Target,
  Rocket,
  Github,
  Linkedin,
  ExternalLink,
  Sparkles,
  Brain,
  Users
} from "lucide-react";

const About = () => {
  const { isDark } = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    // Intersection Observer for smooth scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const setSectionRef = (id) => (ref) => {
    if (ref) {
      sectionRefs.current[id] = ref;
      ref.id = id;
    }
  };

  const teamMembers = [
     {
      name: "Raunak Mandil",
      role: "Co-Developer",
      college: "MITS, Gwalior",
      image: "/assets/raunak.jpg",
      social: {
        github: "https://github.com/raunnieo",
        linkedin: "https://linkedin.com/in/raunakmandil",
      },
    },
    
    {
      name: "Kavyansh Dhakad",
      role: "Co-Developer",
      college: "IIT Ropar",
      image: "/assets/kavya.jpg",
      social: {
        github: "https://github.com/kyvns",
        linkedin: "https://linkedin.com/in/kavyansh-dhakad",
      },
    },
  ];  const journeySteps = [
    {
      title: "The Problem",
      description:
        "As students ourselves, we experienced firsthand the chaos of managing scattered study resources, tracking assignments, and trying to make sense of complex concepts without 24/7 support.",
      icon: Lightbulb,
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "The Vision",
      description:
        "We believed that engineering solutions should go beyond quick fixes. We envisioned a central hub that would revolutionize how students learn and collaborate.",
      icon: Target,
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "The Solution",
      description:
        "Sehpaathi was born - an AI-powered platform that brings together resource management, personalized learning, and round-the-clock assistance in one seamless experience.",
      icon: Rocket,
      gradient: "from-green-500 to-teal-500",
    },
  ];

  const stats = [
    { number: "1000+", label: "Active Users", icon: Users },
    { number: "50K+", label: "Resources Managed", icon: BookOpen },
    { number: "99.9%", label: "Uptime", icon: Brain },
    { number: "24/7", label: "AI Support", icon: Sparkles },
  ];  return (
    <div className={`min-h-screen relative scroll-smooth ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">        {/* Hero Section */}
        <div 
          ref={setSectionRef('hero')}
          className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ease-out ${
            visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r backdrop-blur-sm border px-6 py-3 rounded-full text-sm font-medium mb-8 ${
            isDark 
              ? 'from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-300'
              : 'from-blue-100 to-purple-100 border-blue-300 text-blue-700'
          }`}>
            <Sparkles className="w-4 h-4" />
            Our Journey
          </div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            From Student 
            <span className="leading-snug block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Struggles to Innovation
            </span>
  </h1>
          <p className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Sehpaathi emerged from the daily challenges faced by students and
            developers, transforming the way we approach learning and resource
            management in engineering education.
          </p>
        </div>        {/* Stats Section */}
        <div 
          ref={setSectionRef('stats')}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 ease-out ${
            visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >{stats.map((stat, index) => (
          <div
            key={index}
            className={`backdrop-blur-sm border p-6 rounded-2xl text-center group transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70'
                : 'bg-white/80 border-gray-200 hover:bg-white shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`text-2xl sm:text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{stat.number}</div>
            <div className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>{stat.label}</div>
          </div>
          ))}
        </div>        {/* Journey Section */}
        <div 
          ref={setSectionRef('journey')}
          className={`mb-20 transition-all duration-1000 ease-out ${
            visibleSections.has('journey') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        ><div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Our Journey</h2>
            <p className={`text-xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>How we built something extraordinary</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {journeySteps.map((step, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-500 ${
                  activeStep === index ? 'scale-105' : 'hover:scale-105'
                }`}
              >                <div className={`backdrop-blur-sm border p-8 rounded-2xl h-full transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700/50 group-hover:bg-gray-800/70'
                    : 'bg-white/80 border-gray-200 group-hover:bg-white shadow-lg group-hover:shadow-xl'
                }`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <step.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{step.title}</h3>
                  <p className={`leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>{step.description}</p>
                </div>
                {/* Connecting line for desktop */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-gray-600 to-transparent transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>        {/* Team Section */}
        <div 
          ref={setSectionRef('team')}
          className={`mb-20 transition-all duration-1000 ease-out ${
            visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        ><div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Meet the Innovators</h2>
            <p className={`text-xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>The minds behind Sehpaathi</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (              <div
                key={index}
                className={`backdrop-blur-sm border p-8 rounded-2xl group transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70'
                    : 'bg-white/80 border-gray-200 hover:bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full rounded-full object-cover ring-4 transition-all duration-300 ${
                        isDark 
                          ? 'ring-gray-600 group-hover:ring-blue-500'
                          : 'ring-gray-300 group-hover:ring-blue-500'
                      }`}
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-0.5 rounded-full">
                      <p className="text-center text-nowrap text-white font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{member.name}</h3>
                  <div className={`flex items-center justify-center gap-2 mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <School className="w-4 h-4" />
                    <p className="text-sm">{member.college}</p>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group/link ${
                        isDark 
                          ? 'bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-600 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <Github className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group/link ${
                        isDark 
                          ? 'bg-gray-700/50 text-gray-400 hover:text-white hover:bg-blue-600'
                          : 'bg-gray-100 text-gray-600 hover:text-white hover:bg-blue-600'
                      }`}
                    >
                      <Linkedin className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}        <div className="relative">
          <div className={`bg-gradient-to-r backdrop-blur-sm border p-8 sm:p-12 rounded-3xl text-center ${
            isDark 
              ? 'from-blue-600/20 to-purple-600/20 border-blue-500/30'
              : 'from-blue-50 to-purple-50 border-blue-200'
          }`}>
            <div className={`absolute inset-0 rounded-3xl blur-xl ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10'
                : 'bg-gradient-to-r from-blue-100/30 to-purple-100/30'
            }`}></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Join Our Journey</h2>
              <p className={`text-xl mb-8 max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Have ideas, feedback, or want to contribute? <br/>We would love to hear from you!
              </p>
              <a
                href="/contact-support"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 group"
              >
                  
                Contact Us
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
