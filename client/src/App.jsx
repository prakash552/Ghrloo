import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/user/Home';
import Properties from './pages/user/Properties';
import PropertyDetails from './pages/user/PropertyDetails';
import About from './pages/user/About';
import Contact from './pages/user/Contact';

import AdminAuth from './pages/admin/AdminAuth';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProperty from './pages/admin/AddProperty';
import EditProperty from './pages/admin/EditProperty';
import ViewEnquiries from './pages/admin/ViewEnquiries';

function App() {
  const location = useLocation();

  // All admin routes (can be customized)
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddProperty />} />
        <Route path="/admin/edit/:id" element={<EditProperty />} />
        <Route path="/admin/enquiries" element={<ViewEnquiries />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
