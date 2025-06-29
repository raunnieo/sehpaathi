import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Mail,
  GraduationCap,
  BookOpen,
  Shield,
  HelpCircle,
  Users,
  Zap,
  Heart,
  ArrowRight,
  Send,
} from "lucide-react";
import { useTheme } from "../../contexts/useTheme";

function Footer() {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "AI Chat Assistant", href: "/dashboard/chat", icon: Zap },
        { name: "Study Materials", href: "/dashboard/materials", icon: BookOpen },
        { name: "Resource Manager", href: "/dashboard/resources", icon: Users },
        { name: "About Us", href: "/about", icon: Heart },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help", icon: HelpCircle },
        { name: "Documentation", href: "/docs", icon: BookOpen },
        { name: "Community", href: "/community", icon: Users },
        { name: "Contact Support", href: "/contact", icon: Mail },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy", icon: Shield },
        { name: "Terms of Service", href: "/terms", icon: BookOpen },
        { name: "Cookie Policy", href: "/cookies", icon: Shield },
        { name: "Data Security", href: "/security", icon: Shield },
      ],
    },
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#", gradient: "from-blue-400 to-blue-600" },
    { name: "LinkedIn", icon: Linkedin, href: "#", gradient: "from-blue-600 to-blue-800" },
    { name: "GitHub", icon: Github, href: "#", gradient: "from-gray-700 to-gray-900" },
    { name: "Instagram", icon: Instagram, href: "#", gradient: "from-pink-500 to-purple-600" },
  ];

  const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "100K+", label: "Study Materials" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "AI Support" },
  ];

  return (
    <footer className={`relative ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        {/* Stats Section */}
        <div className={`py-16 border-b ${
          isDark ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="text-center mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Trusted by Students Worldwide
            </h2>            <p className={`max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Join thousands of students who are achieving their academic goals with Sehpaathi
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>                  <div className={`relative rounded-2xl p-6 shadow-xl border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-100'
                  }`}>
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                  </div>
                </div>
                <div className={`font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Sehpaathi
                  </h3>                  <p className={`text-sm font-medium ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>AI Learning Platform</p>
                </div>
              </div>
              
              <p className={`leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Revolutionizing education with AI-powered learning assistance, personalized study resources, 
                and comprehensive academic support designed for the modern student.
              </p>              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Stay Updated</h4>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Get the latest features and study resources delivered to your inbox.
                </p>
                <form className="flex gap-2">
                  <div className="flex-1 relative">                    <input
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm ${
                        isDark 
                          ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400'
                          : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 font-medium"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Subscribe</span>
                  </button>
                </form>
              </div>              {/* Social Links */}
              <div className="space-y-4">
                <h4 className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Connect With Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`group relative w-12 h-12 rounded-2xl bg-gradient-to-br ${social.gradient} flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110`}
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-6">
                <h4 className={`font-bold text-lg ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => {
                    const Icon = link.icon;
                    return (
                      <li key={linkIndex}>                        <a
                          href={link.href}
                          className={`group flex items-center gap-3 transition-all duration-200 font-medium ${
                            isDark 
                              ? 'text-gray-300 hover:text-blue-400' 
                              : 'text-gray-600 hover:text-blue-600'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            isDark 
                              ? 'bg-gray-700 group-hover:bg-blue-900/50' 
                              : 'bg-gray-100 group-hover:bg-blue-50'
                          }`}>
                            <Icon className={`w-4 h-4 transition-colors ${
                              isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                            }`} />
                          </div>
                          <span>{link.name}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>        {/* Bottom Section */}
        <div className={`py-8 border-t ${
          isDark ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className={`flex flex-col sm:flex-row items-center gap-6 text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div className="flex items-center gap-2">
                <span>© {currentYear} Sehpaathi.</span>
                
              </div>
            </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/terms" className={`transition-colors font-medium ${
                isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}>
                Terms
              </a>
              <a href="/privacy" className={`transition-colors font-medium ${
                isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}>
                Privacy
              </a>
              <a href="/security" className={`transition-colors font-medium ${
                isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}>
                Security
              </a>
              <a href="/contact" className={`transition-colors font-medium ${
                isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;