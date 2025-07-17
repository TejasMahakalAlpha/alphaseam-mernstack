import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';



// Public Pages
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import Career from './Pages/Career';
import About from './Pages/About';
import Blog from './Pages/Blog';

// Admin Pages (make sure all these files are in Pages/admin/)
import AdminLogin from './Pages/admin/AdminLogin';
import Dashboard from './Pages/admin/Dashboard';
import ManageBlogs from './Pages/admin/ManageBlogs';
import ManageCareers from './Pages/admin/ManageCareers';
import ManageContacts from './Pages/admin/ManageContacts';
import ManageServices from './Pages/admin/ManageServices';
import ManageResumes from './Pages/admin/ManageResumes';

// Protected route wrapper
import ProtectedRoute from './routes/ProtectedRoute';

const ScrollToTopWrapper = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTopWrapper>
      

        <Routes>
          {/* ---------- Public Routes ---------- */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Header />
                <Services />
                <Footer />
              </>
            }
          />
          <Route
            path="/career"
            element={
              <>
                <Header />
                <Career />
                <Footer />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <Header />
                <Blog />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            }
          />

          {/* ---------- Admin Routes ---------- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-blogs"
            element={
              <ProtectedRoute>
                <ManageBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-careers"
            element={
              <ProtectedRoute>
                <ManageCareers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-contacts"
            element={
              <ProtectedRoute>
                <ManageContacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-services"
            element={
              <ProtectedRoute>
                <ManageServices />
              </ProtectedRoute>
            }
          /> 
  <Route path="/admin/resumes" element={<ManageResumes />} />

        </Routes>
      </ScrollToTopWrapper>
    </Router>
  );
}

export default App;
