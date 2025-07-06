import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/useTheme';
import {

  Send,

  Languages
} from 'lucide-react';

const Demo = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef(null);

  const languages = [
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'हिंदी', code: 'hi', flag: '🇮🇳' },
    { name: 'संस्कृत', code: 'sa', flag: '🕉️' },
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },
    { name: 'Deutsch', code: 'de', flag: '🇩🇪' }
  ];

  
const demoResponses = {
  en: {
    greeting: "Hello! I'm Sehpaathi, your AI study companion. How can I help you learn today? 🚀",
    ai: "Artificial Intelligence Overview 🤖\n\nMachine Learning Types:\n• Supervised Learning: Training with labeled data (Classification, Regression)\n• Unsupervised Learning: Finding patterns in unlabeled data (Clustering, PCA)\n• Reinforcement Learning: Learning through rewards and penalties\n\nKey: Quality data + Right algorithm + Proper validation = Successful AI model!",
    datascience: "Data Science Process 📊\n\nData Science Pipeline:\n1. Data Collection: Gather relevant datasets\n2. Data Cleaning: Handle missing values, outliers\n3. EDA: Exploratory Data Analysis with visualizations\n4. Feature Engineering: Create meaningful variables\n5. Model Building: Apply ML algorithms\n6. Validation: Test model performance\n7. Deployment: Put model into production",
    coding: "Clean Code Principles 🔧\n\nBest Coding Practices:\n• Use meaningful variable names (userName vs x)\n• Write functions that do one thing well\n• Keep functions small (< 20 lines)\n• Add comments for complex logic\n• Follow DRY principle (Don't Repeat Yourself)\n• Use version control (Git)\n\nExample: if (isUserLoggedIn) vs if (flag === true)"
  },
  hi: {
    greeting: "नमस्ते! मैं सहपाठी हूँ, आपका AI अध्ययन साथी। आज मैं आपकी पढ़ाई में कैसे मदद कर सकता हूँ? 🚀",
    cs: "कंप्यूटर साइंस मूल बातें 💻\n\nटाइम कॉम्प्लेक्सिटी विश्लेषण:\n• O(1) - स्थिर समय: Array access\n• O(n) - रैखिक समय: Single loop\n• O(n²) - द्विघात समय: Nested loops\n• O(log n) - लॉगरिदमिक समय: Binary search\n\nसुझाव: डेटा साइज़ और प्रदर्शन आवश्यकताओं के आधार पर algorithms चुनें!",
    ai: "कृत्रिम बुद्धिमत्ता अवलोकन 🤖\n\nमशीन लर्निंग प्रकार:\n• सुपरवाइज़्ड लर्निंग: लेबल्ड डेटा से सीखना (Classification, Regression)\n• अनसुपरवाइज़्ड लर्निंग: बिना लेबल के पैटर्न ढूंढना (Clustering, PCA)\n• रीइन्फोर्समेंट लर्निंग: रिवार्ड्स और पेनल्टी से सीखना\n\nमुख्य बात: गुणवत्तापूर्ण डेटा + सही एल्गोरिदम + उचित validation = सफल AI मॉडल!",
    datascience: "डेटा साइंस प्रक्रिया 📊\n\nडेटा साइंस पाइपलाइन:\n1. डेटा संग्रह: प्रासंगिक datasets इकट्ठा करना\n2. डेटा सफाई: मिसिंग वैल्यू, आउटलायर्स संभालना\n3. EDA: Exploratory Data Analysis with visualizations\n4. Feature Engineering: महत्वपूर्ण variables बनाना\n5. मॉडल बिल्डिंग: ML algorithms लगाना\n6. Validation: मॉडल प्रदर्शन परीक्षण\n7. Deployment: मॉडल को production में लाना",
    coding: "क्लीन कोड सिद्धांत 🔧\n\nबेस्ट कोडिंग प्रैक्टिसेज:\n• अर्थपूर्ण variable नाम उपयोग करें (userName vs x)\n• functions लिखें जो एक काम अच्छे से करें\n• functions को छोटा रखें (< 20 lines)\n• जटिल logic के लिए comments जोड़ें\n• DRY सिद्धांत का पालन करें (Don't Repeat Yourself)\n• Version control का उपयोग करें (Git)\n\nउदाहरण: if (isUserLoggedIn) vs if (flag === true)"
  },
  sa: {
    greeting: "नमस्ते! अहं सहपाठी अस्मि, भवतः AI अध्ययन सहायकः। अद्य अहं भवतः अध्ययने किमर्थं सहायतां कर्तुं शक्नोमि? 🚀",
    cs: "संगणक विज्ञानम् मूलभूत तत्त्वानि 💻\n\nकाल जटिलता विश्लेषणम्:\n• O(1) - स्थिर कालः: Array access\n• O(n) - रैखिक कालः: Single loop\n• O(n²) - द्विघात कालः: Nested loops\n• O(log n) - लॉगरिदमिक कालः: Binary search\n\nसुझावः: डेटा आकारस्य प्रदर्शन आवश्यकतानां च आधारेण algorithms चयनं कुर्वन्तु!",
    ai: "कृत्रिम बुद्धिमत्ता अवलोकनम् 🤖\n\nयन्त्र शिक्षणस्य प्रकाराः:\n• पर्यवेक्षित शिक्षणम्: लेबल्ड डेटा द्वारा प्रशिक्षणम् (Classification, Regression)\n• अपर्यवेक्षित शिक्षणम्: बिना लेबल के पैटर्न आविष्कारः (Clustering, PCA)\n• पुनर्बलन शिक्षणम्: पुरस्कार-दण्डाभ्यां शिक्षणम्\n\nमुख्यम्: गुणवत्तापूर्ण डेटा + उचित एल्गोरिदम + समुचित validation = सफल AI मॉडल!",
    datascience: "डेटा विज्ञान प्रक्रिया 📊\n\nडेटा विज्ञान पाइपलाइन:\n1. डेटा संग्रहः: प्रासंगिक datasets संकलनम्\n2. डेटा शुद्धिकरणम्: मिसिंग वैल्यू, आउटलायर्स नियन्त्रणम्\n3. EDA: Exploratory Data Analysis with visualizations\n4. Feature Engineering: महत्वपूर्ण variables निर्माणम्\n5. मॉडल निर्माणम्: ML algorithms प्रयोगः\n6. मान्यीकरणम्: मॉडल प्रदर्शन परीक्षणम्\n7. स्थापना: मॉडल production में स्थापना",
    coding: "शुद्ध कोड सिद्धान्ताः 🔧\n\nउत्तम कोडिंग प्रथाः:\n• अर्थपूर्ण variable नामानि उपयोगं कुरु (userName vs x)\n• functions लिखत येषां एकं कार्यं सुष्ठु भवति\n• functions लघूनि रक्षत (< 20 lines)\n• जटिल logic कृते comments योजयत\n• DRY सिद्धान्तस्य पालनं कुरु (Don't Repeat Yourself)\n• Version control उपयोगं कुरु (Git)\n\nउदाहरणम्: if (isUserLoggedIn) vs if (flag === true)"
  },
  es: {
    greeting: "¡Hola! Soy Sehpaathi, tu compañero de estudio con IA. ¿Cómo puedo ayudarte a aprender hoy? 🚀",
    cs: "Fundamentos de Ciencias de la Computación 💻\n\nAnálisis de Complejidad Temporal:\n• O(1) - Tiempo constante: Acceso a array\n• O(n) - Tiempo lineal: Un bucle simple\n• O(n²) - Tiempo cuadrático: Bucles anidados\n• O(log n) - Tiempo logarítmico: Búsqueda binaria\n\nMejores prácticas: ¡Elige algoritmos basados en el tamaño de datos y requisitos de rendimiento!",
    ai: "Visión General de Inteligencia Artificial 🤖\n\nTipos de Aprendizaje Automático:\n• Aprendizaje Supervisado: Entrenamiento con datos etiquetados (Clasificación, Regresión)\n• Aprendizaje No Supervisado: Encontrar patrones en datos no etiquetados (Clustering, PCA)\n• Aprendizaje por Refuerzo: Aprender a través de recompensas y penalizaciones\n\nClave: ¡Datos de calidad + Algoritmo correcto + Validación adecuada = Modelo de IA exitoso!",
    datascience: "Proceso de Ciencia de Datos 📊\n\nPipeline de Ciencia de Datos:\n1. Recolección de Datos: Reunir conjuntos de datos relevantes\n2. Limpieza de Datos: Manejar valores faltantes, valores atípicos\n3. EDA: Análisis Exploratorio de Datos con visualizaciones\n4. Ingeniería de Features: Crear variables significativas\n5. Construcción de Modelo: Aplicar algoritmos de ML\n6. Validación: Probar el rendimiento del modelo\n7. Despliegue: Poner el modelo en producción",
    coding: "Principios de Código Limpio 🔧\n\nMejores Prácticas de Codificación:\n• Usa nombres de variables significativos (userName vs x)\n• Escribe funciones que hagan una cosa bien\n• Mantén las funciones pequeñas (< 20 líneas)\n• Agrega comentarios para lógica compleja\n• Sigue el principio DRY (Don't Repeat Yourself)\n• Usa control de versiones (Git)\n\nEjemplo: if (isUserLoggedIn) vs if (flag === true)"
  },
  fr: {
    greeting: "Bonjour! Je suis Sehpaathi, votre compagnon d'étude IA. Comment puis-je vous aider à apprendre aujourd'hui? 🚀",
    cs: "Fondamentaux de l'Informatique 💻\n\nAnalyse de Complexité Temporelle:\n• O(1) - Temps constant: Accès au tableau\n• O(n) - Temps linéaire: Boucle simple\n• O(n²) - Temps quadratique: Boucles imbriquées\n• O(log n) - Temps logarithmique: Recherche binaire\n\nMeilleures pratiques: Choisissez les algorithmes basés sur la taille des données et les exigences de performance!",
    ai: "Aperçu de l'Intelligence Artificielle 🤖\n\nTypes d'Apprentissage Automatique:\n• Apprentissage Supervisé: Entraînement avec données étiquetées (Classification, Régression)\n• Apprentissage Non Supervisé: Trouver des modèles dans des données non étiquetées (Clustering, PCA)\n• Apprentissage par Renforcement: Apprendre par récompenses et pénalités\n\nClé: Données de qualité + Bon algorithme + Validation appropriée = Modèle IA réussi!",
    datascience: "Processus de Science des Données 📊\n\nPipeline de Science des Données:\n1. Collecte de Données: Rassembler des ensembles de données pertinents\n2. Nettoyage des Données: Gérer les valeurs manquantes, les valeurs aberrantes\n3. EDA: Analyse Exploratoire des Données avec visualisations\n4. Ingénierie des Features: Créer des variables significatives\n5. Construction de Modèle: Appliquer des algorithmes ML\n6. Validation: Tester la performance du modèle\n7. Déploiement: Mettre le modèle en production",
    coding: "Principes de Code Propre 🔧\n\nMeilleures Pratiques de Codage:\n• Utilisez des noms de variables significatifs (userName vs x)\n• Écrivez des fonctions qui font une chose bien\n• Gardez les fonctions petites (< 20 lignes)\n• Ajoutez des commentaires pour la logique complexe\n• Suivez le principe DRY (Don't Repeat Yourself)\n• Utilisez le contrôle de version (Git)\n\nExemple: if (isUserLoggedIn) vs if (flag === true)"
  },
  de: {
    greeting: "Hallo! Ich bin Sehpaathi, dein KI-Lernbegleiter. Wie kann ich dir heute beim Lernen helfen? 🚀",
    cs: "Grundlagen der Informatik 💻\n\nZeitkomplexitätsanalyse:\n• O(1) - Konstante Zeit: Array-Zugriff\n• O(n) - Lineare Zeit: Einfache Schleife\n• O(n²) - Quadratische Zeit: Verschachtelte Schleifen\n• O(log n) - Logarithmische Zeit: Binäre Suche\n\nBeste Praktiken: Wähle Algorithmen basierend auf Datengröße und Leistungsanforderungen!",
    ai: "Überblick Künstliche Intelligenz 🤖\n\nMaschinelles Lernen Typen:\n• Überwachtes Lernen: Training mit beschrifteten Daten (Klassifikation, Regression)\n• Unüberwachtes Lernen: Muster in unbeschrifteten Daten finden (Clustering, PCA)\n• Verstärkendes Lernen: Lernen durch Belohnungen und Strafen\n\nSchlüssel: Qualitätsdaten + Richtiger Algorithmus + Ordnungsgemäße Validierung = Erfolgreiches KI-Modell!",
    datascience: "Data Science Prozess 📊\n\nData Science Pipeline:\n1. Datensammlung: Relevante Datensätze sammeln\n2. Datenbereinigung: Fehlende Werte, Ausreißer behandeln\n3. EDA: Explorative Datenanalyse mit Visualisierungen\n4. Feature Engineering: Bedeutungsvolle Variablen erstellen\n5. Modellbau: ML-Algorithmen anwenden\n6. Validierung: Modellleistung testen\n7. Bereitstellung: Modell in Produktion bringen",
    coding: "Clean Code Prinzipien 🔧\n\nBeste Coding-Praktiken:\n• Verwende aussagekräftige Variablennamen (userName vs x)\n• Schreibe Funktionen, die eine Sache gut machen\n• Halte Funktionen klein (< 20 Zeilen)\n• Füge Kommentare für komplexe Logik hinzu\n• Folge dem DRY-Prinzip (Don't Repeat Yourself)\n• Verwende Versionskontrolle (Git)\n\nBeispiel: if (isUserLoggedIn) vs if (flag === true)"
  }
};

  const sampleQuestions = {
  en: [
  
    "Explain time complexity",
    "What is machine learning?",
    "Data science process steps",
    "Best coding practices"
  ],
  hi: [

    "टाइम कॉम्प्लेक्सिटी समझाएं",
    "मशीन लर्निंग क्या है?",
    "डेटा साइंस प्रक्रिया के चरण",
    "बेस्ट कोडिंग प्रैक्टिसेज"
  ],
  sa: [

    "काल जटिलता व्याख्यातु",
    "यन्त्र शिक्षणं किम्?",
    "डेटा विज्ञान प्रक्रिया पदानि",
    "उत्तम कोडिंग प्रथाः"
  ],
  es: [

    "Explica la complejidad temporal",
    "¿Qué es el aprendizaje automático?",
    "Pasos del proceso de ciencia de datos",
    "Mejores prácticas de codificación"
  ],
  fr: [
 
    "Expliquer la complexité temporelle",
    "Qu'est-ce que l'apprentissage automatique?",
    "Étapes du processus de science des données",
    "Meilleures pratiques de codage"
  ],
  de: [

    "Erkläre Zeitkomplexität",
    "Was ist maschinelles Lernen?",
    "Data Science Prozess Schritte",
    "Beste Coding-Praktiken"
  ]
};

  useEffect(() => {
    // Add welcome message when language changes
    const currentLang = languages.find(lang => lang.name === currentLanguage);
    if (currentLang) {
      const welcomeMessage = {
        id: Date.now(),
        text: demoResponses[currentLang.code].greeting,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Removed auto-scroll to prevent layout issues

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      text: messageText || input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    

    // Simulate AI thinking time
  setTimeout(() => {
    const currentLang = languages.find(lang => lang.name === currentLanguage);
    let response;
    const msg = (messageText || input)?.toLowerCase();

    if (!currentLang) {
      response = demoResponses['en'].greeting; // Default to English if language not found
    }
    // Computer Science keywords
    if (msg?.includes('time complexity') || msg?.includes('algorithm') || msg?.includes('टाइम कॉम्प्लेक्सिटी') || msg?.includes('एल्गोरिदम') || msg?.includes('काल जटिलता') || msg?.includes('complejidad temporal') || msg?.includes('complexité temporelle') || msg?.includes('zeitkomplexität')) {
      response = demoResponses[currentLang.code].cs;
    }
    // AI/ML keywords
    else if (msg?.includes('machine learning') || msg?.includes('artificial intelligence') || msg?.includes('मशीन लर्निंग') || msg?.includes('कृत्रिम बुद्धिमत्ता') || msg?.includes('यन्त्र शिक्षणं') || msg?.includes('aprendizaje automático') || msg?.includes('apprentissage automatique') || msg?.includes('maschinelles lernen')) {
      response = demoResponses[currentLang.code].ai;
    }
    // Data Science keywords
    else if (msg?.includes('data science') || msg?.includes('data analysis') || msg?.includes('डेटा साइंस') || msg?.includes('डेटा विश्लेषण') || msg?.includes('डेटा विज्ञान') || msg?.includes('ciencia de datos') || msg?.includes('science des données') || msg?.includes('data science')) {
      response = demoResponses[currentLang.code].datascience;
    }
    // Coding keywords
    else if (msg?.includes('coding') || msg?.includes('programming') || msg?.includes('कोडिंग') || msg?.includes('प्रोग्रामिंग') || msg?.includes('कोडिंग प्रथाः') || msg?.includes('codificación') || msg?.includes('programmation') || msg?.includes('programmierung')) {
      response = demoResponses[currentLang.code].coding;
    }
    // Default response
    else {
      response = demoResponses[currentLang.code].greeting;
    }

    const aiMessage = {
      id: Date.now() + 1,
      text: response,
      sender: 'ai',
      timestamp: new Date()
    };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };



  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-gradient-to-br  from-gray-900 via-indigo-950 to-purple-950' : 'bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50'
    }`}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 py-1">
        {/* Side by Side Video & Chat */}
        <div className="flex flex-col mt-10 lg:flex-row lg:items-start lg:space-x-6 mb-1">
          {/* Video Section */}
          <div className="flex-1 mb-6 lg:mb-0">
            <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📺 Watch Demo Tutorial
            </h3>
            <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200'} shadow-2xl`}>
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/xJA8tP74KD0?si=dQ5ZUASv5MAEvjjq"
                  title="Sehpaathi AI Demo Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-6">
                <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Complete Sehpaathi Tutorial
                </h4>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Learn how to maximize your learning potential with our AI-powered study companion. 
                  See features like multi-language support, smart resource management, and personalized learning paths.
                  <br />
                  Transform the way you learn and achieve academic excellence with our cutting-edge AI-powered study companion. Designed to adapt to your unique brain, it is more than just a tool – it is your personalized mentor, available 24/7
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Duration: 5:30
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Views: 50K+
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Glowing Divider */}
          <div className="hidden lg:flex items-center">
            <div className={`w-px min-h-screen ${isDark ? 'bg-gray-700' : 'bg-gray-300'} relative mx-4`}>
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-sm"></div>
            </div>
          </div>
          {/* Chat Demo Section */}
          <div className="flex-1">
            <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🤖 Demo Sehpaathi AI
            </h3>
            <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-gray-200'} shadow-2xl`}>
              {/* Language Selector in Chat */}
              <div className={`p-4 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Languages className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Chat in {currentLanguage}
                    </span>
                  </div>
                  <select
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className={`px-3 py-1 text-sm rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.name}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Chat Messages */}
              <div ref={messagesContainerRef} className="h-80 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : isDark 
                          ? 'bg-gray-700 text-gray-200' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-line text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className={`px-4 py-3 rounded-2xl ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full animate-bounce`}></div>
                        <div className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full animate-bounce delay-100`}></div>
                        <div className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full animate-bounce delay-200`}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sample Prompts Inside Chat */}
              <div className="p-4 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200'}">
                <div className="grid grid-cols-2 gap-2">
                  {sampleQuestions[languages.find(lang => lang.name === currentLanguage)?.code || 'en'].map((q,i)=>(
                    <button key={i} onClick={()=>handleSendMessage(q)} className="p-2 text-sm rounded-lg border transition bg-indigo-100">{q}</button>
                  ))}
                </div>
              </div>

              {/* Input Area - Click redirects to signup */}
              <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200'} p-4`}>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    onClick={() => navigate('/signup')}
                    placeholder={`Type your question in ${currentLanguage}...`}
                    className={`flex-1 px-4 py-3 rounded-xl border cursor-pointer ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  />
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>


        
      </div>
    </div>
  );
};

export default Demo;
