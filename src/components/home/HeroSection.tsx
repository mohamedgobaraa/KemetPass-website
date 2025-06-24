import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with improved overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="pyrameds of egypt.jpg" 
          alt="Egyptian Pyramids" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Improved header with greeting and profile */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg flex items-center">
                  {t('hero.title')}
                </h1>
                <p className="text-xl md:text-2xl text-kemet-light drop-shadow-md">
                  {t('hero.subtitle')}
                </p>
              </div>
            </div>

            {/* Enhanced search box */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-5 mb-12 flex items-center transition-all duration-300 hover:shadow-kemet-dark/20">
              <Search className="w-6 h-6 text-kemet-dark ml-2 mr-3" />
              <input 
                type="text" 
                placeholder={t('hero.searchPlaceholder')}
                className="flex-grow bg-transparent outline-none text-gray-700 text-lg"
              />
              <button className="bg-gradient-to-r from-kemet-dark to-kemet-medium hover:from-kemet-medium hover:to-kemet-dark text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium">
                {t('hero.exploreButton')}
              </button>
            </div>

            {/* Featured destinations with improved styling */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{t('hero.featuredDestinations')}</h2>
                <Link to="/destinations" className="text-kemet-light hover:text-white text-sm font-medium transition-colors flex items-center">
                  {t('hero.viewAll')} <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pyramids of Giza Card - enhanced styling */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 group hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-kemet-dark/20">
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src="pyrameds of egypt.jpg" 
                      alt="Pyramids of Giza" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-kemet-dark/80 text-white text-xs px-3 py-1 rounded-full">
                      Top Attraction
                    </div>
                  </div>
                  <div className="p-4 text-white">
                    <div className="flex items-center gap-1 text-kemet-light mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Giza, Egypt</span>
                    </div>
                    <h3 className="font-bold text-xl mb-1">Pyramids of Giza</h3>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm">(4.9k reviews)</span>
                    </div>
                  </div>
                </div>
                
                {/* Luxor Temple Card - enhanced styling */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 group hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-kemet-dark/20">
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src="LuxorTemple1.jpg" 
                      alt="Luxor Temple" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-kemet-dark/80 text-white text-xs px-3 py-1 rounded-full">
                      Historical Site
                    </div>
                  </div>
                  <div className="p-4 text-white">
                    <div className="flex items-center gap-1 text-kemet-light mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Luxor, Egypt</span>
                    </div>
                    <h3 className="font-bold text-xl mb-1">Luxor Temple</h3>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm">(3.7k reviews)</span>
                    </div>
                  </div>
                </div>
                
                {/* Egyptian Museum Card - enhanced styling */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 group hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-kemet-dark/20">
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src="museumegypt.jpg" 
                      alt="Egyptian Museum" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-kemet-dark/80 text-white text-xs px-3 py-1 rounded-full">
                      Museum
                    </div>
                  </div>
                  <div className="p-4 text-white">
                    <div className="flex items-center gap-1 text-kemet-light mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Cairo, Egypt</span>
                    </div>
                    <h3 className="font-bold text-xl mb-1">Egyptian Museum</h3>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm">(4.2k reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Improved action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/chatbot"
                className="bg-gradient-to-r from-kemet-dark to-kemet-medium hover:from-kemet-medium hover:to-kemet-dark text-white px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>{t('hero.startJourney')}</span>
              </Link>
              <a 
                href="http://localhost:5555/ar"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-kemet-light bg-transparent backdrop-blur-sm text-white hover:bg-white/10 px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span>{t('hero.tryAR')}</span>
              </a>
              <a 
                href="http://localhost:5555/game"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-kemet-light bg-transparent backdrop-blur-sm text-white hover:bg-white/10 px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span>{t('hero.game')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;