import React, { useState } from 'react';
import styles from './PasswordReset.module.css';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(false); // Reset error state on change
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === '') {
      setError(true);
      setMessage('Email is required');
      return;
    }
    try {
      // Placeholder for sending email to your backend
      const response = await fetch('/api/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setMessage('Please check your email to reset your password.');
    } catch (error) {
      setMessage('Failed to send password reset email.');
      console.error('There was an issue with the password reset:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formR}>
        <form onSubmit={handleSubmit} id="form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={error ? styles.errorInput : ''}
            required
          />
          <button type="submit" className={styles.submitButton}>Sign up</button>
        </form>
        {message && <p className={error ? styles.error : styles.message}>{message}</p>}
      </div>
    </div>
  );
}

export default PasswordReset;
