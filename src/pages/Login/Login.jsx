import classes from "./Login.module.css";
import {useForm} from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const apiService = axios.create({
    baseURL: 'http://localhost:8081', // Базовый URL для всех запросов
    headers: {
        'Content-Type': 'application/json'
    }
});

const Login = () => {

    const {
        register,
        formState: {errors},
        handleSubmit,
        watch
    } = useForm()

    const navigate = useNavigate()

    const {isAuth, setIsAuth} = useAuth()
    console.log(isAuth)

    const onSubmit = async(data) => {
        const dataUser = {
            email: data.mail,
            password: data.password
        }
        console.log(dataUser)
        try {
            const res = await apiService.post('http://localhost:8081/auth/login', dataUser)
            console.log(res);

            localStorage.setItem('token', res.data.access_token)
            setIsAuth(res.data.access_token)

            navigate('/mainPage')

        } catch (error) {
            console.log(error);
        }
    }

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
                <button type='submit' className={classes.submitButton}>Submit</button>
                <NavLink className={classes.linkForgotPass} to='/reset' style={{ color: 'gray', textDecoration: 'none', margin: '10px' }}>Forgot password?</NavLink>
            </form>
        </div>
    );
};

export default Login;