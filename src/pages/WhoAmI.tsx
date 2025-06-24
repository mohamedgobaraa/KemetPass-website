import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Upload, X, User } from "lucide-react";

const WhoAmI = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ 
    name: string; 
    title: string;
    period: string;
    description: string;
    confidence: number 
  } | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResult(null);
      setUploading(true);
      
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:5555/who_am_i', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to analyze image');
        }

        const data = await response.json();
        
        // Create a URL for the image preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Format the response data
        setResult({
          name: data.person,
          title: "Historical Figure", // You might want to add this to the backend response
          period: "Ancient Egypt", // You might want to add this to the backend response
          description: "A significant figure from ancient Egyptian history.", // You might want to add this to the backend response
          confidence: 95 // You might want to add this to the backend response
        });
      } catch (error) {
        console.error('Upload failed:', error);
        // You might want to show an error message to the user here
      } finally {
        setUploading(false);
      }
    }
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">Who Am I?</h1>
          <p className="text-gray-600 mb-8">
            Upload a photo of an ancient Egyptian figure, statue, or painting to identify historical personalities
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                {!selectedImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-kemet-medium transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="mx-auto w-20 h-20 bg-kemet-lightest rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-8 w-8 text-kemet-dark" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Upload Historical Figure Image</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Take a photo of a statue, carving, painting or upload from your gallery
                      </p>
                      <button 
                        className="bg-kemet-medium hover:bg-kemet-dark text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Select Image
                      </button>
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="relative mb-6">
                      <img
                        src={selectedImage}
                        alt="Uploaded figure"
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <button
                        onClick={resetUpload}
                        className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {uploading ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 border-4 border-kemet-light border-t-kemet-dark rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Analyzing historical figure...</p>
                      </div>
                    ) : result ? (
                      <div className="bg-kemet-lightest p-6 rounded-lg">
                        <div className="flex items-start gap-3 mb-4">
                          <User className="h-6 w-6 text-kemet-dark flex-shrink-0 mt-1" />
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                              <div>
                                <h3 className="text-xl font-bold">{result.name}</h3>
                                <p className="text-sm text-gray-600">{result.title} | {result.period}</p>
                              </div>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                                  <path d="m5 12 5 5L20 7"></path>
                                </svg>
                                {result.confidence.toFixed(1)}% match
                              </span>
                            </div>
                            
                            <p className="text-gray-700 mb-4">{result.description}</p>
                            
                            <div className="flex flex-wrap gap-2">
                              <button 
                                className="bg-kemet-dark hover:bg-kemet-dark/90 text-white px-3 py-1.5 rounded-md text-sm inline-flex items-center gap-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="8" x2="12" y2="16"></line>
                                  <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                                View Full Biography
                              </button>
                              <button 
                                className="border border-kemet-dark text-kemet-dark hover:bg-kemet-dark/10 px-3 py-1.5 rounded-md text-sm inline-flex items-center gap-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                  <path d="M3 12h18"></path>
                                  <path d="M3 6h18"></path>
                                  <path d="M3 18h18"></path>
                                </svg>
                                View Timeline
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4 pt-4 border-t border-kemet-medium/20">
                          <button
                            onClick={resetUpload}
                            className="border border-kemet-dark text-kemet-dark hover:bg-kemet-dark hover:text-white px-4 py-2 rounded-md transition-colors"
                          >
                            Identify Another Figure
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4">About "Who Am I?"</h2>
              <p className="text-gray-700 mb-4">
                Our AI has been trained on thousands of images of ancient Egyptian pharaohs, nobles, deities, and historical figures. It can identify faces and figures from statues, carvings, paintings, and reliefs, helping you learn about the people depicted in ancient Egyptian art.
              </p>
              <div className="bg-kemet-lightest p-4 rounded-lg">
                <h3 className="font-medium mb-2">Tips for best results:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Focus on the face or distinctive features of the figure</li>
                  <li>Ensure good lighting and clear visibility of details</li>
                  <li>Try to minimize reflections when photographing museum exhibits</li>
                  <li>Include iconography and symbols associated with the figure if possible</li>
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

export default WhoAmI;
