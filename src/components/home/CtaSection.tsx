
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-28 bg-gradient-to-r from-kemet-light to-kemet-lightest relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <img 
          src="/images/hieroglyphics-bg.jpg" 
          alt="Egyptian Hieroglyphics" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-kemet-dark/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-kemet-dark/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 md:p-16 max-w-5xl mx-auto border border-kemet-light/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="transform transition-all duration-500 hover:scale-105">
              <img 
                src="Ancient-Egyptian-Pharaohs.jpg" 
                alt="Egyptian Pharaoh Illustration" 
                className="max-w-full h-auto drop-shadow-xl"
              />
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-kemet-dark to-kemet-medium">
                Ready to Experience Egypt in a New Way?
              </h2>
              <p className="text-gray-700 text-lg mb-10">
                Sign up now and unlock all the amazing features of Kemet Pass. Begin your journey through ancient Egypt enhanced by modern technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-kemet-dark to-kemet-medium hover:from-kemet-medium hover:to-kemet-dark text-white px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/login"
                  className="border-2 border-kemet-dark text-kemet-dark hover:bg-kemet-dark/10 px-8 py-4 rounded-xl font-medium text-lg transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
