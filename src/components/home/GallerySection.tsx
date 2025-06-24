import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  location: string;
  title: string;
}

const GallerySection = () => {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      url: "pyrameds of egypt.jpg",
      alt: "Pyramids of Giza",
      location: "Giza, Egypt",
      title: "The Great Pyramids"
    },
    {
      id: 2,
      url: "LuxorTemple1.jpg",
      alt: "Luxor Temple",
      location: "Luxor, Egypt",
      title: "Luxor Temple"
    },
    {
      id: 3,
      url: "museumegypt.jpg",
      alt: "Egyptian Museum",
      location: "Cairo, Egypt",
      title: "Egyptian Museum"
    }
  ]);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-kemet-lightest">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-kemet-dark/70 text-white p-4 backdrop-blur-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{image.location}</span>
                </div>
                <h3 className="font-bold mt-1">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;