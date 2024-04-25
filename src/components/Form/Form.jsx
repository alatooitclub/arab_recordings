import classes from "./Form.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";

const Form =() => {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm()

    const {isAuth, setIsAuth} = useAuth()
    console.log(isAuth)

    const onSubmit = async(data) => {
        const allData =  {
            name: data.name,
            description: data.description
        }
        try {
            const res = await apiService.post(`/petition/add`, allData, {
                headers: {
                    Authorization: `Bearer ${isAuth}`
                }
            })
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id={classes.form} className="flex_container full-page">
            <span className={classes.text_form}>Form</span>
            <form id="flex_container" className={classes.formR} onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="* Name"
                    {...register('name',
                     {required: "Параметр обязателен",
                    maxLength:{
                        value:200,
                        message: "Ваше имя должно быть меньше 200 символов"
                    },
                    minLength: {
                        value: 21,
                        message: "Ваше имя должно быть больше 21 символов"
                    },
                })}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    className={errors.name && classes.errorInput}
                />
                {errors.name && (
                    <p className={classes.error} role="alert">
                        {errors.name?.message}
                    </p>
                )}

        
                <input
                    type="description"
                    placeholder="* Description"
                    {...register('description',
                     {required: "Параметр обязателен",
                    maxLength:{
                        value:200,
                        message: "Ваш description должно быть меньше 200 символов"
                    },
                    minLength: {
                        value: 21,
                        message: "Ваш description должно быть больше 21 символов"
                    },
                })}
                    aria-invalid={errors.description ? 'true' : 'false'}
                    className={errors.description && classes.errorInput}
                />
                {errors.description && (
                    <p className={classes.error} role="alert">
                        {errors.description?.message}
                    </p>
                )}
            
                {/*<p>{errAlert}</p>*/}
                <button type='submit' className={classes.submitButton}>Submit</button>
            </form>
        </div>
    );
};

export default Form;