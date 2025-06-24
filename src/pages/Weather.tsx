
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    icon: JSX.Element;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: JSX.Element;
  }>;
}

const Weather = () => {
  const [selectedLocation, setSelectedLocation] = useState("cairo");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const locations = [
    { id: "cairo", name: "Cairo" },
    { id: "luxor", name: "Luxor" },
    { id: "aswan", name: "Aswan" },
    { id: "alexandria", name: "Alexandria" },
    { id: "sharm", name: "Sharm El Sheikh" },
    { id: "hurghada", name: "Hurghada" },
  ];

  useEffect(() => {
    fetchWeatherData();
    // In a real app, you would set up an interval to refresh data periodically
  }, [selectedLocation]);

  const fetchWeatherData = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data
      const getIcon = (condition: string) => {
        switch(condition.toLowerCase()) {
          case "sunny":
            return (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-yellow-500">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            );
          case "partly cloudy":
            return (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-500">
                <path d="M8 2a6 6 0 1 0 11 3.5"></path>
                <path d="M18.387 5.6a9 9 0 1 0-11.278 12"></path>
                <path d="M21 16a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2z"></path>
                <path d="M8 16H5a3 3 0 0 1-3-3a3 3 0 0 1 3-3h3.5"></path>
              </svg>
            );
          case "cloudy":
            return (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-500">
                <path d="M17 5a6 6 0 0 0-10.33 4h-.34a5 5 0 0 0-4.34 7.486 5 5 0 0 0 2.449 2.338 5 5 0 0 0 2.224.176h8.674a5 5 0 0 0 4.338-7.487 5 5 0 0 0-2.449-2.338 5 5 0 0 0-2.222-.176h-.366a6 6 0 0 0 0-4z"></path>
              </svg>
            );
          case "rainy":
            return (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-500">
                <path d="M20 16.757c1.554-.651 2.5-2.158 2.5-3.757a4.494 4.494 0 0 0-4-4.472v-.628c0-2.316-1.857-4.2-4.143-4.2-1.571 0-2.953.896-3.645 2.21-.463-.131-.946-.21-1.447-.21A5.483 5.483 0 0 0 4 11.1a5.45 5.45 0 0 0 1.5 3.764"></path>
                <path d="M8 18v.01"></path>
                <path d="M8 22v.01"></path>
                <path d="M12 18v.01"></path>
                <path d="M12 22v.01"></path>
                <path d="M16 18v.01"></path>
                <path d="M16 22v.01"></path>
              </svg>
            );
          default:
            return (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-yellow-500">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            );
        }
      };
      
      const mockData: Record<string, WeatherData> = {
        cairo: {
          location: "Cairo, Egypt",
          current: {
            temp: 32,
            condition: "Sunny",
            icon: getIcon("sunny"),
            humidity: 45,
            windSpeed: 12,
            feelsLike: 34,
          },
          forecast: [
            { day: "Today", high: 32, low: 23, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Tomorrow", high: 33, low: 24, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Wed", high: 30, low: 22, condition: "Partly Cloudy", icon: getIcon("partly cloudy") },
            { day: "Thu", high: 29, low: 21, condition: "Partly Cloudy", icon: getIcon("partly cloudy") },
            { day: "Fri", high: 31, low: 22, condition: "Sunny", icon: getIcon("sunny") },
          ]
        },
        luxor: {
          location: "Luxor, Egypt",
          current: {
            temp: 38,
            condition: "Sunny",
            icon: getIcon("sunny"),
            humidity: 30,
            windSpeed: 8,
            feelsLike: 40,
          },
          forecast: [
            { day: "Today", high: 38, low: 26, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Tomorrow", high: 39, low: 27, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Wed", high: 40, low: 28, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Thu", high: 39, low: 27, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Fri", high: 37, low: 25, condition: "Sunny", icon: getIcon("sunny") },
          ]
        },
        aswan: {
          location: "Aswan, Egypt",
          current: {
            temp: 40,
            condition: "Sunny",
            icon: getIcon("sunny"),
            humidity: 25,
            windSpeed: 10,
            feelsLike: 42,
          },
          forecast: [
            { day: "Today", high: 40, low: 28, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Tomorrow", high: 41, low: 29, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Wed", high: 42, low: 30, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Thu", high: 41, low: 29, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Fri", high: 39, low: 27, condition: "Sunny", icon: getIcon("sunny") },
          ]
        },
        alexandria: {
          location: "Alexandria, Egypt",
          current: {
            temp: 28,
            condition: "Partly Cloudy",
            icon: getIcon("partly cloudy"),
            humidity: 65,
            windSpeed: 18,
            feelsLike: 30,
          },
          forecast: [
            { day: "Today", high: 28, low: 22, condition: "Partly Cloudy", icon: getIcon("partly cloudy") },
            { day: "Tomorrow", high: 27, low: 21, condition: "Partly Cloudy", icon: getIcon("partly cloudy") },
            { day: "Wed", high: 26, low: 20, condition: "Cloudy", icon: getIcon("cloudy") },
            { day: "Thu", high: 27, low: 21, condition: "Partly Cloudy", icon: getIcon("partly cloudy") },
            { day: "Fri", high: 28, low: 22, condition: "Sunny", icon: getIcon("sunny") },
          ]
        },
        sharm: {
          location: "Sharm El Sheikh, Egypt",
          current: {
            temp: 34,
            condition: "Sunny",
            icon: getIcon("sunny"),
            humidity: 50,
            windSpeed: 15,
            feelsLike: 36,
          },
          forecast: [
            { day: "Today", high: 34, low: 26, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Tomorrow", high: 33, low: 25, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Wed", high: 33, low: 25, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Thu", high: 34, low: 26, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Fri", high: 35, low: 27, condition: "Sunny", icon: getIcon("sunny") },
          ]
        },
        hurghada: {
          location: "Hurghada, Egypt",
          current: {
            temp: 33,
            condition: "Sunny",
            icon: getIcon("sunny"),
            humidity: 55,
            windSpeed: 14,
            feelsLike: 35,
          },
          forecast: [
            { day: "Today", high: 33, low: 25, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Tomorrow", high: 32, low: 24, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Wed", high: 32, low: 24, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Thu", high: 33, low: 25, condition: "Sunny", icon: getIcon("sunny") },
            { day: "Fri", high: 34, low: 26, condition: "Sunny", icon: getIcon("sunny") },
          ]
        }
      };
      
      setWeatherData(mockData[selectedLocation]);
      setLoading(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  const handleRefresh = () => {
    fetchWeatherData();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Egypt Weather Forecast</h1>
              <p className="text-gray-600">
                Real-time weather updates for popular tourist destinations
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                aria-label="Refresh weather data"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M3 2v6h6"></path>
                  <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                  <path d="M21 22v-6h-6"></path>
                  <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
                </svg>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-kemet-light border-t-kemet-dark rounded-full animate-spin"></div>
            </div>
          ) : weatherData ? (
            <div>
              <div className="bg-gradient-to-r from-kemet-medium to-kemet-dark text-white rounded-lg overflow-hidden shadow-lg mb-6">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <h2 className="text-2xl font-bold">{weatherData.location}</h2>
                      </div>
                      <p className="text-white/80 text-sm">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">{weatherData.current.temp}°C</div>
                      <div className="text-white/80">{weatherData.current.condition}</div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-red-300">
                        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
                      </svg>
                      <div>
                        <div className="text-xs text-white/70">Feels Like</div>
                        <div className="font-medium">{weatherData.current.feelsLike}°C</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-blue-300">
                        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.2 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                      </svg>
                      <div>
                        <div className="text-xs text-white/70">Humidity</div>
                        <div className="font-medium">{weatherData.current.humidity}%</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-gray-300">
                        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                        <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                        <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                      </svg>
                      <div>
                        <div className="text-xs text-white/70">Wind Speed</div>
                        <div className="font-medium">{weatherData.current.windSpeed} km/h</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-yellow-300">
                        <circle cx="12" cy="12" r="5"></circle>
                        <path d="M12 1v2"></path>
                        <path d="M12 21v2"></path>
                        <path d="M4.2 4.2l1.4 1.4"></path>
                        <path d="M18.4 18.4l1.4 1.4"></path>
                        <path d="M1 12h2"></path>
                        <path d="M21 12h2"></path>
                        <path d="M4.2 19.8l1.4-1.4"></path>
                        <path d="M18.4 5.6l1.4-1.4"></path>
                      </svg>
                      <div>
                        <div className="text-xs text-white/70">UV Index</div>
                        <div className="font-medium">High</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-bold">5-Day Forecast</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="p-4 text-center">
                      <div className="font-medium mb-2">{day.day}</div>
                      <div className="flex justify-center mb-2">{day.icon}</div>
                      <div className="text-sm">{day.condition}</div>
                      <div className="flex justify-center items-center gap-2 mt-2">
                        <div className="flex items-center text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1">
                            <path d="m18 9-6-6-6 6"></path>
                            <path d="M12 3v18"></path>
                          </svg>
                          <span>{day.high}°</span>
                        </div>
                        <div className="text-gray-300">|</div>
                        <div className="flex items-center text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1">
                            <path d="M6 15l6 6 6-6"></path>
                            <path d="M12 3v18"></path>
                          </svg>
                          <span>{day.low}°</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-kemet-lightest p-6 rounded-lg shadow-md">
                <h3 className="font-bold mb-2">Travel Weather Tips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-kemet-dark flex-shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="5"></circle>
                      <path d="M12 1v2"></path>
                      <path d="M12 21v2"></path>
                      <path d="M4.2 4.2l1.4 1.4"></path>
                      <path d="M18.4 18.4l1.4 1.4"></path>
                      <path d="M1 12h2"></path>
                      <path d="M21 12h2"></path>
                      <path d="M4.2 19.8l1.4-1.4"></path>
                      <path d="M18.4 5.6l1.4-1.4"></path>
                    </svg>
                    <span>Egypt has a hot desert climate. Summer (June-August) temperatures can exceed 40°C in Upper Egypt.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-kemet-dark flex-shrink-0 mt-0.5">
                      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.2 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                    </svg>
                    <span>Drink plenty of water when visiting sites like the pyramids or Luxor temples during peak sunshine hours.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-kemet-dark flex-shrink-0 mt-0.5">
                      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                    </svg>
                    <span>The Khamsin wind can bring sandstorms during March to May, potentially affecting outdoor activities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-kemet-dark flex-shrink-0 mt-0.5">
                      <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path>
                      <path d="M16 14v6"></path>
                      <path d="M8 14v6"></path>
                      <path d="M12 16v6"></path>
                    </svg>
                    <span>Rainfall is rare in most of Egypt, but Alexandria and the northern coast may experience some rain in winter.</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p>No weather data available. Please try refreshing or selecting a different location.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Weather;
