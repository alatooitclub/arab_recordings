import { useState } from "react";
import {useForm} from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Regist.module.css";
import { useLang } from "../../hooks/useLang";
import { setLang } from "../../contexts/lang";
import axios from 'axios';


const apiService = axios.create({
    baseURL: 'http://localhost:8081', // Базовый URL для всех запросов
    headers: {
        'Content-Type': 'application/json'
    }
});

const Regist = () => {

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

   

        const navigate = useNavigate();
    
        const onSubmit = async (data) => {
            const dataUser = {
                nickname: data.nickname,
                email: data.email,
                age: data.age,
                gender: data.gender,
                password: data.password
            };
            console.log(dataUser);
            try {
                const res = await apiService.post('http://localhost:8081/auth/register', dataUser);
                console.log(res);
                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        
    }

    return (
        <div id={classes.form} className="flex_container full-page">
            <span className={classes.text_form}>{translations[lang].regist.title_regist}</span>
            <form id="flex_container" className={classes.formR} onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder={translations[lang].regist.plaseh_regist.nicknamePH}
                    {...register('nickname', {required: true})}
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    className={errors.firstName && classes.errorInput}
                />
                {errors.firstName?.type === 'required' && (
                    <p role="alert" className={classes.error}>
                        {translations[lang].regist.alert_regist.nicknameAl}
                    </p>
                )}

                <input
                    type="email"
                    placeholder={translations[lang].regist.plaseh_regist.emailPH}
                    {...register('mail', {required: true})}
                    aria-invalid={errors.mail ? 'true' : 'false'}
                    className={errors.mail && classes.errorInput}
                />
                {errors.mail?.type === 'required' && (
                    <p className={classes.error} role="alert">
                        {translations[lang].regist.alert_regist.emailAl}
                    </p>
                )}

                <input
                    type="number"
                    placeholder={translations[lang].regist.plaseh_regist.agePH}
                    {...register('age', {required: true})}
                    aria-invalid={errors.age ? 'true' : 'false'}
                    className={errors.age && classes.errorInput}
                />
                {errors.password?.type === 'required' && (
                    <p role="alert" className={classes.error}>
                        {translations[lang].regist.alert_regist.ageAl}
                    </p>
                )}

                <select defaultValue={'DEFAULT'}
                    {...register('gender', {required: true})}
                    aria-invalid={errors.gender ? 'true' : 'false'}
                    className={errors.gender && classes.errorInput}>
                    <option value="DEFAULT" disabled>{translations[lang].regist.plaseh_regist.genderPH.gender}</option>
                    <option value="none">{translations[lang].regist.plaseh_regist.genderPH.none}</option>
                    <option value="male">{translations[lang].regist.plaseh_regist.genderPH.male}</option>
                    <option value="female">{translations[lang].regist.plaseh_regist.genderPH.female}</option>
                </select>
                {errors.gender?.type === 'required' && (
                    <p className={classes.error} role="alert">
                        {translations[lang].regist.alert_regist.genderAl}
                    </p>
                )}

                <input
                    type="password"
                    placeholder={translations[lang].regist.plaseh_regist.passwordPH}
                    {...register('password', {required: true,
                        minLength: {
                            value: 2,
                            message: "description"
                        }})}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    className={errors.password && classes.errorInput}
                />
                {errors.password?.type === 'required' && (
                    <p role="alert" className={classes.error}>
                        {translations[lang].regist.alert_regist.passwordAl}
                    </p>
                )}
                {errors.password?.type === 'minLength' && (
                    <p role="alert" className={classes.error}>
                        {translations[lang].regist.alert_regist.passwordLN}
                    </p>
                )}

                <input
                    type="password"
                    placeholder={translations[lang].regist.plaseh_regist.passwordCF}
                    {...register('passwordConfirmation', {
                        required: (translations[lang].regist.alert_regist.passwordAl),
                        validate: value =>
                            value === watch('password') || (translations[lang].regist.alert_regist.passwordMT)
                    })}
                    aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
                    className={errors.passwordConfirmation && classes.errorInput}
                />
                {errors.passwordConfirmation && (
                    <p role="alert" className={classes.error}>
                        {errors.passwordConfirmation.message}
                    </p>
                )}
                {/*<p>{errAlert}</p>*/}
                <button type='submit' className={classes.submitButton}>{translations[lang].regist.btn_submit}</button>
                <p className="message">{translations[lang].regist.sub_regist} <NavLink to="/login">{translations[lang].regist.login_regist}</NavLink></p>
            </form>
        </div>
    );
};

export default Regist;