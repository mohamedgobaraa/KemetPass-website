import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Upload, X, MapPin } from "lucide-react";

const WhereAmI = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ location: string; description: string; confidence: number } | null>(null);
  const { t } = useTranslation();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', image);

      const response = await fetch('http://localhost:5555/predict_where_im', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      setResult({
        location: data.place,
        description: t('whereAmI.result.description'),
        confidence: 0.95
      });
    } catch (error) {
      console.error('Upload failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kemet-dark to-kemet-medium">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('whereAmI.title')}
          </h1>
          <p className="text-xl text-kemet-light mb-12">
            {t('whereAmI.subtitle')}
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div className="aspect-square max-w-md mx-auto bg-white/5 rounded-lg flex items-center justify-center">
                {preview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={preview}
                      alt={t('whereAmI.imagePreview')}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-24 h-24 mx-auto mb-4 text-kemet-light" />
                    <p className="text-kemet-light mb-4">
                      {t('whereAmI.uploadPrompt')}
                    </p>
                    <label className="inline-block px-6 py-3 bg-kemet-accent text-white rounded-lg cursor-pointer hover:bg-kemet-accent/90 transition-colors">
                      {t('whereAmI.uploadButton')}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {image && !result && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full py-3 bg-kemet-accent text-white rounded-lg hover:bg-kemet-accent/90 transition-colors disabled:opacity-50"
                >
                  {uploading ? t('whereAmI.uploading') : t('whereAmI.analyze')}
                </button>
              )}

              {result && (
                <div className="mt-8 p-6 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-kemet-accent mr-2" />
                    <h3 className="text-xl font-semibold text-white">
                      {result.location}
                    </h3>
                  </div>
                  <p className="text-kemet-light mb-4">
                    {result.description}
                  </p>
                  <div className="text-sm text-kemet-light">
                    {t('whereAmI.confidence', { value: (result.confidence * 100).toFixed(0) })}
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

export default WhereAmI;
