import React, { useEffect, useState } from 'react'
import styles from './Experts.module.css'
import {requests} from '../../requests/requests'

export default function Experts() {
    const [products, setProducts] = useState();
    useEffect(() => {
        requests.getWord().then(res => {
          setProducts(res.data[0].text)          
          console.log(res.data[0].text)

        })
    }, [])

    const fetchAudio = async () => {
        try {
          const response = await axios.get('url-to-your-audio-file.mp3'); // Replace 'url-to-your-audio-file.mp3' with the actual URL of your audio file
          setAudioSrc(URL.createObjectURL(new Blob([response.data])));
        } catch (error) {
          console.error('Error fetching audio:', error);
        }
      };
      const playSound = () => {
        const audio = new Audio(audioSrc);
        audio.play();
      };
    

  return (
    <div className={styles.container}>
      <div className={styles.word}>
        <p>
            {
                products
            }
        </p>
    <audio src="https://upcdn.io/W142hJk/audio/example.mp3" preload='auto' controls></audio>
        


      </div>
    </div>
  )
}
