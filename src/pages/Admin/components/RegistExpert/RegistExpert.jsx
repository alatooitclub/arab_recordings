import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../contexts/AuthContext'; 
import { useLang } from '../../../../hooks/useLang';
import { setLang } from '../../../../contexts/lang';
import classes from './RegistExpert.module.css';
import axios from 'axios'; 

const RegistExpert = () => {
    const { isAuth, authRole } = useAuth(); 
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();

    const { lang, translations } = useLang();

    const handleSwitchLang = (lang) => {
        setLang(lang);
        localStorage.setItem("lang", JSON.stringify(lang));
    };

    const onSubmitExpert = async (data) => {
        if (!isAuth || authRole !== "Admin") {
            console.error("Only admins can register a new expert.");
            return;
        }

        const dataExpert = {
            nickname: data.nickname,
            email: data.mail,
            age: data.age,
            gender: data.gender,
            password: data.password
        };
        console.log(dataExpert);
        try {
            const res = await axios.post('/api/v1/experts/register', dataExpert);
            console.log(res);
            alert('Expert registered successfully');
        } catch (error) {
            console.error(error);
            alert(`Failed to register expert: ${error.response?.data?.message || error.message}`);
        }
    };

    // if (!isAuth || authRole !== "Admin") {
    //     return <p>You must be an admin to view this page.</p>;
    // }

    return (
        <div className={classes.section_content}>
            <h2 className={classes.title}>Add Expert</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmitExpert)}>
                <div className={classes.word_info}>
                    {/* Форма ввода данных */}
                    <input
                        type="text"
                        placeholder="* Nickname"
                        {...register('nickname', { required: true })}
                        aria-invalid={errors.nickname ? 'true' : 'false'}
                        className={errors.nickname ? classes.errorInput : ''}
                    />
                    {errors.nickname && (
                        <p role="alert" className={classes.error}>
                            Nickname is required
                        </p>
                    )}

                    <input
                        type="email"
                        placeholder="* Email"
                        {...register('mail', { required: true })}
                        aria-invalid={errors.mail ? 'true' : 'false'}
                        className={errors.mail ? classes.errorInput : ''}
                    />
                    {errors.mail && (
                        <p className={classes.error} role="alert">
                            Email Address is required
                            </p>
                    )}

                    {/* Дополнительные поля */}
                    <input
                        type="password"
                        placeholder="* Password"
                        {...register('password', { required: true, minLength: 8 })}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        className={errors.password ? classes.errorInput : ''}
                    />
                    {errors.password && (
                        <p role="alert" className={classes.error}>
                            {errors.password.type === 'required' ? 'Password is required' : 'Password must be at least 8 characters long'}
                        </p>
                    )}

                    {/* Подтверждение пароля */}
                    <input
                        type="password"
                        placeholder="* Confirm Password"
                        {...register('passwordConfirmation', {
                            required: 'Confirm password is required',
                            validate: value => value === watch('password') || "The passwords do not match"
                        })}
                        aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
                        className={errors.passwordConfirmation ? classes.errorInput : ''}
                    />
                    {errors.passwordConfirmation && (
                        <p role="alert" className={classes.error}>
                            {errors.passwordConfirmation.message}
                        </p>
                    )}
                </div>
                <button type='submit' className={classes.submitButton}>Submit</button>
            </form>
        </div>
    );
};

export default RegistExpert;
