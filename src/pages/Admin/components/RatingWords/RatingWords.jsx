import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './RatingWords.module.css';
import { requests } from '../../../../components/Services/Requests';

export default function RatingWords() {
  const [products, setProducts] = useState(''); // Initialize with an empty string
  const [audioSrc, setAudioSrc] = useState('');
  const [rating, setRating] = useState(null);

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
            className={rating === 'right' ? styles.selected : ''} 
            onClick={() => handleRating('right')}>
            Correct with tajwid
          </button>
          <button  
            className={rating === 'without_tajwid' ? styles.selected : ''} 
            onClick={() => handleRating('without_tajwid')}>
            Correct without tajwid
          </button>
          <button  
            className={rating === 'wrong' ? styles.selected : ''} 
            onClick={() => handleRating('wrong')}>
            Wrong
          </button>
        </div>
      </div>
    </div>
  );
}
