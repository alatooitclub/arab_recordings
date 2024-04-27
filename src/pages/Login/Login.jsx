import classes from "../Login/Login.module.css"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { useAuth } from "../../contexts/AuthContext"; 

const Login = () => {
    const navigate = useNavigate();
    const [errAlert, setErrAlert] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { setIsAuth } = useContext(useAuth);

    const onSubmit = async (data) => {
        const loginData = {
            "email": data.mail,
            "password": data.password,
        };
	console.log(loginData)
        try {
            const res = await apiService.post('/api/v1/auth/authenticate', loginData)
            console.log(res);

            navigate('/', { replace: true });
            localStorage.setItem('token', res.data.access_token)
            setIsAuth(res.data.access_token)

        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 404) {
                setErrAlert('User not found by email');
            } else {
                setErrAlert('Login error occurred');
            }
        }
    };

     return (
        <div id={classes.form} className="flex_container full-page">
            <span className={classes.text_form}>Login</span>
            <form id="flex_container" className={classes.formR} onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="* Email"
                    {...register('mail', {required: true})}
                    aria-invalid={errors.mail ? 'true' : 'false'}
                    className={errors.mail && classes.errorInput}
                />
                {errors.mail?.type === 'required' && (
                    <p className={classes.error} role="alert">
                        Email Address is required
                    </p>
                )}

        
                <input
                    type="password"
                    placeholder="* Password"
                    {...register('password', {required: true})}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    className={errors.password && classes.errorInput}
                />
                {errors.password?.type === 'required' && (
                    <p role="alert" className={classes.error}>
                        Passwords is required
                    </p>
                )}

                {/*<p>{errAlert}</p>*/}
                <button type='submit' className={classes.submitButton}>Log in</button>
                <p className="message">
                    <NavLink to="/register" style={{ color: 'green', textDecoration: 'none', margin: '10px' }}>Sign up</NavLink>
                    <NavLink to="/reset" style={{ color: 'gray', textDecoration: 'none', margin: '10px' }}>Forgot password?</NavLink>
                </p>
            </form>
        </div>
    );
}

export default Login;
