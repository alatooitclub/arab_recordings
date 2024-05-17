import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css';
import profile from "../../assets/profileImg.png";
import { useLang } from "../../hooks/useLang";
import { setLang } from "../../contexts/lang";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    nickname: '',
    email: '',
    gender: '',
    age: '',
    wordsCount: ''
  });

  const { lang, translations } = useLang();

    const handleSwitchLang = (lang) => {
        setLang(lang);
        localStorage.setItem("lang", JSON.stringify(lang));
    };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://backend-api.com/profile');
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className={styles.userProfile}>
      <h2> {translations[lang].user}</h2>
      <div className={styles.profileImg}>
          <img src={profile} alt="Profile-icon" />
      </div>
      <div className={styles.userDetails}>
        <p><strong>{translations[lang].nickname}</strong> John Doe {profileData.nickname}</p>
        <p><strong>Email:</strong> John@gmail.com {profileData.email}</p>
        <p><strong>{translations[lang].gender}</strong> Male {profileData.gender}</p>
        <p><strong>{translations[lang].age}</strong> 18 {profileData.age}</p>
        <p><strong>{translations[lang].amountOfWords}</strong> 234 {profileData.wordsCount}</p>
      </div>
      <button className={styles.editButton}>{translations[lang].edit}</button>
    </div>
  );
}

export default ProfilePage;