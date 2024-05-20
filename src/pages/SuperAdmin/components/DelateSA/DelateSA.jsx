import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useLang } from "../../../../hooks/useLang";
import { setLang } from "../../../../contexts/lang";
import classes from "./DeleteSA.module.css";

const DelateSA = () => {
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    const { lang, translations } = useLang();

    const handleSwitchLang = (lang) => {
        setLang(lang);
        localStorage.setItem("lang", JSON.stringify(lang));
    };

    const handleInputChange = (e) => {
        setIdentifier(e.target.value);
    };

    const deleteUser = async () => {
        if (!isAuth || authRole !== "SuperAdmin") {
            console.error(translations[lang].super_admin.delate_expert.errors_word.console_error_auth);
            return;
        }
        try {
            const response = await axios.delete(`/experts/${identifier}`);
            setUser(response.data.user);  
            setMessage(response.data.message);
        } catch (error) {
            setMessage(translations[lang].super_admin.delate_expert.errors_word.faild_delate` ${error.response?.data?.message || error.message}`);
        }
    };
    return ( 
        <div className={classes.section_content}>
            <h1 className={classes.title}>{translations[lang].super_admin.delate_expert.title_delate}</h1>
            <form className={classes.form}>
                <div className={classes.word_info}>
                    <input
                        type="text"
                        placeholder={translations[lang].super_admin.delate_expert.placeholder_delate.emailPH}
                        value={identifier}
                        onChange={handleInputChange}
                    />
                </div>
                <button onClick={deleteUser} className={classes.submitButton}>{translations[lang].super_admin.delate_expert.btn_delate.delateBtn}</button>
                {/* <div>
                    {message && <p>{message}</p>}
                    {user && (
                        <div>
                            <h2>User info:</h2>
                            <p>e-mail: {user.email}</p>
                            <p>role: {user.roles.join(', ')}</p>
                        </div>
                    )}
                </div> */}
            </form>
        </div>
     );
}
 
export default DelateSA;
