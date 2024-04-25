import React, { useState } from 'react';
import styles from './NewPasswordForm.module.css';  // Assuming the same CSS file applies to this form

function NewPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError(true);
            setMessage('Passwords do not match.');
            return;
        }
        setError(false);
        setMessage('Password successfully changed.');
        // Here you would typically handle password update logic to your backend
    };

    return (
        <div className={styles.container}>
            <div className={styles.formR}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={error ? styles.errorInput : styles.input}
                        required
                    />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={error ? styles.errorInput : styles.input}
                        required
                    />
                    <button type="submit" className={styles.submitButton}>Change Password</button>
                </form>
                {message && <p className={error ? styles.error : styles.message}>{message}</p>}
            </div>
        </div>
    );
}

export default NewPasswordForm;
