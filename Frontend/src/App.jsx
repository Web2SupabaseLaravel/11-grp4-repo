import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantPage from "./pages/Restaurant";
import Reservation from "./pages/Reservation";
import Confirmed from "./pages/Confirmed";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminUsers from "./admin/AdminUsers";
import AdminRestaurants from "./admin/AdminRestaurants";
import AdminReservations from "./admin/AdminReservations";
import AdminStatus from "./admin/AdminStatus";
import AdminReports from "./admin/AdminReports";
import UsersSignUp from "./pages/UsersSignUp";
import ProtectedRoute from "./ProtectedRoute";
import AdminNavbar from "./components/AdminNavbar";



// هون لازم نربطهم بالداتا تبعت المطاعم بعدها الادمن بده يعدل عليهم راح نربطهم بالصفحة تبعته
const IstanbulRestaurants = [
  { id: 2, name: "Nusr-Et Steakhouse", city: "Istanbul", rating: 4, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "360 Istanbul", city: "Istanbul", rating: 4, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Sunset Grill & Bar", city: "Istanbul", rating: 4, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" },
];

const ElazigRestaurants = [
  { id: 1, name: "Saray Sofrası", city: "Elazig", rating: 4.5, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Pelit Bakery", city: "Elazig", rating: 4, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Yozgat Mangal", city: "Elazig", rating: 3.8, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Zeytin Dalı", city: "Elazig", rating: 4.2, image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80" },
];

const AnkaraRestaurants = [
  { id: 1, name: "Tunali Hilmi Caddesi", city: "Ankara", rating: 4.8, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Divan Ankara", city: "Ankara", rating: 4.6, image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Beymen Brasserie", city: "Ankara", rating: 4.4, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Mezzaluna", city: "Ankara", rating: 4.7, image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80" },
];

const IzmirRestaurants = [
  { id: 1, name: "Asansör Restaurant", city: "Izmir", rating: 4.9, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Kordon Yokuşu", city: "Izmir", rating: 4.5, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "İzmir Balıkçısı", city: "Izmir", rating: 4.2, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Café de Paris", city: "Izmir", rating: 4.8, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" },
];

const cityRestaurantMap = {
  istanbul: IstanbulRestaurants,
  ankara: AnkaraRestaurants,
  izmir: IzmirRestaurants,
  elazig: ElazigRestaurants,
};

const App = () => {
    const isAdmin = false;  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/signup" element={<UsersSignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservation" element={<Reservation restaurantLayoutImage="/table.png" />} />
        <Route path="/confirmed" element={<Confirmed />} />
        <Route path="/istanbul" element={<Restaurants headerTitle="Istanbul Restaurants" restaurants={IstanbulRestaurants} />} />
        <Route path="/ankara" element={<Restaurants headerTitle="Ankara Restaurants" restaurants={AnkaraRestaurants} />} />
        <Route path="/izmir" element={<Restaurants headerTitle="Izmir Restaurants" restaurants={IzmirRestaurants} />} />
        <Route path="/elazig" element={<Restaurants headerTitle="Elazig Restaurants" restaurants={ElazigRestaurants} />} />
        <Route path="/restaurant/:city/:id" element={<RestaurantPage cityRestaurantMap={cityRestaurantMap} />} />
        
        
        <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={["admin"]}>
        <AdminUsers />
        </ProtectedRoute>
         } />




        <Route path="/admin/restaurants" element={
        <ProtectedRoute allowedRoles={["admin"]}>
        <AdminRestaurants />
        </ProtectedRoute>
         } />




        <Route path="/admin/reservations" element={
        <ProtectedRoute allowedRoles={["admin"]}>
        <AdminReservations />
        </ProtectedRoute>
         } />


        
        <Route path="/admin/status" element={
        <ProtectedRoute allowedRoles={["admin"]}>
        <AdminStatus />
        </ProtectedRoute>
         } />



        <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={["admin"]}>
        <AdminReports />
        </ProtectedRoute>
         } />



        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
