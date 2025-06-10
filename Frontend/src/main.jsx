// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantPage from './pages/Restaurant';
import AdminRestaurants from './admin/AdminRestaurants';
import AddRestaurant from './admin/AddRestaurant';
import EditRestaurant from './admin/EditRestaurant';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants/:city" element={<Restaurants />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} />
      <Route path="/admin/restaurants" element={<AdminRestaurants />} />
     <Route path="/admin/restaurants/add" element={<AddRestaurant />} />
<Route path="/admin/restaurants/edit/:id" element={<EditRestaurant />} />
    </Routes>
  </BrowserRouter>
);
