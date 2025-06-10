// services/restaurants.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/manager';

// جلب كل المطاعم
export const getAllRestaurants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants`);
    return response.data;
  } catch (error) {
    console.error('فشل في جلب المطاعم:', error);
    return [];
  }
};

// جلب مطعم واحد حسب المعرف
export const getRestaurantById = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('فشل في جلب بيانات المطعم:', error);
    throw error;
  }
};

// إضافة مطعم جديد
export const addRestaurant = async (restaurantData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/restaurants`, restaurantData);
    return response.data;
  } catch (error) {
    console.error('فشل في إضافة المطعم:', error);
    throw error;
  }
};

// تحديث مطعم
export const updateRestaurant = async (restaurantId, restaurantData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/restaurants/${restaurantId}`, restaurantData);
    return response.data;
  } catch (error) {
    console.error('فشل في تحديث المطعم:', error);
    throw error;
  }
};

// حذف مطعم
export const deleteRestaurant = async (restaurantId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/restaurants/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('فشل في حذف المطعم:', error);
    throw error;
  }
};
