import React, { useState } from 'react';
import axios from 'axios';
// import { useLang } from '../../../../hooks/useLang';
import { setLang } from '../../../../contexts/lang';
import classes from "./DeleteExpert.module.css"; // Make sure this path is correct!

const DeleteExpert = () => {
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    // const { lang, translations } = useLang();

    const handleSwitchLang = (lang) => {
        setLang(lang);
        localStorage.setItem("lang", JSON.stringify(lang));
    };

    const handleInputChange = (e) => {
        setIdentifier(e.target.value);
    };

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`/experts/${identifier}`);
            setUser(response.data.user);  // Assuming API returns user data
            setMessage(response.data.message);
        } catch (error) {
            setMessage(`Failed to delete the expert because of an error: ${error.response?.data?.message || error.message}`);
        }
    };
    
    return (
        <div className={classes.section_content}>
            <h1 className={classes.title}>Delete Role</h1>
            <div className={classes.form}>
                <div className={classes.word_info}>
                    <input
                        type="text"
                        placeholder="Enter e-mail"
                        value={identifier}
                        onChange={handleInputChange}
                    />
                </div>
                <button onClick={deleteUser}>Delete Role</button>
                <div>
                    {message && <p>{message}</p>}
                    {user && (
                        <div>
                            <h2>User Info:</h2>
                            <p>E-mail: {user.email}</p>
                            <p>Role: {user.roles.join(', ')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default DeleteExpert;
