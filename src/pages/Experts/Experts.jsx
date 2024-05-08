import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import styles from "./Experts.module.css";
import {requests} from '../../requests/requests';

export default function Experts() {
  const [products, setProducts] = useState();
  const [audioSrc, setAudioSrc] = useState('');
  const [rating, setRating] = useState(null);

  useEffect(() => {
    requests.getWord().then(res => {
      setProducts(res.data[0].text);
    });
  }, []);

  const fetchAudio = async () => {
    try {
      const response = await axios.get('url-to-your-audio-file.mp3'); // Replace 'url-to-your-audio-file.mp3' with the actual URL of your audio file
      setAudioSrc(URL.createObjectURL(new Blob([response.data])));
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  const handleRating = (value) => {
    if (rating === value) {
      // If the same rating is clicked again, deselect it
      setRating(null);
    } else {
      // Otherwise, set the rating to the clicked value
      setRating(value);
      // Send rating information to backend
      sendRatingToBackend(value);
    }
  };

  const sendRatingToBackend = (value) => {
    fetch('your-backend-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rating: value })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send rating to backend');
      }
      console.log('Rating sent successfully');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const playSound = () => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  return (
    <div className={styles.container}>
      <div className={styles.word}>
        <p>{products}</p>
        <audio src="https://upcdn.io/W142hJk/audio/example.mp3" preload='auto' controls></audio>
        <div>
          <button 
            className={rating === 'right' ? 'selected' : ''}
            onClick={() => handleRating('right')}
          >
            Correct with tajwid
          </button>
          <button 
            className={rating === 'without_tajwid' ? 'selected' : ''}
            onClick={() => handleRating('without_tajwid')}
          >
            Correct without tajwid
          </button>
          <button 
            className={rating === 'wrong' ? 'selected' : ''}
            onClick={() => handleRating('wrong')}
          >
            Wrong
          </button>
        </div>
      </div>
    </div>
  );
}
