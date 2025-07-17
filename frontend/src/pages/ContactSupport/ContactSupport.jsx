import { useState, useEffect } from "react";
import { ArrowLeft, Mail, MessageSquare, Send, User, FileText, AlertCircle, CheckCircle, Sparkles, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";

const ContactSupport = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
        priority: "medium"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formProgress, setFormProgress] = useState(0);

    const categories = [
        { value: "", label: "Select a category", icon: "🤔" },
        { value: "technical", label: "Technical Issue", icon: "⚙️" },
        { value: "account", label: "Account Problem", icon: "👤" },
        { value: "billing", label: "Billing & Payments", icon: "💳" },
        { value: "feature", label: "Feature Request", icon: "✨" },
        { value: "bug", label: "Bug Report", icon: "🐛" },
        { value: "general", label: "General Inquiry", icon: "💬" },
        { value: "other", label: "Other", icon: "📝" }
    ];

    const priorities = [
        { value: "low", label: "Low", color: "text-green-600", bg: "bg-green-50", icon: "🌱" },
        { value: "medium", label: "Medium", color: "text-yellow-600", bg: "bg-yellow-50", icon: "⚡" },
        { value: "high", label: "High", color: "text-orange-600", bg: "bg-orange-50", icon: "🔥" },
        { value: "urgent", label: "Urgent", color: "text-red-600", bg: "bg-red-50", icon: "🚨" }
    ];

    // Calculate form progress
    useEffect(() => {
        const filledFields = Object.values(formData).filter(value => value.trim()).length;
        const totalFields = Object.keys(formData).length;
        setFormProgress((filledFields / totalFields) * 100);
    }, [formData]);

    // Cleanup iframe on component unmount
    useEffect(() => {
        return () => {
            const iframe = document.getElementById('hidden-iframe');
            if (iframe) {
                document.body.removeChild(iframe);
            }
        };
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeX9TnQPw912LpcOOzNXA4-rMXzss0PdKKjpkgMZzQ623NeRw/formResponse';

            // Create a hidden iframe with a specific name
            const iframeName = 'hidden-iframe';
            let iframe = document.getElementById(iframeName);
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.setAttribute('id', iframeName);
                iframe.setAttribute('name', iframeName);
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
            }

            // Create the form element
            const form = document.createElement('form');
            form.setAttribute('method', 'POST');
            form.setAttribute('action', formUrl);
            form.setAttribute('target', iframeName);
            form.style.display = 'none';

            // Add form fields
            const formFields = {
                'entry.848078539': formData.name,
                'entry.309193415': formData.email,
                'entry.1675532706': formData.subject,
                'entry.916790802': formData.message,
                'entry.1626039784': formData.priority,
                'entry.1151881136': formData.category
            };

            // Create and append inputs
            Object.entries(formFields).forEach(([name, value]) => {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', name);
                input.setAttribute('value', value);
                form.appendChild(input);
            });

            // Append form, submit it, and clean up
            document.body.appendChild(form);
            form.submit();

            // Remove form after submission
            setTimeout(() => {
                document.body.removeChild(form);
            }, 500);

            setFormData({
                name: "",
                email: "",
                subject: "",
                category: "",
                message: "",
                priority: "medium",
            });

            setIsSubmitting(false);
            setIsSubmitted(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.name && formData.email && formData.subject && formData.category && formData.message;
    if (isSubmitted) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/30'}`}>
                <div className="text-center max-w-md animate-in fade-in duration-500">
                    <div className={`inline-flex items-center justify-center w-20 h-20 ${isDark ? 'bg-green-900/50' : 'bg-green-100'} rounded-full mb-6 animate-bounce`}>
                        <CheckCircle className={`w-10 h-10 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div className="relative">
                        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                            Message Sent Successfully! ✨
                        </h2>
                        <div className="absolute -top-2 -right-2 animate-pulse">
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                        </div>
                    </div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                        Thank you for contacting us. We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
                    >
                        <span className="flex items-center space-x-2">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                            <span>Go Back</span>
                        </span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/30'}`}>
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 p-4 sm:p-6">
                <button
                    onClick={() => navigate(-1)}
                    className={`group flex items-center space-x-2 px-4 py-2 ${isDark
                        ? 'text-gray-300 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 border-gray-700/50 hover:border-gray-600'
                        : 'text-gray-600 hover:text-gray-900 bg-white/60 hover:bg-white border-gray-200/50 hover:border-gray-300'
                        } border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-xl font-medium`}
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span>Go Back</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 pb-12">
                {/* Header Section */}
                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="relative">
                        <div className={`inline-flex items-center justify-center w-16 h-16 ${isDark ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-br from-blue-100 to-purple-100'} rounded-full mb-6 relative group`}>
                            <MessageSquare className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'} group-hover:scale-110 transition-transform duration-300`} />

                        </div>

                    </div>
                    <h1 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' : 'bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800'} bg-clip-text text-transparent mb-4`}>
                        Contact Support
                    </h1>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
                        Send us a message and we&apos;ll get back to you as soon as possible.
                    </p>

                    {/* Progress Bar */}
                    <div className={`mt-6 w-48 mx-auto ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${formProgress}%` }}
                        ></div>
                    </div>
                    <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Form {Math.round(formProgress)}% complete
                    </p>
                </div>        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    {/* Contact Form */}
                    <div className={`p-6 sm:p-8 ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-gray-200/50'} border rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                        <div className="flex items-center space-x-3 mb-6">
                            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Send us a Message 💌
                            </h2>
                            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name and Email */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'} transition-colors group-focus-within:text-blue-500`}>
                                        <User className="w-4 h-4 inline mr-2" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 transform focus:scale-[1.02] ${isDark
                                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:bg-gray-700 focus:shadow-lg focus:shadow-blue-500/20'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20'
                                            } ${formData.name ? 'ring-1 ring-green-400' : ''}`}
                                        required
                                    />
                                    {formData.name && (
                                        <div className="mt-1 text-xs text-green-500 flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Looks good!
                                        </div>
                                    )}
                                </div>

                                <div className="group">
                                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'} transition-colors group-focus-within:text-blue-500`}>
                                        <Mail className="w-4 h-4 inline mr-2" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="Enter your email address"
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 transform focus:scale-[1.02] ${isDark
                                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:bg-gray-700 focus:shadow-lg focus:shadow-blue-500/20'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20'
                                            } ${formData.email ? 'ring-1 ring-green-400' : ''}`}
                                        required
                                    />
                                    {formData.email && (
                                        <div className="mt-1 text-xs text-green-500 flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Valid email!
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Category and Priority */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'} transition-colors group-focus-within:text-blue-500`}>
                                        <FileText className="w-4 h-4 inline mr-2" />
                                        Category *
                                    </label>                  <div className="relative">
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 transform focus:scale-[1.02] appearance-none ${isDark
                                                ? 'bg-gray-700/50 border-gray-600 text-white focus:ring-blue-400 focus:bg-gray-700 focus:shadow-lg focus:shadow-blue-500/20'
                                                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20'
                                                } ${formData.category ? 'ring-1 ring-green-400' : ''}`}
                                            required
                                        >
                                            {categories.map((category) => (
                                                <option key={category.value} value={category.value}>
                                                    {category.icon} {category.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {formData.category && (
                                        <div className="mt-1 text-xs text-green-500 flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Category selected!
                                        </div>
                                    )}
                                </div>

                                <div className="group">
                                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'} transition-colors group-focus-within:text-blue-500`}>
                                        <AlertCircle className="w-4 h-4 inline mr-2" />
                                        Priority
                                    </label>
                                    <div className="relative">
                                        <select value={formData.priority}
                                            onChange={(e) => handleInputChange('priority', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 transform focus:scale-[1.02] appearance-none ${isDark
                                                ? 'bg-gray-700/50 border-gray-600 text-white focus:ring-blue-400 focus:bg-gray-700 focus:shadow-lg focus:shadow-blue-500/20'
                                                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20'
                                                }`}
                                        >
                                            {priorities.map((priority) => (
                                                <option key={priority.value} value={priority.value}>
                                                    {priority.icon} {priority.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="group">
                                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'} transition-colors group-focus-within:text-blue-500`}>
                                    Subject *
                                </label>
                                <input type="text"
                                    value={formData.subject}
                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                    placeholder="Brief description of your issue"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 transform focus:scale-[1.02] ${isDark
                                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:bg-gray-700 focus:shadow-lg focus:shadow-blue-500/20'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20'
                                        } ${formData.subject ? 'ring-1 ring-green-400' : ''}`}
                                    required
                                />
                                {formData.subject && (
                                    <div className="mt-1 text-xs text-green-500 flex items-center">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Great subject!
                                    </div>
                                )}
                            </div>

                            {/* Message */}
                            <div className="group">
                                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'} transition-colors group-focus-within:text-blue-500`}>
                                    Message *
                                </label>                <textarea
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    placeholder="Please provide detailed information about your issue or question..."
                                    rows={6}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent resize-none transition-all duration-300 transform focus:scale-[1.02] ${isDark
                                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:bg-gray-700 focus:shadow-lg focus:shadow-blue-500/20'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/20'
                                        } ${formData.message ? 'ring-1 ring-green-400' : ''}`}
                                    required
                                />
                                <div className="flex justify-between items-center mt-1">
                                    {formData.message && (
                                        <div className="text-xs text-green-500 flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Message added!
                                        </div>
                                    )}
                                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} ml-auto`}>
                                        {formData.message.length}/1000
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className={`group relative overflow-hidden flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${isFormValid && !isSubmitting
                                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105'
                                        : `${isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                                        }`}
                                >
                                    {/* Shimmer effect for enabled button */}
                                    {isFormValid && !isSubmitting && (
                                        <div className="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    )}

                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                            <span>Send Message</span>
                                            <Sparkles className="w-4 h-4 ml-1 group-hover:animate-pulse" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSupport;
