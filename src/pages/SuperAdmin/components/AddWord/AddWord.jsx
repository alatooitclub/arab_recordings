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
        if (!isAuth || authRole !== "Admin") {
            console.error("Only admins can register a new expert.");
            return;
        }

        const dataWord = {
            word: data.nickname,
            level: data.mail,
            transcription: data.transcription
        }
        console.log(dataWord)
        try {
            const res = await axios.post('/api/v1/auth/register/admin', dataWord)
            console.log(res);
            alert('Word added successfully');
        } catch (error) {
            console.log(error);
            alert(`Failed to add word: ${error.response?.data?.message || error.message}`);
        }
    }

    return ( 
            <div className={classes.section_content}>
                <h2 className={classes.title}>Add Word</h2>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitWord)}>
                    <div className={classes.word_info}>
                        <div>
                            <input
                                type="text"
                                placeholder="* Word"
                                {...register('word', {required: true})}
                                aria-invalid={errors.word ? 'true' : 'false'}
                                className={errors.word && classes.errorInput}
                            />
                            {errors.word?.type === 'required' && (
                                <p role="alert" className={classes.error}>
                                    Word is required
                                </p>
                            )}

                            <input
                                type="text"
                                placeholder="* Transcription"
                                {...register('transcription', {required: true})}
                                aria-invalid={errors.transcription ? 'true' : 'false'}
                                className={errors.transcription && classes.errorInput}
                            />
                            {errors.transcription?.type === 'required' && (
                                <p role="alert" className={classes.error}>
                                    Transcription is required
                                </p>
                            )}
                        </div>

                        <div>
                            <select defaultValue={'DEFAULT'}
                                {...register('level', {required: true})}
                                aria-invalid={errors.level ? 'true' : 'false'}
                                className={errors.level && classes.errorInput}>
                                    <option value="DEFAULT" disabled>* Level</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                            </select>
                            {errors.level?.type === 'required' && (
                                <p className={classes.error} role="alert">
                                    Level is required
                                </p>
                            )}
                        </div>
                    </div>
                    <button type='submit' className={classes.submitButton}>Submit</button>
                </form>
            </div>
     );
}
 
export default AddWord;