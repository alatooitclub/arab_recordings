import React from 'react';
import { useForm } from 'react-hook-form';
import { useLang } from "../../hooks/useLang";
import { setLang } from "../../contexts/lang";


const RegistAdminExpert = ({classes}) => {

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

    const onSubmitAdminOrExpert = async(data) => {
        const dataAdminExpert = {
            nickname: data.nickname,
            email: data.mail,
            age: data.age,
            gender: data.gender,
            password: data.password
        }
        console.log(dataAdminExpert)
        try {
            const res = await apiService.post('/api/v1/auth/register/admin', dataAdminExpert)
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    return ( 
            <div className={classes.section_content}>
                <h2 className={classes.title}>Add Admin or Expert</h2>
                <form className={classes.form} onSubmit={handleSubmit(onSubmitAdminOrExpert)}>
                    <div className={classes.word_info}>
                        <div>
                            <input
                                type="text"
                                placeholder="* Nickname"
                                {...register('nickname', {required: true})}
                                aria-invalid={errors.nickname ? 'true' : 'false'}
                                className={errors.nickname && classes.errorInput}
                            />
                            {errors.nickname?.type === 'required' && (
                                <p role="alert" className={classes.error}>
                                    Nickname is required
                                </p>
                            )}

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
                                type="number"
                                placeholder="* Age"
                                {...register('age', {required: true})}
                                aria-invalid={errors.age ? 'true' : 'false'}
                                className={errors.age && classes.errorInput}
                            />
                            {errors.password?.type === 'required' && (
                                <p role="alert" className={classes.error}>
                                    Age is required
                                </p>
                            )}

                            <select defaultValue={'DEFAULT'}
                                {...register('gender', {required: true})}
                                aria-invalid={errors.gender ? 'true' : 'false'}
                                className={errors.gender && classes.errorInput}>
                                <option value="DEFAULT" disabled>* Gender</option>
                                <option value="none">Don't want to say</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender?.type === 'required' && (
                                <p className={classes.error} role="alert">
                                    Gender is required
                                </p>
                            )}
                        </div>

                        <div>
                            <select defaultValue={'DEFAULT'}
                                {...register('role', {required: true})}
                                aria-invalid={errors.role ? 'true' : 'false'}
                                className={errors.role && classes.errorInput}>
                                    <option value="DEFAULT" disabled>Role</option>
                                    <option value="Expert">Expert</option>
                                    <option value="Admin">Admin</option>
                            </select>
                            {errors.level?.type === 'required' && (
                                <p className={classes.error} role="alert">
                                    Level is required
                                </p>
                            )}

                            <input
                                type="password"
                                placeholder="* Password"
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
                                    Passwords is required
                                </p>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <p role="alert" className={classes.error}>
                                    Passwords is required
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
                    </div>
                    <button type='submit' className={classes.submitButton}>Submit</button>
                </form>
            </div>
     );
}
 
export default RegistAdminExpert;