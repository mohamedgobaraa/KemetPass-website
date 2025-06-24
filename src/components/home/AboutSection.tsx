
import { useState, useEffect, useRef } from 'react';
import { Clock, Compass, Map, Award } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
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
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-kemet-dark to-kemet-medium/90 text-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-kemet-light">
            5,000 Years of History Awaits
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Experience the grandeur of ancient Egypt through modern technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div 
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              <img 
                src="karnak.jpg" 
                alt="Temple of Karnak" 
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-kemet-dark p-6 rounded-xl shadow-xl border border-kemet-light/30">
                <div className="text-5xl font-bold text-kemet-light">7</div>
                <div className="text-sm">UNESCO World Heritage Sites</div>
              </div>
            </div>
          </div>
          
          <div 
            className={`space-y-8 transition-all duration-1000 delay-500 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-kemet-light">
                Egypt: Where History Comes Alive
              </h2>
            </div>
            
            <p className="text-lg opacity-90">
              From the iconic Pyramids of Giza to the magnificent temples of Luxor, 
              Egypt offers an unparalleled journey through time. Experience our cutting-edge
              technology that brings ancient stories to life, making your visit truly unforgettable.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-kemet-light/20 hover:border-kemet-light/50 transition-all duration-300 hover:bg-white/15">
                <Clock className="w-10 h-10 text-kemet-light mb-3" />
                <h4 className="font-bold text-lg">Ancient Wonders</h4>
                <p className="opacity-80">Thousands of years of history preserved</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-kemet-light/20 hover:border-kemet-light/50 transition-all duration-300 hover:bg-white/15">
                <Map className="w-10 h-10 text-kemet-light mb-3" />
                <h4 className="font-bold text-lg">Tour Guidance</h4>
                <p className="opacity-80">Guided experiences with AI assistance</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-kemet-light/20 hover:border-kemet-light/50 transition-all duration-300 hover:bg-white/15">
                <Compass className="w-10 h-10 text-kemet-light mb-3" />
                <h4 className="font-bold text-lg">Navigation</h4>
                <p className="opacity-80">Never get lost at historical sites</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-kemet-light/20 hover:border-kemet-light/50 transition-all duration-300 hover:bg-white/15">
                <Award className="w-10 h-10 text-kemet-light mb-3" />
                <h4 className="font-bold text-lg">Premium Quality</h4>
                <p className="opacity-80">Award-winning travel experiences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
