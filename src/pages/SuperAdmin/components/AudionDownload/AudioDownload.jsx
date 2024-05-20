import React, { useState } from 'react';
import axios from 'axios';

const AudioDownloader = () => {
    const [word, setWord] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState(null);

    // Функция для скачивания аудиозаписей по слову
    const downloadAudioByWord = async () => {
        setError(null); // Очищаем предыдущие ошибки
        try {
            const response = await axios.get('/api/audio/byWord', {
                responseType: 'blob', // Указываем, что ожидаем blob в ответе
                params: {
                    word: word
                }
            });
            // Создаем URL для Blob объекта
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // Создаем ссылку для скачивания
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'audio_files.zip'); // Имя архива для скачивания
            // Добавляем ссылку на страницу и эмулируем клик для скачивания
            document.body.appendChild(link);
            link.click();
            // Удаляем ссылку после скачивания
            link.parentNode.removeChild(link);
        } catch (err) {
            setError('Ошибка при загрузке аудиозаписей: ' + err.message);
        }
    };

    // Функция для скачивания аудиозаписей по временному интервалу
    const downloadAudioByTimeInterval = async () => {
        setError(null); // Очищаем предыдущие ошибки
        try {
            const response = await axios.get('/api/audio/byTimeInterval', {
                responseType: 'blob', // Указываем, что ожидаем blob в ответе
                params: {
                    startTime: startDate,
                    endTime: endDate
                }
            });
            // Создаем URL для Blob объекта
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // Создаем ссылку для скачивания
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'audio_files.zip'); // Имя архива для скачивания
            // Добавляем ссылку на страницу и эмулируем клик для скачивания
            document.body.appendChild(link);
            link.click();
            // Удаляем ссылку после скачивания
            link.parentNode.removeChild(link);
        } catch (err) {
            setError('Ошибка при загрузке аудиозаписей: ' + err.message);
        }
    };

    return (
        <div>
            <label>
                Слово:
                <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
            </label>
            <br />
            <label>
                Дата начала:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <br />
            <label>
                Дата конца:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <br />
            <button onClick={downloadAudioByWord}>Скачать аудио по слову</button>
            <button onClick={downloadAudioByTimeInterval}>Скачать аудио по временному интервалу</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AudioDownloader;