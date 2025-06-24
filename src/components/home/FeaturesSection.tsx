
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, MapPin, User, FileText, Cloud, Video } from 'lucide-react';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
  image: string;
}

const FeaturesSection = () => {
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

  const features: Feature[] = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Assistant",
      description: "Chat with our AI guide to learn about Egyptian history, attractions, and travel tips.",
      link: "/chatbot",
      image: "ai assisst .webp"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Where Am I?",
      description: "Upload a photo and discover the historic Egyptian location you're visiting.",
      link: "/where-am-i",
      image: "where i am.jpeg"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Who Am I?",
      description: "Identify ancient Egyptian rulers and historical figures from images.",
      link: "/who-am-i",
      image: "who am i .jpeg"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Hieroglyphic Translator",
      description: "Translate ancient Egyptian hieroglyphics into modern language.",
      link: "/hieroglyphic",
      image: "Hieroglyphic Translator.jpg"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Weather Forecast",
      description: "Get real-time weather updates for popular tourist destinations in Egypt.",
      link: "/weather",
      image: "Weather Forecast.webp"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Know Me",
      description: "Watch interactive videos of ancient pharaohs sharing their stories.",
      link: "/know-me",
      image: "Know Me.jpg"
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-kemet-lightest"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="px-4 py-1 bg-kemet-light text-kemet-dark rounded-full text-sm font-medium mb-4 inline-block">
            OUR FEATURES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Experience Egypt Like Never Before
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Our innovative features combine ancient history with cutting-edge technology
            to create an immersive Egyptian experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className={`group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } hover:-translate-y-2 bg-white`}
              style={{ 
                transitionDelay: `${150 + index * 100}ms`,
                transitionDuration: '800ms' 
              }}
            >
              <div className="h-full flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold flex items-center">
                      <span className="bg-kemet-dark p-2 rounded-lg mr-3 text-kemet-light">
                        {feature.icon}
                      </span>
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-gray-700">{feature.description}</p>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-end">
                  <span className="text-kemet-dark font-medium flex items-center group-hover:underline">
                    Explore Feature
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
