import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Parts from "./pages/Parts";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminBookings from "./pages/AdminBookings";
import AdminParts from "./pages/adminParts";
import AdminMechanics from "./pages/AdminMechanic";
import Verify from "./pages/Verify";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectRoute";
import adminLogin from "./pages/AdminLogin";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home/>} />

        <Route path="/login" element={<Login/>} />

        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />

        <Route path="/bookings" element={<ProtectedRoute><Bookings/></ProtectedRoute>} />

        <Route path="/services" element={<Services/>} />

        <Route path="/contact" element={<Contact/>} />

        <Route path="/parts" element={<Parts/>} />

        <Route path="/register" element={<Register/>} />

        <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>} />

        <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>} />

        
        <Route path="/admin/adminBookings" element={<ProtectedRoute><AdminBookings/></ProtectedRoute>} />

        <Route path="/admin/parts" element={<ProtectedRoute><AdminParts/></ProtectedRoute>} />

        <Route path="/admin/mechanic" element={<ProtectedRoute><AdminMechanics/></ProtectedRoute>} /> 

        <Route path="/verify" element={<ProtectedRoute><Verify/></ProtectedRoute>} /> 

        <Route path="*" element={<NotFound />} /> 



      </Routes>
    </BrowserRouter>
  );
}

export default App;