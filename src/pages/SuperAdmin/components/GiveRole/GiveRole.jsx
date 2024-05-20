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
            console.error(translations[lang].super_admin.give_role.errors_role.console_error_auth);
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
            alert(`${role} ` (translations[lang].super_admin.give_role.errors_role.successful_give));
        } catch (error) {
            console.log(error);
            alert((translations[lang].super_admin.give_role.errors_role.faild_give)` ${role}: ${error.response?.data?.message || error.message}`);
        }
    }

    return ( 
        <div className={classes.section_content}>
            <h2 className={classes.title}>{translations[lang].super_admin.give_role.title_role}</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmitAdminOrExpert)}>
                <div className={classes.word_info}>
                    <input
                        type="email"
                        placeholder={translations[lang].super_admin.give_role.placeholder_role.emailPH}
                        {...register('mail', {required: true})}
                        aria-invalid={errors.mail ? 'true' : 'false'}
                        className={errors.mail && classes.errorInput}
                    />

                    <select defaultValue={'DEFAULT'}
                        {...register('role', {required: true})}
                        aria-invalid={errors.role ? 'true' : 'false'}
                        className={errors.role && classes.errorInput}>
                        <option value="DEFAULT" disabled>{translations[lang].super_admin.give_role.placeholder_role.rolePH.role}</option>
                        <option value="student">{translations[lang].super_admin.give_role.placeholder_role.rolePH.student}</option>
                        <option value="expert">{translations[lang].super_admin.give_role.placeholder_role.rolePH.expert}</option>
                        <option value="admin">{translations[lang].super_admin.give_role.placeholder_role.rolePH.admin}</option>
                        <option value="superAdmin">{translations[lang].super_admin.give_role.placeholder_role.rolePH.superAdmin}</option>
                    </select>
                    {errors.role?.type === 'required' && (
                        <p className={classes.error} role="alert">
                            {translations[lang].super_admin.give_role.alert_role.roleAL}
                        </p>
                    )}
                </div>

                <div>
                    {errors.mail?.type === 'required' && (
                        <p className={classes.error} role="alert">
                            {translations[lang].super_admin.give_role.alert_role.emailAL}
                        </p>
                    )}
                    
                    <input
                        type="password"
                        placeholder={translations[lang].super_admin.give_role.placeholder_role.passwordPH}
                        {...register('password', {required: true, minLength: 8})}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        className={errors.password && classes.errorInput}
                    />
                    {errors.password && (
                        <p role="alert" className={classes.error}>
                            {errors.password.type === 'required' ? (translations[lang].super_admin.give_role.alert_role.passwordAL) : (translations[lang].super_admin.give_role.alert_role.passwordLN)}
                        </p>
                    )}

                    <input
                        type="password"
                        placeholder={translations[lang].super_admin.give_role.placeholder_role.passwordCF}
                        {...register('passwordConfirmation', {
                            required: 'Confirm passwords is required',
                            validate: value =>
                                value === watch('password') || (translations[lang].super_admin.give_role.alert_role.passwordMT)
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
                <button type='submit' className={classes.submitButton}>{translations[lang].super_admin.give_role.btn_role.submitBtn}</button>
            </form>
        </div>
     );
}
 
export default GiveRole;