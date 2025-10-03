import ScrollToTop from "./components/Common/ScrollToTop/ScrollToTop";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import ProtectedRoute from "./components/Common/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home/Home";
import ImageUpload from "./components/ImageMemory/ImageUpload";

// Import new pages
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Activities from "./pages/Activities/Activities";
import News from "./pages/News/News";
import Destination from "./pages/Destination/Destination";
import TourListings from "./pages/TourListings/TourListings";
import TourDetail from "./pages/TourDetail/TourDetail";
import BookNow from "./pages/BookNow/BookNow";
import TermsConditionsPage from "./pages/TermsConditions/TermsConditions";
import PrivacyPolicyPage from "./pages/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "./pages/refundPolicy/refundPolicy";

// User pages
import Profile from "./pages/Profile/Profile";
import Packages from "./pages/Packages/Packages";
import PackageDetail from "./pages/Packages/PackageDetail";

// Demo pages
import AdminDemo from "./pages/AdminDemo/AdminDemo";
import LatestPackages from "./pages/LatestPackages/LatestPackages";
import Demo from "./pages/Demo/Demo";

// New Travel App pages
import TravelAdmin from "./pages/TravelAdmin/TravelAdmin";
import TravelPackages from "./pages/TravelPackages/TravelPackages";

function App() {
  return (
    <AuthProvider>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<ImageUpload />} />

        {/* New Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/news" element={<News />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/tour-listings" element={<TourListings />} />
        <Route path="/tour/:tourId" element={<TourDetail />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/terms" element={<TermsConditionsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/refund" element={<RefundPolicy />} />

        
        {/* User Routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetail />} />

        {/* Demo Routes */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/admin-demo" element={<AdminDemo />} />
        <Route path="/latest-packages" element={<LatestPackages />} />

        {/* New Travel App Routes */}
        <Route path="/travel-admin" element={<ProtectedRoute><TravelAdmin /></ProtectedRoute>} />
        <Route path="/travel-packages" element={<TravelPackages />} />

      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;