
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-kemet-dark">404</h1>
            <p className="text-2xl font-medium text-gray-600 mt-4">Page Not Found</p>
          </div>
          
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 rounded-md bg-kemet-dark hover:bg-kemet-dark/90 text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
              <path d="m9 18 6-6-6-6"/>
            </svg>
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
