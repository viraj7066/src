import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Options from './components/Options';
import Services from './components/Services';
import Milestones from './components/Milestones';
import About from './components/About';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import ServicePage from './pages/ServicePage';
import Store from './pages/Store';
import Custom from './pages/Custom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import CursorFollow from './components/CursorFollow';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
 
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  // Adjust chatbot position dynamically
  useEffect(() => {
    const adjustChatbotPosition = () => {
      const chatbotButton = document.querySelector('#openwidget-chatbot');
      if (chatbotButton) {
        chatbotButton.style.bottom = '90px'; // Align properly
        chatbotButton.style.right = '16px'; // Match scrollbar
      }
    };

    const interval = setInterval(adjustChatbotPosition, 100);
    setTimeout(() => clearInterval(interval), 5000); // Stop after 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTopOnMount />
          <CursorFollow />
          <Toaster position="top-right" />
          <main className="min-h-screen bg-white">
            <Navbar />
            <Routes>
            
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <Options />
                    <Services />
                    <Milestones />
                    <About />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services/:serviceId" element={<ServicePage />} />
              <Route path="/store" element={<Store />} />
              <Route path="/custom" element={<Custom />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <ScrollToTop />
          </main>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
