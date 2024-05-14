import axios from 'axios';

// Базовый URL вашего API
const BASE_URL = 'https://arabrecordingsback-production.up.railway.app/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Получение случайного слова для оценки
const getWord = async () => {
  try {
    const response = await api.get('/words/random');
    return response.data; // предполагается, что сервер возвращает данные непосредственно
  } catch (error) {
    // Обработка ошибок запроса
    console.error('Failed to fetch word:', error);
    throw error; // Переброс ошибки для дальнейшей обработки
  }
};

// Пример функции для отправки оценки
const postRating = async (ratingData) => {
  try {
    const response = await api.post('/ratings', ratingData);
    return response.data; // обработка успешного ответа
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
