import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      // If no user data is found, redirect to login
      navigate('/login');
      return;
    }
    setUserData(JSON.parse(storedUserData));
  }, [navigate]);

  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kemet-dark"></div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format the join date
  const formattedJoinDate = userData.join_date 
    ? new Date(userData.join_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Not available';

  // Mock data for activities and saved places (you can replace these with real data later)
  const mockData = {
    recentActivities: [
      { id: 1, type: "visit", location: "Pyramids of Giza", date: "2023-05-15" },
      { id: 2, type: "chat", question: "Tell me about the Valley of Kings", date: "2023-05-12" },
      { id: 3, type: "scan", item: "Hieroglyphics at Luxor Temple", date: "2023-05-10" },
      { id: 4, type: "visit", location: "Egyptian Museum", date: "2023-05-05" },
    ],
    savedPlaces: [
      { id: 1, name: "Abu Simbel", type: "Temple", image: "/images/gallery/abu-simbel.jpg" },
      { id: 2, name: "Valley of the Kings", type: "Archaeological Site", image: "/images/gallery/valley-of-kings.jpg" },
      { id: 3, name: "Khan el-Khalili", type: "Market", image: "/images/places/khan-el-khalili.jpg" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-kemet-medium to-kemet-dark rounded-lg p-6 mb-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {userData.username}
                  </h1>
                  <div className="flex flex-col md:flex-row gap-y-1 md:gap-x-4 text-white/80 text-sm mb-4">
                    <div className="flex items-center justify-center md:justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{userData.location || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Joined {formattedJoinDate}</span>
                    </div>
                  </div>
                  <Link 
                    to="/profile/edit"
                    className="inline-flex items-center px-3 py-1.5 border-2 border-white text-white hover:bg-white/20 rounded-md text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Tabs Navigation */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex flex-wrap -mb-px">
                <button
                  className={`mr-2 py-2 px-4 font-medium text-sm border-b-2 ${
                    activeTab === "profile"
                      ? "border-kemet-dark text-kemet-dark"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </button>
                <button
                  className={`mr-2 py-2 px-4 font-medium text-sm border-b-2 ${
                    activeTab === "activity"
                      ? "border-kemet-dark text-kemet-dark"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("activity")}
                >
                  Activity
                </button>
                <button
                  className={`mr-2 py-2 px-4 font-medium text-sm border-b-2 ${
                    activeTab === "saved"
                      ? "border-kemet-dark text-kemet-dark"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("saved")}
                >
                  Saved Places
                </button>
                <button
                  className={`mr-2 py-2 px-4 font-medium text-sm border-b-2 ${
                    activeTab === "settings"
                      ? "border-kemet-dark text-kemet-dark"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  Settings
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "profile" && (
                <div>
                  <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-1">
                        <h3 className="text-sm text-gray-500">Username</h3>
                        <p className="font-medium">{userData.username}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm text-gray-500">Email</h3>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm text-gray-500">Phone</h3>
                        <p className="font-medium">{userData.phone || 'Not specified'}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm text-gray-500">Location</h3>
                        <p className="font-medium">{userData.location || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "activity" && (
                <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold">Recent Activity</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {mockData.recentActivities.map((activity) => (
                      <div key={activity.id} className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-kemet-light/20">
                            {activity.type === 'visit' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-kemet-dark">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                            )}
                            {activity.type === 'chat' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-kemet-dark">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                            )}
                            {activity.type === 'scan' && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-kemet-dark">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                              </svg>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {activity.type === 'visit' && `Visited ${activity.location}`}
                              {activity.type === 'chat' && `Asked about: ${activity.question}`}
                              {activity.type === 'scan' && `Scanned: ${activity.item}`}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === "saved" && (
                <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold">Saved Places</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                    {mockData.savedPlaces.map((place) => (
                      <div 
                        key={place.id} 
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="h-36 overflow-hidden bg-gray-200 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-gray-400">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium">{place.name}</h3>
                          <p className="text-sm text-gray-500">{place.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === "settings" && (
                <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold">Account Settings</h2>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">Settings panel coming soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
