import axios from 'axios';

// Базовый URL вашего API
const BASE_URL = 'https://arabrecordingsback-production.up.railway.app/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getWord = async () => {
  try {
    const response = await api.get('/words/random');
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch word:', error);
    throw error;
  }
};

const postRating = async (ratingData) => {
  try {
    const response = await api.post('/ratings', ratingData);
    return response.data;
  } catch (error) {
    console.error('Failed to post rating:', error);
    throw error;
  }
};

// Экспорт функций для использования в компонентах
export const requests = {
  getWord,
  postRating
};
