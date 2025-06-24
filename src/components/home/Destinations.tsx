import { MapPin, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

interface Destination {
  id: number;
  titleKey: string;
  locationKey: string;
  image: string;
  tagKey: string;
  rating: number;
  reviews: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    titleKey: "destinations.places.pyramids",
    locationKey: "destinations.locations.giza",
    image: "pyrameds of egypt.jpg",
    tagKey: "destinations.tags.topAttraction",
    rating: 5,
    reviews: "4.9k"
  },
  {
    id: 2,
    titleKey: "destinations.places.luxorTemple",
    locationKey: "destinations.locations.luxor",
    image: "LuxorTemple1.jpg",
    tagKey: "destinations.tags.historicalSite",
    rating: 5,
    reviews: "3.7k"
  },
  {
    id: 3,
    titleKey: "destinations.places.egyptianMuseum",
    locationKey: "destinations.locations.cairo",
    image: "museumegypt.jpg",
    tagKey: "destinations.tags.museum",
    rating: 5,
    reviews: "4.2k"
  },
  {
    id: 4,
    titleKey: "destinations.places.valleyOfKings",
    locationKey: "destinations.locations.luxor",
    image: "valley of kings.jpg",
    tagKey: "destinations.tags.historicalSite",
    rating: 5,
    reviews: "4.5k"
  },
  {
    id: 5,
    titleKey: "destinations.places.abuSimbel",
    locationKey: "destinations.locations.aswan",
    image: "Abu Simbel.jpg",
    tagKey: "destinations.tags.ancientTemple",
    rating: 5,
    reviews: "4.8k"
  },
  {
    id: 6,
    titleKey: "destinations.places.karnakTemple",
    locationKey: "destinations.locations.luxor",
    image: "karnak.jpg",
    tagKey: "destinations.tags.historicalSite",
    rating: 5,
    reviews: "4.6k"
  }
];

const Destinations = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-kemet-dark to-kemet-medium">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('destinations.title')}
          </h1>
          <p className="text-xl text-kemet-light max-w-2xl mx-auto">
            {t('destinations.subtitle')}
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
                  alt={t(destination.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-kemet-dark/80 text-white text-xs px-3 py-1 rounded-full">
                  {t(destination.tagKey)}
                </div>
              </div>
              <div className="p-6 text-white">
                <div className="flex items-center gap-1 text-kemet-light mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{t(destination.locationKey)}</span>
                </div>
                <h3 className="font-bold text-xl mb-3">{t(destination.titleKey)}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(destination.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm">({destination.reviews} {t('destinations.reviews')})</span>
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