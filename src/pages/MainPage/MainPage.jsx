import React, { useState, useEffect } from 'react';
import styles from './MainPage.module.css';
import { useLang } from "../../hooks/useLang";
import { setLang } from "../../contexts/lang"; 


const MainPage = () => {
    const [wordCount, setWordCount] = useState(0);
    const [recording, setRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [loadedWord, setLoadedWord] = useState('');
    const [audioURL, setAudioURL] = useState(null);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [translation, setTranslation] = useState('');

    useEffect(() => {
        const initializeMediaRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorderInstance = new MediaRecorder(stream);
                setMediaRecorder(mediaRecorderInstance);
                mediaRecorderInstance.ondataavailable = handleDataAvailable;
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            initializeMediaRecorder();
        }
    }, []);

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            setAudioChunks([...audioChunks, event.data]);
        }
    };

    const startRecording = () => {
        if (!recording && mediaRecorder && mediaRecorder.state !== 'recording') {
            setRecording(true);
            setAudioChunks([]);
            mediaRecorder.start();
        }
    };

    const stopRecording = () => {
        if (recording && mediaRecorder && mediaRecorder.state === 'recording') {
            setRecording(false);
            mediaRecorder.stop();
        }
    };

    const playRecording = () => {
        if (audioPlaying) {
            toggleAudio();
            return;
        }

        if (audioChunks.length > 0) {
            const blob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioURL = URL.createObjectURL(blob);
            const audio = new Audio(audioURL);
            audio.play();
            setAudioPlaying(true);
            audio.onended = () => setAudioPlaying(false);
        } else if (audioURL) {
            const audio = new Audio(audioURL);
            audio.play();
            setAudioPlaying(true);
            audio.onended = () => setAudioPlaying(false);
        }
    };

    const handleConfirmation = async () => {
        if (audioChunks.length > 0) {
            setWordCount(wordCount + 1);
            await saveAndSendAudio();
            setAudioChunks([]);
            setAudioURL(null);
        } else {
            console.log("Please record audio before proceeding.");
        }
    };

    const saveAndSendAudio = async () => {
        const blob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', blob, 'recording.mp3');
        try {
            const response = await fetch('backend-url', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const audioData = await response.json();
                setAudioURL(audioData.audioURL);
                const audio = new Audio(audioData.audioURL);
                audio.play();
                setAudioPlaying(true);
                audio.onended = () => setAudioPlaying(false);
            } else {
                console.error('Failed to save audio on the backend');
            }
        } catch (error) {
            console.error('Error saving audio:', error);
        }
    };

    const handleNextButtonClick = () => {
        handleConfirmation();
    };

    const toggleAudio = () => {
        if (audioPlaying) {
            const audioElements = document.querySelectorAll("audio");
            audioElements.forEach(audio => {
                audio.pause();
            });
            setAudioPlaying(false);
        } else {
            playRecording();
        }
    };

    const handleSwitchLang = (lang) => {
        setLang(lang); 
        localStorage.setItem('lang', JSON.stringify(lang));
    };

    const { lang, translations } = useLang();


    return (
        <div className={styles.container}>
            <p className={styles.wordCount}>{translations[lang].wordCount}: {wordCount}</p>

            <div className={styles.content}>
                <p className={styles.loadedWord}>Word: الجامعة{loadedWord}</p>
                <p className={styles.transcript}>[Transcript: hvbkdtfyguhj]{transcript}</p>
                <p className={styles.translation}>Translation: University {translation}</p>
                <div className={styles.buttonsP}>
                    <button onClick={toggleAudio} disabled={!audioURL && audioChunks.length === 0} className={styles.playButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-volume-up" viewBox="0 0 16 16">
                            <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                            <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
                        </svg>
                    </button>
                    <button onClick={recording ? stopRecording : startRecording} disabled={!mediaRecorder} className={styles.recordButton}>
                        <div className={`${styles['micContainer']} ${recording ? styles.active : ''}`}>
                            <div className={styles.circle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
                                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                                    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                                </svg>
                            </div>
                        </div>
                    </button>
                    <button onClick={handleNextButtonClick} className={styles.nextButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    );    
};

export default MainPage;
