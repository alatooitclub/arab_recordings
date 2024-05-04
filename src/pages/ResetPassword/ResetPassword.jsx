import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classes from "../Login/Login.module.css";
import { useAuth } from '../../contexts/AuthContext'; 
import { useLang } from "../../hooks/useLang";
import { setLang } from "../../contexts/lang";

const ResetPassword = () => {
    const { setIsAuth } = useAuth(); 
    const navigate = useNavigate();
    const [errAlert, setErrAlert] = useState('');
    const [email, setEmail] = useState();
    const [switcher, setSwitcher] = useState(1);


    const { lang, translations } = useLang();

    const handleSwitchLang = (lang) => {
        setLang(lang);
        localStorage.setItem("lang", JSON.stringify(lang));
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm();
    // отправляет данные на сервер и переключает видимость формы на следующий этап
    const onSubmitRefreshSend = async (data, event) => {
        event.preventDefault();
        const Data = { 
            "email": data?.email
        };
        setEmail(data?.email);
        setSwitcher(2);
    
        try {
            const response = await apiService.post('/api/v1/auth/refresh-send', Data)
            console.log(response);
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || 'An error occurred while sending the email';
            setErrAlert(errorMsg);
        }
    };
    // после получения кода подтверждения от пользователя, данные вновь отправляются на сервер для проверки кода
    const onSubmitRefreshCheck = async (data, event) => {
        event.preventDefault();
        const Data = {
            "email": email,
            "code": data?.code
        };

        try {
            const response = await apiService.post('api/v1/auth/refresh_check', Data)
            console.log(response);
        
            setSwitcher(3);
        } catch (err) {
            console.log(err);
        }
    };
    // Последняя функция обрабатывает установку нового пароля
    const onSubmitNewPassword = async (data, event) => {
        event.preventDefault();
        const Data = {
            "email": email,
            "password": data?.password
        };
        try {
            await apiService.post('/api/v1/auth/newPassword', Data)
            setIsAuth(true); // Set authentication status
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <div id={classes.form} className="flex_container full-page">
            <span>Reset password</span>
            {switcher === 1 &&
                <form id="flex_container" className={classes.formR} onSubmit={handleSubmit(onSubmitRefreshSend)}>

                    <input
                        type="text"
                        placeholder="*email address"
                        {...register('email', {required: true})}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        id={errors.email && classes.errorInput}
                    />
                    {errors.email?.type === 'required' && (
                        <p role="alert" className={classes.error}>
                            Email address is required
                        </p>
                    )}
                    
                    <p>{errAlert}</p>
                    <button type='submit' className={classes.submitButton}>Отправить</button>
                </form>
            }
            {switcher === 2 &&
                <form className="flex_container" onSubmit={handleSubmit(onSubmitRefreshCheck)}>

                    <input
                        type="number"
                        placeholder="* Code"
                        {...register('code', {required: true})}
                        aria-invalid={errors.code ? 'true' : 'false'}
                        id={errors.code && classes.errorInput}
                    />
                    {errors.code?.type === 'required' && (
                        <p role="alert" className={classes.error}>
                            Code required
                        </p>
                    )}


                    <p>{errAlert}</p>
                    <button type='submit' className={classes.submitButton}>Submit</button>
                </form>
            }
            {switcher === 3 &&
                <form className="flex_container" onSubmit={handleSubmit(onSubmitNewPassword)}>

                    <input
                        type="password"
                        placeholder="* Password"
                        {...register('password', {required: true})}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        id={errors.password && classes.errorInput}
                    />
                    {errors.password?.type === 'required' && (
                        <p role="alert" className={classes.error}>
                            Password required
                        </p>
                    )}

                    <input
                        type="password"
                        placeholder="* Confirm password"
                        {...register('passwordConfirmation', {
                            required: 'Password confirmation required',
                            validate: value =>
                                value === watch('password') || "Passwords don't match"
                        })}
                        aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
                        id={errors.passwordConfirmation && classes.errorInput}
                    />
                    {errors.passwordConfirmation && (
                        <p role="alert" className={classes.error}>
                            {errors.passwordConfirmation.message}
                        </p>
                    )}

                    <p>{errAlert}</p>
                    <button type='submit' className={classes.submitButton}>Submit</button>
                </form>
            }
        </div>
    )
};

export default ResetPassword;
