import React from 'react';
import axios from 'axios'; 
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../contexts/AuthContext'; 
import { useLang } from "../../../../hooks/useLang";
import { setLang } from "../../../../contexts/lang";
import classes from './AddWord.module.css';

const AddWord = () => {
    const { isAuth, authRole } = useAuth(); 
    const {
        register,
        formState: {errors},
        handleSubmit,
        watch
    } = useForm()

    const { lang, translations } = useLang();

    const handleSwitchLang = (lang) => {
        setLang(lang);
        localStorage.setItem("lang", JSON.stringify(lang));
    };
    
    const onSubmitWord = async(data) => {
        if (!isAuth || authRole !== "SuperAdmin") {
            console.error(translations[lang].super_admin.add_word.errors_word.console_error_auth);
            return;
        }

        const dataWord = {
            word: data.nickname,
            level: data.mail,
            transcription: data.transcription
        }
        console.log(dataWord)
        try {
            const res = await axios.post('/api/v1/auth/register/superadmin', dataWord)
            console.log(res);
            alert(translations[lang].super_admin.add_word.errors_word.successful_add);
        } catch (error) {
            console.log(error);
            alert(translations[lang].super_admin.add_word.errors_word.faild_add `${error.response?.data?.message || error.message}`);
        }
    }

    return ( 
            <div className={classes.section_content}>
                <h2 className={classes.title}>{translations[lang].super_admin.add_word.title_word}</h2>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitWord)}>
                    <div className={classes.word_info}>
                        <div>
                            <input
                                type="text"
                                placeholder={translations[lang].super_admin.add_word.placeholder_word.wordPH}
                                {...register('word', {required: true})}
                                aria-invalid={errors.word ? 'true' : 'false'}
                                className={errors.word && classes.errorInput}
                            />
                            {errors.word?.type === 'required' && (
                                <p role="alert" className={classes.error}>
                                    {translations[lang].super_admin.add_word.alert_word.wordAL}
                                </p>
                            )}

                            <input
                                type="text"
                                placeholder={translations[lang].super_admin.add_word.placeholder_word.transcriptionPH}
                                {...register('transcription', {required: true})}
                                aria-invalid={errors.transcription ? 'true' : 'false'}
                                className={errors.transcription && classes.errorInput}
                            />
                            {errors.transcription?.type === 'required' && (
                                <p role="alert" className={classes.error}>
                                    {translations[lang].super_admin.add_word.alert_word.transcriptionAL}
                                </p>
                            )}
                        </div>

                        <div>
                            <select defaultValue={'DEFAULT'}
                                {...register('level', {required: true})}
                                aria-invalid={errors.level ? 'true' : 'false'}
                                className={errors.level && classes.errorInput}>
                                    <option value="DEFAULT" disabled>{translations[lang].super_admin.add_word.placeholder_word.levelPH.level}</option>
                                    <option value="easy">{translations[lang].super_admin.add_word.placeholder_word.levelPH.easy}</option>
                                    <option value="medium">{translations[lang].super_admin.add_word.placeholder_word.levelPH.medium}</option>
                                    <option value="hard">{translations[lang].super_admin.add_word.placeholder_word.levelPH.hard}</option>
                            </select>
                            {errors.level?.type === 'required' && (
                                <p className={classes.error} role="alert">
                                    {translations[lang].super_admin.add_word.alert_word.levelAL}
                                </p>
                            )}
                        </div>
                    </div>
                    <button type='submit' className={classes.submitButton}>{translations[lang].super_admin.add_word.btn_word.submitBtn}</button>
                </form>
            </div>
     );
}
 
export default AddWord;