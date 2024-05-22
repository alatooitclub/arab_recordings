import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Experts.module.css';
import { requests } from '../../components/Services/Requests';

export default function RatingWords() {
  const [products, setProducts] = useState(''); 
  const [audioSrc, setAudioSrc] = useState('');
  const [rating, setRating] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  

  const ComplaintButton = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
  
    const handleComplaintSubmit = async () => {
      try {
        const res = await axios.post('https://your-backend-url.com/complaints', {
          complaint: 'This is a predefined complaint message.',
        });
        setResponse(res.data);
      } catch (err) {
        setError(err.message);
      }
    };}
  const handleDeleteItem = () => {
    
    axios.delete(`your_api_endpoint/${itemToDelete}`)
      .then(response => {
        
        console.log('Item deleted successfully!');
      })
      .catch(error => {
        
        console.error('Error deleting item:', error);
      });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await requests.getWord();
        setProducts(res.data[0].text);
        await fetchAudio(res.data[0].text); 
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
            Correct with tajwid
          </button>
          <button  
            className={`${styles.button} ${rating === 'without_tajwid' ? styles.selected : ''} ${styles.correctWithoutTajwid}`} 
            onClick={() => handleRating('without_tajwid')}>
            Correct without tajwid
          </button>
          <button  
            className={`${styles.button} ${rating === 'wrong' ? styles.selected : ''} ${styles.wrong}`} 
            onClick={() => handleRating('wrong')}>
            Wrong
          </button>
          <div><button className={styles.nav} >&lt;=</button>
            <button className={styles.nav} >=&gt;</button></div>
            <div>
            <button className={styles.del} onClick={() => handleDeleteItem}>Delete</button>
            <button className={styles.del} onClick={() => handleComplaintSubmit }>Complain</button>
            </div>
         
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}
