import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, DollarSign, Clock, MapPin } from "lucide-react";

interface TripPlan {
  city: string;
  days: number;
  plan: {
    date: string;
    day: number;
    entries: {
      activity: string;
      place_name: string;
      time: string;
      notes: string;
    }[];
  }[];
}

const TripPlanner = () => {
  const { t } = useTranslation();
  const [query, setquery] = useState('');
  const [budget, setBudget] = useState('comfort');
  const [start, setStart] = useState('');
  const [days, setDays] = useState(1);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5555/trip_planner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          budget,
          start,
          days
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate trip plan');
      }

      const data = await response.json();
      console.log('Trip plan response:', data); // Debug log
      console.log('Number of days in plan:', data.plan?.length); // Debug log for plan length
      setTripPlan(data);
    } catch (error) {
      console.error('Error fetching trip plan:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">{t('tripPlanner.title', 'Trip Planner')}</h1>
          <p className="text-gray-600 mb-8">
            {t('tripPlanner.subtitle', 'Plan your perfect Egyptian adventure with our AI-powered trip planner')}
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('tripPlanner.preferences', 'Your Preferences')}
                    </label>
                    <textarea
                      id="preferences"
                      value={query}
                      onChange={(e) => setquery(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                      rows={4}
                      placeholder={t('tripPlanner.preferencesPlaceholder', 'Tell us about your interests, must-see places, and any specific requirements...')}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('tripPlanner.budget', 'Budget')}
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                          id="budget"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                          required
                        >
                          <option value="shoestring">{t('tripPlanner.budgetShoestring', 'Shoestring')}</option>
                          <option value="comfort">{t('tripPlanner.budgetComfort', 'Comfort')}</option>
                          <option value="luxury">{t('tripPlanner.budgetLuxury', 'Luxury')}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('tripPlanner.startDate', 'Start Date')}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="date"
                          id="startDate"
                          value={start}
                          onChange={(e) => setStart(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('tripPlanner.days', 'Number of Days')}
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="number"
                          id="days"
                          value={days}
                          onChange={(e) => setDays(Math.max(1, parseInt(e.target.value)))}
                          min="1"
                          max="30"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-kemet-dark text-white py-3 px-4 rounded-md hover:bg-kemet-dark/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t('tripPlanner.generating', 'Generating Plan...')}
                      </>
                    ) : (
                      <>
                        <MapPin className="w-5 h-5" />
                        {t('tripPlanner.generate', 'Generate Trip Plan')}
                      </>
                    )}
                  </button>
                </form>

                {tripPlan && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">{t('tripPlanner.yourPlan', 'Your Trip Plan')}</h2>
                    <div className="space-y-6">
                      {tripPlan.plan && tripPlan.plan.map((day: any, index: number) => {
                        console.log('Rendering day:', index + 1, day); // Debug log for each day
                        return (
                          <div key={day.date} className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-2">
                              {t('tripPlanner.day', 'Day')} {day.day} - {day.date}
                            </h3>
                            <div className="space-y-4">
                              {day.entries && day.entries.map((entry: any, entryIndex: number) => (
                                <div key={entryIndex} className="flex gap-4">
                                  <div className="w-20 text-sm text-gray-500">{entry.time}</div>
                                  <div>
                                    <h4 className="font-medium">{entry.activity} - {entry.place_name}</h4>
                                    <p className="text-sm text-gray-600">{entry.notes}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4">{t('tripPlanner.about', 'About Trip Planner')}</h2>
              <p className="text-gray-700 mb-4">
                {t('tripPlanner.aboutDescription', 'Our AI-powered trip planner creates personalized itineraries based on your preferences, budget, and travel dates. Get the most out of your Egyptian adventure with carefully curated activities and recommendations.')}
              </p>
              <div className="bg-kemet-lightest p-4 rounded-lg">
                <h3 className="font-medium mb-2">{t('tripPlanner.tips', 'Tips for best results:')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>{t('tripPlanner.tip1', 'Be specific about your interests and must-see places')}</li>
                  <li>{t('tripPlanner.tip2', 'Consider the weather and season when planning your trip')}</li>
                  <li>{t('tripPlanner.tip3', 'Include any accessibility requirements or special needs')}</li>
                  <li>{t('tripPlanner.tip4', 'Mention if you prefer guided tours or independent exploration')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TripPlanner;