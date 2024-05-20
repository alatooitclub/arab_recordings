import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './RatingWords.module.css';
import { requests } from '../../../../components/Services/Requests';
import { useLang } from "../../../../hooks/useLang";
import { setLang } from "../../../../contexts/lang";

export default function RatingWords() {
  const [products, setProducts] = useState(''); // Initialize with an empty string
  const [audioSrc, setAudioSrc] = useState('');
  const [rating, setRating] = useState(null);

  const { lang, translations } = useLang();

  const handleSwitchLang = (lang) => {
      setLang(lang);
      localStorage.setItem("lang", JSON.stringify(lang));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await requests.getWord();
        setProducts(res.data[0].text);
        await fetchAudio(res.data[0].text); // Assuming you need the word to fetch the audio
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const fetchAudio = async (word) => {
    try {
      const response = await axios.get(`https://your-api-url.com/audio/${word}`);
      setAudioSrc(URL.createObjectURL(new Blob([response.data], { type: 'audio/mp3' })));
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  const handleRating = (value) => {
    if (rating === value) {
      setRating(null);
    } else {
      setRating(value);
      sendRatingToBackend(value);
    }
  };

  const sendRatingToBackend = async (value) => {
    try {
      const response = await fetch('your-backend-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: value })
      });
      if (!response.ok) throw new Error('Failed to send rating to backend');
      console.log('Rating sent successfully');
    } catch (error) {
      console.error('Error sending rating:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.word}>
        <p>{products}</p>
        <audio src={audioSrc} controls preload="auto"></audio>
        <div>
          <button  
            className={`${styles.button} ${rating === 'right' ? styles.selected : ''} ${styles.correctWithTajwid}`} 
            onClick={() => handleRating('right')}>
            {translations[lang].super_admin.rating.correctW}
          </button>
          <button  
            className={`${styles.button} ${rating === 'without_tajwid' ? styles.selected : ''} ${styles.correctWithoutTajwid}`} 
            onClick={() => handleRating('without_tajwid')}>
            {translations[lang].super_admin.rating.correctWO}
          </button>
          <button  
            className={`${styles.button} ${rating === 'wrong' ? styles.selected : ''} ${styles.wrong}`} 
            onClick={() => handleRating('wrong')}>
            {translations[lang].super_admin.rating.wrong}
          </button>
        </div>
      </div>
    </div>
  );
}
