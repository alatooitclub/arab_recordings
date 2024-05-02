import React from 'react';
import { useForm } from 'react-hook-form';
import classes from './SuperAdmin.module.css';


const AddWord = ({classes}) => {

    const {
        register,
        formState: {errors},
        handleSubmit,
        watch
    } = useForm()
    
    const onSubmitWord = async(data) => {
        const dataWord = {
            word: data.nickname,
            level: data.mail,
            transcription: data.transcription
        }
        console.log(dataWord)
        try {
            const res = await apiService.post('/api/v1/auth/register/admin', dataWord)
            console.log(res);

        } catch (error) {
            console.log(error);
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
                                placeholder="Word"
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
                                placeholder="Transcription"
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
                                    <option value="DEFAULT" disabled>Level</option>
                                    <option value="level_a1">A1</option>
                                    <option value="level_a2">A2</option>
                                    <option value="level_b1">B1</option>
                                    <option value="level_b2">B2</option>
                                    <option value="level_c1">C1</option>
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