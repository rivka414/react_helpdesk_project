import { useState, type FunctionComponent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addUser, getUsers } from "../services/api.service";
import Header from "./header";
import Footer from "./footer";
import "../css/addUser.css";

interface AddUserProps {

}
interface AddUserState {
    name: string;
    email: string;
    password: string;
    role: string;
}

const AddUser: FunctionComponent<AddUserProps> = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<AddUserState>();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const[errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit: SubmitHandler<AddUserState> = async (data) => {
        if (!token) { return; }
        try {
            const users = await getUsers(token);
            const userExists = users.some(
                (u: AddUserState) => u.name.toLowerCase() == data.name.toLowerCase() || u.email.toLowerCase() == data.email.toLowerCase()
            );
            if (userExists) {
                setErrorMessage("משתמש עם אימייל/שם זה כבר קיים במערכת");
                return;
            }
            await addUser(data.name, data.email, data.password, data.role, token);
            setErrorMessage(null);
             setSuccessMessage("המשתמש נוסף בהצלחה");
             const timeout = setTimeout(() => {
            navigate(`/dashboard`);}, 2000);
            return () => clearTimeout(timeout);
        } catch (err: any) {
            alert("אירעה שגיאה כללית");
            console.error(err);
        }

    }


    return (<>
        <Header />
        <div className="main_container_add_user">
            <form onSubmit={handleSubmit(onSubmit)} className="form_add_user">
                <h2 className="h2_form_add_user">הוספת משתמש חדש : </h2>
                <div className="inputs_add_user">
                    <label htmlFor="name" >שם : </label>
                    <input
                        id="name"
                        {...register("name", {
                            required: "חובה למלא שם", minLength: {
                                value: 3,
                                message: "השם חייב להכיל לפחות 3 תווים"
                            }
                        })}
                        type="text"
                        placeholder="הכנס שם"
                        autoComplete="name"
                        className={errors.name ? "invalid" : ""}
                    />
                </div>
                {errors.name && (
                    <span className="error_add_user">{errors.name.message}</span>
                )}
                <div className="inputs_add_user">
                    <label htmlFor="email">אימייל : </label>
                    <input
                        id="email"
                        {...register("email", {
                            required: "חובה למלא אימייל",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "אימייל לא תקין"
                            }
                        })}
                        type="text"
                        placeholder="הכנס אימייל"
                        autoComplete="email"
                        className={errors.email ? "invalid" : ""}
                    />
                </div>
                {errors.email && (
                    <span className="error_add_user">{errors.email.message}</span>
                )}
                <div className="inputs_add_user">
                    <label htmlFor="password"> סיסמה המשתמש : </label>
                    <input
                        id="password"
                        {...register("password", {
                            required: "חובה למלא סיסמה",
                            minLength: {
                                value: 6,
                                message: "הסיסמה חייבת להכיל לפחות 6 תווים"
                            }
                        })}
                        type="password"
                        placeholder="הכנס סיסמה"
                        autoComplete="current-password"
                        className={errors.password ? "invalid" : ""}
                    />
                </div>
                {errors.password && (
                    <span className="error_add_user">{errors.password.message}</span>
                )}
                <div className="inputs_add_user">
                    <label htmlFor="role">תפקיד : </label>
                    <select className={errors.role ? "invalid" : ""} {...register("role", {
                        required: "חובה לבחור תפקיד",

                       
                    })}>
                        <option value="">בחר תפקיד</option>
                        <option value="admin">מנהל</option>
                        <option value="agent">סוכן</option>
                        <option value="customer">לקוח</option>
                    </select>
                </div>
                {errors.role && (
                    <span className="error_add_user">{errors.role.message}</span>
                )}
                <button type="submit">
                    הוספת המשתמש
                </button>
                {successMessage && <div className="success_add_user_message">{successMessage}</div>}
                {errorMessage && <div className="error_add_user_message">{errorMessage}</div>}
            </form>
        </div>
        <Footer />
    </>);
}

export default AddUser;