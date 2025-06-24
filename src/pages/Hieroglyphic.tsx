import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Upload, Languages, X, Copy } from "lucide-react";

const Hieroglyphic = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    original: string;
    translation: string;
    notes: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResult(null);
      setError(null);
      
      // Create FormData and append the file
      const formData = new FormData();
      formData.append('files', file);

      setUploading(true);
      try {
        const response = await fetch('http://localhost:5555/translate_hieroglyphic', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Translation failed');
        }

        const data = await response.json();
        
        // Read the file for display
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        
        setResult({
          original: data.classes.join(' '), // Join the classes with spaces
          translation: data.translation,
          notes: "This translation is based on the identified hieroglyphic symbols in your image. The system has analyzed the symbols and provided their meaning in modern English."
        });
      } catch (err) {
        console.error('Translation error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred during translation');
      } finally {
        setUploading(false);
      }
    }
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">Hieroglyphic Translator</h1>
          <p className="text-gray-600 mb-8">
            Upload images of ancient Egyptian hieroglyphics and receive
            translations
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
                      <h3 className="text-lg font-medium mb-2">
                        Upload Hieroglyphic Image
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Take a photo of hieroglyphics or upload from your
                        gallery
                      </p>
                      <button className="bg-kemet-medium hover:bg-kemet-dark text-white px-4 py-2 rounded-md transition-colors">
                        Select Image
                      </button>
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="relative mb-6">
                      <img
                        src={selectedImage}
                        alt="Uploaded hieroglyphics"
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
                        <p className="text-gray-600">
                          Translating hieroglyphics...
                        </p>
                      </div>
                    ) : error ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                        {error}
                      </div>
                    ) : result ? (
                      <div className="bg-kemet-lightest p-6 rounded-lg">
                        <div className="flex items-start gap-3 mb-4">
                          <Languages className="h-6 w-6 text-kemet-dark flex-shrink-0 mt-1" />
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold mb-2">
                              Translation Result
                            </h3>

                            <div className="bg-white border border-kemet-medium/30 rounded-lg p-4 mb-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">
                                Original Hieroglyphics:
                              </h4>
                              <p className="text-2xl leading-relaxed font-hieroglyphic">
                                {result.original}
                              </p>
                            </div>

                            <div className="bg-white border border-kemet-medium/30 rounded-lg p-4 mb-4 relative">
                              <h4 className="text-sm font-medium text-gray-500 mb-1">
                                Translation:
                              </h4>
                              <p className="pr-8">{result.translation}</p>
                              <button
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    result.translation
                                  )
                                }
                                className="absolute top-3 right-3 text-gray-400 hover:text-kemet-dark transition-colors"
                                aria-label="Copy translation"
                              >
                                <Copy className="h-5 w-5" />
                              </button>
                            </div>

                            <div className="bg-kemet-light/20 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Scholar's Notes:
                              </h4>
                              <p className="text-sm text-gray-600">
                                {result.notes}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4">
                          <button
                            onClick={resetUpload}
                            className="border border-kemet-dark text-kemet-dark hover:bg-kemet-dark hover:text-white px-4 py-2 rounded-md transition-colors"
                          >
                            Translate Another Image
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4">
                About Hieroglyphic Translation
              </h2>
              <p className="text-gray-700 mb-4">
                The hieroglyphic writing system was used in ancient Egypt for
                over 3,500 years. It combines logographic, syllabic, and
                alphabetic elements, with a total of some 1,000 distinct
                characters. Our AI translator has been trained on thousands of
                examples of hieroglyphic texts to provide accurate translations.
              </p>
              <div className="bg-kemet-lightest p-4 rounded-lg">
                <h3 className="font-medium mb-2">Tips for best results:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Ensure the hieroglyphics are clearly visible in the image
                  </li>
                  <li>Good lighting and minimal shadows improve accuracy</li>
                  <li>
                    Try to capture complete phrases or sentences when possible
                  </li>
                  <li>
                    Avoid overlapping or damaged hieroglyphics for better
                    results
                  </li>
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

export default Hieroglyphic;
