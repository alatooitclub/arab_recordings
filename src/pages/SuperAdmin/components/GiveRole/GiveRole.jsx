import React from 'react';
import axios from 'axios'; 
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../contexts/AuthContext'; 
import { useLang } from "../../../../hooks/useLang";
import { setLang } from "../../../../contexts/lang";
import classes from './GiveRole.module.css';

const GiveRole = () => {
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

    const onSubmitAdminOrExpert = async (data) => {
        if (!isAuth || authRole !== "SuperAdmin") {
            console.error("Only super admins can register a new expert.");
            return;
        }

        const dataAdminExpert = {
            email: data.mail,
            role: data.role,
            password: data.password
        }
        console.log(dataAdminExpert)
        try {
            const res = await axios.post('/api/v1/auth/register/admin', dataAdminExpert)
            console.log(res);
            alert(`${role} registered successfully`);
        } catch (error) {
            console.log(error);
            alert(`Failed to register ${role}: ${error.response?.data?.message || error.message}`);
        }
    }

    return ( 
        <div className={classes.section_content}>
            <h2 className={classes.title}>Give Role</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmitAdminOrExpert)}>
                <div className={classes.word_info}>
                    <input
                        type="email"
                        placeholder="* Email"
                        {...register('mail', {required: true})}
                        aria-invalid={errors.mail ? 'true' : 'false'}
                        className={errors.mail && classes.errorInput}
                    />

                    <select defaultValue={'DEFAULT'}
                        {...register('role', {required: true})}
                        aria-invalid={errors.role ? 'true' : 'false'}
                        className={errors.role && classes.errorInput}>
                        <option value="DEFAULT" disabled>* Role</option>
                        <option value="student">Student</option>
                        <option value="expert">Expert</option>
                        <option value="admin">Admin</option>
                        <option value="superAdmin">Super Admin</option>
                    </select>
                    {errors.role?.type === 'required' && (
                        <p className={classes.error} role="alert">
                            Role is required
                        </p>
                    )}
                </div>

                <div>
                    {errors.mail?.type === 'required' && (
                        <p className={classes.error} role="alert">
                            Email Address is required
                        </p>
                    )}
                    
                    <input
                        type="password"
                        placeholder="* Password"
                        {...register('password', {required: true, minLength: 8})}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        className={errors.password && classes.errorInput}
                    />
                    {errors.password && (
                        <p role="alert" className={classes.error}>
                            {errors.password.type === 'required' ? 'Password is required' : 'Password must be at least 8 characters long'}
                        </p>
                    )}

                    <input
                        type="password"
                        placeholder="* Confirm Password"
                        {...register('passwordConfirmation', {
                            required: 'Confirm passwords is required',
                            validate: value =>
                                value === watch('password') || "The passwords do not match"
                        })}
                        aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
                        className={errors.passwordConfirmation && classes.errorInput}
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
}
 
export default GiveRole;