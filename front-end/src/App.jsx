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
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/AdminRoute";



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

        <Route path="/Admin" element={<AdminRoute><Admin/></AdminRoute>} />

        <Route path="/adminLogin" element={<AdminLogin/>} />

        <Route path="/admin/adminBookings" element={<AdminRoute><AdminBookings/></AdminRoute>} />

        <Route path="/admin/parts" element={<AdminRoute><AdminParts/></AdminRoute>} />

        <Route path="/admin/mechanic" element={<AdminRoute><AdminMechanics/></AdminRoute>} /> 

        <Route path="/verify" element={<ProtectedRoute><Verify/></ProtectedRoute>} /> 

        <Route path="*" element={<NotFound />} /> 



      </Routes>
    </BrowserRouter>
  );
}

export default App;