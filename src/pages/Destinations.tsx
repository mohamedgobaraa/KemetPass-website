import { MapPin, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Destination {
  id: number;
  title: string;
  location: string;
  image: string;
  tag: string;
  rating: number;
  reviews: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    title: "Pyramids of Giza",
    location: "Giza, Egypt",
    image: "pyrameds of egypt.jpg",
    tag: "Top Attraction",
    rating: 5,
    reviews: "4.9k"
  },
  {
    id: 2,
    title: "Luxor Temple",
    location: "Luxor, Egypt",
    image: "LuxorTemple1.jpg",
    tag: "Historical Site",
    rating: 5,
    reviews: "3.7k"
  },
  {
    id: 3,
    title: "Egyptian Museum",
    location: "Cairo, Egypt",
    image: "museumegypt.jpg",
    tag: "Museum",
    rating: 5,
    reviews: "4.2k"
  },
  {
    id: 4,
    title: "Valley of the Kings",
    location: "Luxor, Egypt",
    image: "Ramesses-VI-Tomb-Valley-of-the-Kings-Guide-95-copy.jpg",
    tag: "Historical Site",
    rating: 5,
    reviews: "4.5k"
  },
  {
    id: 5,
    title: "Abu Simbel Temples",
    location: "Aswan, Egypt",
    image: "th.jpg",
    tag: "Ancient Temple",
    rating: 5,
    reviews: "4.8k"
  },
  {
    id: 6,
    title: "Karnak Temple",
    location: "Luxor, Egypt",
    image: "karnak.jpg",
    tag: "Historical Site",
    rating: 5,
    reviews: "4.6k"
  }
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kemet-dark to-kemet-medium">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore Ancient Egypt
          </h1>
          <p className="text-xl text-kemet-light max-w-2xl mx-auto">
            Discover the wonders of ancient Egyptian civilization through our curated collection of historical sites and attractions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div 
              key={destination.id}
              className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 group hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-kemet-dark/20"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-kemet-dark/80 text-white text-xs px-3 py-1 rounded-full">
                  {destination.tag}
                </div>
              </div>
              <div className="p-6 text-white">
                <div className="flex items-center gap-1 text-kemet-light mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                <h3 className="font-bold text-xl mb-3">{destination.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(destination.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm">({destination.reviews} reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations; 