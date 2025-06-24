import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profileImage: "/images/profile/user-avatar.jpg",
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage
        const storedUserData = localStorage.getItem('userData');
        if (!storedUserData) {
          navigate("/login");
          return;
        }

        const userData = JSON.parse(storedUserData);
        const email = userData.email;
        if (!email) {
          navigate("/login");
          return;
        }

        const response = await fetch(`http://localhost:5555/api/profile?email=${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        if (data.status === "ok" && data.user) {
          // Split username into first and last name
          const nameParts = data.user.username.split(" ");
          setFormData({
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            email: data.user.email,
            phone: data.user.phone || "",
            location: data.user.location || "",
            bio: "", // Add bio field to backend if needed
            profileImage: "/images/profile/user-avatar.jpg",
          });
        }
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        // Here you would normally upload the image to storage
        // For demo, we're just creating a local URL
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          profileImage: imageUrl,
        }));
        setIsUploading(false);
      }, 1500);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    
    try {
      const storedUserData = localStorage.getItem('userData');
      if (!storedUserData) {
        throw new Error("User data not found");
      }

      const userData = JSON.parse(storedUserData);
      const email = userData.email;
      if (!email) {
        throw new Error("User email not found");
      }

      // Combine first and last name for username
      const username = `${formData.firstName} ${formData.lastName}`.trim();

      const response = await fetch("http://localhost:5555/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          location: formData.location,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      if (data.status === "ok") {
        // Update the stored user data with the new information
        const updatedUserData = {
          ...userData,
          username: username,
          location: formData.location,
          phone: formData.phone,
        };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        navigate("/profile");
      } else {
        throw new Error(data.error || "Failed to update profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center">Loading...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Edit Profile</h1>
              <p className="text-gray-600">Update your personal information</p>
            </div>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                {error}
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <form onSubmit={handleSubmit}>
                {/* Profile Picture */}
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium mb-4">Profile Picture</h2>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 bg-gray-200 flex items-center justify-center">
                        {formData.profileImage ? (
                          <img
                            src={formData.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-400">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="file"
                        id="profile-image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <label 
                        htmlFor="profile-image"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        Change Photo
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Personal Information */}
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium mb-4">Personal Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          id="firstName"
                          name="firstName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          id="lastName"
                          name="lastName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                        value={formData.email}
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        id="location"
                        name="location"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kemet-medium"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="p-6 bg-gray-50 flex justify-end gap-3">
                  <Link
                    to="/profile"
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </Link>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-kemet-dark hover:bg-kemet-dark/90 text-white rounded-md font-medium"
                    disabled={isSaving || isUploading}
                  >
                    {isSaving ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;
