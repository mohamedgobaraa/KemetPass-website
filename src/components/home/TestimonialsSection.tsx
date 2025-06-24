
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  country: string;
  image: string;
  rating: number;
  text: string;
}

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      country: "USA",
      image: "Sarah Johnson.jpg",
      rating: 5,
      text: "My trip to Egypt was absolutely magical! The AI chatbot answered all my questions before the trip, and the AR experience at the pyramids was mind-blowing. I felt like I was transported back in time!"
    },
    {
      name: "Marco Rossi",
      country: "Italy",
      image: "Marco Rossi.jpg",
      rating: 5,
      text: "Kemet Pass made our family vacation to Egypt unforgettable. The 'Where Am I?' feature helped us identify hidden spots in Luxor that we would have missed. The kids loved learning about hieroglyphics!"
    },
    {
      name: "Aisha Rahman",
      country: "Malaysia",
      image: "Aisha Rahman.jpg",
      rating: 4,
      text: "As a solo female traveler, I was a bit nervous about visiting Egypt, but the app's AI guide gave me all the information I needed to feel safe and prepared. The weather forecasts were incredibly accurate too!"
    },
    {
      name: "David Chen",
      country: "Canada",
      image: "David Chen.jpg",
      rating: 5,
      text: "The 'Know Me' feature where pharaohs come to life and tell their own stories was incredible - my daughter was completely captivated. This app transforms Egyptian tourism into a truly immersive experience."
    }
  ];

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

  useEffect(() => {
    if (isVisible) {
      startAutoSlide();
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, testimonials.length]);

  const startAutoSlide = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    resetAutoSlideTimer();
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
    resetAutoSlideTimer();
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    resetAutoSlideTimer();
  };

  const resetAutoSlideTimer = () => {
    // Reset the auto slide timer
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    startAutoSlide();
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-kemet-dark to-kemet-medium text-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Quote className="w-12 h-12 mx-auto text-kemet-light mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="max-w-2xl mx-auto opacity-90 text-lg">
            Hear from people who have experienced Egypt through Kemet Pass
          </p>
        </div>

        <div 
          className={`relative max-w-4xl mx-auto transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Navigation buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 md:-translate-x-12 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 md:translate-x-12 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-6 py-8 md:p-10">
                  <div className="max-w-2xl mx-auto">
                    <div className="flex items-center mb-8">
                      <div className="w-20 h-20 rounded-full overflow-hidden mr-5 border-2 border-kemet-light shadow-lg">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">{testimonial.name}</h4>
                        <p className="text-white/80">{testimonial.country}</p>
                        <div className="flex mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={i < testimonial.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`w-5 h-5 ${
                                i < testimonial.rating 
                                  ? 'text-yellow-400' 
                                  : 'text-white/30'
                              }`}
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-lg md:text-xl leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-white w-6' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
