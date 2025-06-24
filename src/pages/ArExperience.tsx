import { useTranslation } from 'react-i18next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Info } from "lucide-react";

const ArExperience = () => {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(true);

  const monuments = [
    {
      id: 1,
      name: "Great Pyramid of Giza",
      image: "Great Pyramid of Giza.jpg",
      model: "/models/pyramid.glb",
    },
    {
      id: 2,
      name: "Sphinx",
      image: "Sphinx.jpg",
      model: "/models/sphinx.glb",
    },
    {
      id: 3,
      name: "Tutankhamun Mask",
      image: "Tutankhamun Mask.jpg",
      model: "/models/tutmask.glb",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-kemet-dark to-kemet-medium">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('arExperience.title')}
          </h1>
          <p className="text-xl text-kemet-light mb-12">
            {t('arExperience.subtitle')}
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
            <div className="aspect-square max-w-md mx-auto mb-8 bg-white/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-24 h-24 mx-auto mb-4 text-kemet-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-white text-lg">{t('arExperience.scan')}</p>
              </div>
            </div>

            <p className="text-kemet-light mb-8">
              {t('arExperience.instructions')}
            </p>

            <button className="bg-kemet-dark hover:bg-kemet-dark/80 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              {t('arExperience.start')}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArExperience;
