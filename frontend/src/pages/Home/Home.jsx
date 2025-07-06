import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
import MultiLanguageSection from "../../components/MultiLanguageSection/MultiLanguageSection";
import {
  BookOpen,
  Brain,
  Sparkles,
  Shield,
  Upload,
  MessageSquare,
  Folder,
  Star,
  Users,
  Award,
  Play,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Zap,
  Globe,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    setIsVisible(true);
    
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

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id) => (ref) => {
    if (ref) {
      sectionRefs.current[id] = ref;
      ref.id = id;
    }
  };

  const features = [
    {
      title: "AI Study Assistant",
      description: "24/7 personalized learning support powered by advanced AI",
      icon: Brain,
      stats: ["500K+ Questions", "98% Accuracy", "< 2s Response"],
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      title: "Smart Resource Hub",
      description: "Centralized platform for all your study materials and notes",
      icon: Folder,
      stats: ["50K+ Resources", "All Branches", "Instant Access"],
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      title: "Interactive Learning",
      description: "Engage with materials through quizzes and practice sessions",
      icon: Sparkles,
      stats: ["1000+ Practice Sets", "Real-time Feedback", "Personalized"],
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      bgGradient: "from-violet-50 to-purple-50",
    },
  ];

  const services = [
    {
      title: "AI Chat Assistant",
      description: "Get instant answers to your academic queries with our advanced AI chat system",
      icon: MessageSquare,
      features: ["Natural Language Processing", "Context-Aware Responses", "Multi-language Support"],
      color: "blue",
    },
    {
      title: "Resource Manager",
      description: "Organize and access your study materials efficiently with smart categorization",
      icon: Folder,
      features: ["Cloud Storage", "Advanced Search", "Version Control"],
      color: "emerald",
    },
    {
      title: "Materials Browser",
      description: "Browse and download verified study materials from our extensive library",
      icon: Upload,
      features: ["Branch-wise Organization", "Peer Reviews", "Quality Verified"],
      color: "purple",
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: BookOpen, value: "100K+", label: "Study Materials" },
    { icon: Award, value: "98%", label: "Success Rate" },
    { icon: Globe, value: "24/7", label: "AI Support" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Engineering Student",
      content: "Sehpaathi revolutionized my study routine. The AI assistant helped me understand complex concepts in minutes!",
      rating: 5,
      avatar: "PS",
    },
    {
      name: "Arjun Patel",
      role: "Medical Student",
      content: "The resource management system is incredible. All my study materials organized perfectly in one place.",
      rating: 5,
      avatar: "AP",
    },
    {
      name: "Sneha Reddy",
      role: "Computer Science",
      content: "Interactive learning features made studying fun. My grades improved significantly since using Sehpaathi.",
      rating: 5,
      avatar: "SR",
    },
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} scroll-smooth`}>
      {/* Hero Section */}
      <div 
        ref={setSectionRef('hero')}
        className={`relative min-h-screen flex items-center transition-all duration-1000 ease-out ${
          visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-blue-900/30 to-indigo-900/50' 
            : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50'
        }`}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="space-y-6">
                <div className={`inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg ${
                  isDark 
                    ? 'bg-gray-800/80 border-blue-500/50 text-gray-200' 
                    : 'bg-white/80 border-blue-200/50 text-gray-700'
                }`}>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>AI-Powered Learning Platform</span>
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className={`block ${isDark ? 'text-white' : 'text-gray-900'}`}>Future of</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Education
                  </span>
                  <span className={`block ${isDark ? 'text-white' : 'text-gray-900'}`}>is Here</span>
                </h1>
                
                <p className={`text-lg sm:text-xl leading-relaxed max-w-xl ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Transform your academic journey with personalized AI assistance, smart resource management, and interactive learning tools designed for the modern student.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={() => navigate("/demo")}
                  className={`group backdrop-blur-sm border font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-2 ${
                    isDark 
                      ? 'bg-gray-800/80 border-gray-600 text-gray-200 hover:bg-gray-700/80 hover:shadow-xl' 
                      : 'bg-white/80 border-gray-200 text-gray-700 hover:bg-white hover:shadow-xl'
                  }`}
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>              {/* Stats Preview */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl sm:text-3xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{stat.value}</div>
                    <div className={`text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                {/* Floating elements */}
                <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <TrendingUp className="w-9 h-9 text-white" />
                </div>

                {/* Main image container */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
                  <img
                    src="/assets/gif.gif"
                    alt="Sehpaathi Demo"
                    className="relative w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-flex items-center justify-center w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl transform group-hover:rotate-6 transition-transform duration-300"></div>                  <div className={`relative rounded-xl w-14 h-14 flex items-center justify-center ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <stat.icon className={`w-7 h-7 ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                </div>
                <div className={`text-3xl sm:text-4xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{stat.value}</div>
                <div className={`font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Features Section */}
      <div 
        ref={setSectionRef('features')}
        className={`py-20 transition-all duration-1000 ease-out ${
          visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${
          isDark 
            ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
            : 'bg-gradient-to-b from-gray-50 to-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Powerful Features for
              <span className="leading-snug block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern Learning
              </span>
            </h2>            <p className={`text-xl leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover the tools that will revolutionize your study experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                  activeFeature === index ? "scale-105 -translate-y-2" : ""
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-90`}></div>
                
                {/* Content */}
                <div className="relative p-8 lg:p-10 text-white h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed">{feature.description}</p>
                  </div>

                  <div className="mt-auto">
                    <div className="grid grid-cols-1 gap-3">
                      {feature.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <span className="text-white/90 font-medium">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                </div>
              </div>
            ))}
          </div>        </div>
      </div>      {/* Multi-Language AI Section */}
      <div ref={setSectionRef('multilang')} className={`transition-all duration-1000 ease-out ${
        visibleSections.has('multilang') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <MultiLanguageSection />
      </div>      {/* Services Section */}
      <div 
        ref={setSectionRef('services')}
        className={`py-20 transition-all duration-1000 ease-out ${
          visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } bg-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive solutions designed to enhance your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${
                  service.color === 'blue' ? 'from-blue-500/10 to-indigo-500/10' :
                  service.color === 'emerald' ? 'from-emerald-500/10 to-teal-500/10' :
                  'from-purple-500/10 to-pink-500/10'
                } rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700`}></div>

                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                    service.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-indigo-500' :
                    service.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-teal-500' :
                    'bg-gradient-to-br from-purple-500 to-pink-500'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${
                          service.color === 'blue' ? 'text-blue-500' :
                          service.color === 'emerald' ? 'text-emerald-500' :
                          'text-purple-500'
                        }`} />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Testimonials Section */}
      <div 
        ref={setSectionRef('testimonials')}
        className={`py-20 transition-all duration-1000 ease-out ${
          visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${
          isDark 
            ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
            : 'bg-gradient-to-b from-gray-50 to-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              What Students Say
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join thousands of students who are already experiencing success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (              <div
                key={index}
                className={`rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-400/20 to-purple-400/20'
                    : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                }`}></div>

                <div className="relative">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>                  {/* Content */}
                  <p className={`mb-6 leading-relaxed italic ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>                    <div>
                      <div className={`font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>{testimonial.name}</div>
                      <div className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* CTA Section */}
      <div 
        ref={setSectionRef('cta')}
        className={`py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden transition-all duration-1000 ease-out ${
          visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Learning Experience?
              </span>
            </h2>
              <p className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join over 50,000 students who are already achieving their academic goals with Sehpaathi&apos;s AI-powered learning platform
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button
                onClick={() => navigate("/signup")}
                className="group bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 inline-flex items-center gap-3"
              >
                Get Started Free
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="font-medium">No credit card required</span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/70">
                <Shield className="w-5 h-5" />
                <span className="font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Users className="w-5 h-5" />
                <span className="font-medium">50K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Award className="w-5 h-5" />
                <span className="font-medium">98% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
