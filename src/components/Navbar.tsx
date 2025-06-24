import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isExploreMenuOpen, setIsExploreMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleExploreMenu = () => {
    setIsExploreMenuOpen(!isExploreMenuOpen);
  };

  const exploreOptions = [
    { path: "/where-am-i", name: t('nav.whereAmI') },
    { path: "/who-am-i", name: t('nav.whoAmI') },
    { path: "/trip-planner", name: "Trip Planner" },
    { path: "/know-me", name: t('nav.knowMe') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Add click outside handler for profile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="logo.png" alt="Kemet Pass Logo" className="h-10 w-auto" />
            <span className={`text-xl font-bold bg-gradient-to-r from-kemet-medium to-kemet-dark bg-clip-text text-transparent ${
              isHomePage && !scrolled ? 'text-white' : ''
            }`}>
              Kemet Pass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-kemet-light/30 transition-colors ${
                isHomePage && !scrolled ? 'text-white' : ''
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/chatbot"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-kemet-light/30 transition-colors ${
                isHomePage && !scrolled ? 'text-white' : ''
              }`}
            >
              {t('nav.chatbot')}
            </Link>
            <Link
              to="http://localhost:5555/ar"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-kemet-light/30 transition-colors ${
                isHomePage && !scrolled ? 'text-white' : ''
              }`}
            >
              {t('nav.arExperience')}
            </Link>

            {/* Explore Dropdown - Desktop */}
            <div className="relative">
              <button
                onClick={toggleExploreMenu}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-kemet-light/30 transition-colors ${
                  isHomePage && !scrolled ? 'text-white' : ''
                }`}
                aria-label="Explore options"
              >
                <span>{t('nav.explore')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="m5 8 6 6 6-6"/>
                </svg>
              </button>
              {isExploreMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {exploreOptions.map((option) => (
                    <Link
                      key={option.path}
                      to={option.path}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setIsExploreMenuOpen(false)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/weather"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-kemet-light/30 transition-colors ${
                isHomePage && !scrolled ? 'text-white' : ''
              }`}
            >
              {t('nav.weather')}
            </Link>

            <div className="ml-4 flex items-center gap-2">
              {userData ? (
                <div className="relative profile-menu-container">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-kemet-light/30 transition-colors ${
                      isHomePage && !scrolled ? 'text-white' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-kemet-dark flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="hidden md:inline">{userData.username}</span>
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-kemet-light/30 transition-colors ${
                      isHomePage && !scrolled ? 'text-white' : ''
                    }`}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-kemet-dark hover:bg-kemet-dark/80 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {t('nav.signup')}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile User Menu */}
            {userData && (
              <button
                onClick={() => navigate('/profile')}
                className={`p-2 rounded-md text-sm font-medium hover:bg-kemet-light/30 transition-colors ${
                  isHomePage && !scrolled ? 'text-white' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-kemet-dark flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            )}

            <button
              className={`flex items-center ${
                isHomePage && !scrolled ? 'text-white' : ''
              }`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-kemet-light/30 transition-colors ${
                isHomePage && !scrolled ? 'text-white' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/chatbot"
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-kemet-light/30 transition-colors ${
                isHomePage && !scrolled ? 'text-white' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.chatbot')}
            </Link>
            <Link
              to="http://localhost:5555/ar"
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-kemet-light/30 transition-colors ${
                isHomePage && !scrolled ? 'text-white' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.arExperience')}
            </Link>
            {exploreOptions.map((option) => (
              <Link
                key={option.path}
                to={option.path}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-kemet-light/30 transition-colors ${
                  isHomePage && !scrolled ? 'text-white' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {option.name}
              </Link>
            ))}
            <Link
              to="/weather"
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-kemet-light/30 transition-colors ${
                isHomePage && !scrolled ? 'text-white' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.weather')}
            </Link>
            {!userData && (
              <>
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-kemet-light/30 transition-colors ${
                    isHomePage && !scrolled ? 'text-white' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-kemet-dark text-white hover:bg-kemet-dark/80 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.signup')}
                </Link>
              </>
            )}
            {userData && (
              <>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-kemet-light/30 transition-colors ${
                    isHomePage && !scrolled ? 'text-white' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
