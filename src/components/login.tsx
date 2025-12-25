import { useContext, useState, type FunctionComponent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getToken, registerUser } from "../services/api.service";
import { UserContext } from "../context/roleContext";
import "../css/login.css";
import Header from "./header";
import Footer from "./footer";

interface LoginProps {

}
interface HookFormProps {
    name: string,
    password: string,
    email: string,

}

const Login: FunctionComponent<LoginProps> = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    let roleStatus: any;
    const { register, handleSubmit, formState: { errors } } = useForm<HookFormProps>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [login, setLogin] = useState<boolean>(false);
    const onSubmit: SubmitHandler<HookFormProps> = async (data) => {
        try {
            if (!login) {
                await registerUser({ name: data.name, email: data.email, password: data.password });
            }
        }
        catch (err) {
            setErrorMessage("הרשמה נכשלה, משתמש קיים כבר במערכת");
            return;
        }
        try {
            roleStatus = await getToken({ password: data.password, email: data.email });
            if (roleStatus) {
                await localStorage.setItem("token", roleStatus.token);
                setUser(roleStatus.user);

                setSuccessMessage("התחברת בהצלחה");
                setErrorMessage(null);
                const timeout = setTimeout(() => {
                    navigate(`/dashboard`);
                }, 1000);
                return () => clearTimeout(timeout);
            }
        } catch (err) {
            setErrorMessage("מייל או סיסמא שגויים");
        }

    }

    return (
        <>
            <Header />

            <div className="login-page-container">
                <div className="login-wrapper">

                    <div className="auth-toggle-navigation">
                        <button
                            type="button"
                            className={`nav-btn ${!login ? 'active' : ''}`}
                            onClick={() => setLogin(false)}
                        >
                            הרשמה
                        </button>
                        <button
                            type="button"
                            className={`nav-btn ${login ? 'active' : ''}`}
                            onClick={() => setLogin(true)}
                        >
                            התחברות
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="login-card">
                        <h2 className="login-title">🔑 כניסה ל - helpDesk ברוכים הבאים</h2>

                        {!login &&
                            <div className="login-field-group">
                                <label htmlFor="name">📧 שם:</label>
                                <input
                                    id="name"
                                    {...register("name", {
                                        required: "חובה למלא שם משתמש",

                                    })}
                                    type="text"
                                    placeholder="הכנס שם משתמש"
                                    autoComplete="username"
                                    className={errors.name ? "invalid" : ""}
                                />
                                {errors.name && (
                                    <span className="error_login_user">{errors.name.message}</span>
                                )}
                            </div>}

                        <div className="login-field-group">
                            <label htmlFor="email">📧 אימייל:</label>
                            <input
                                id="email"
                                {...register("email", {
                                    required: "חובה למלא אימייל",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "אימייל לא תקין"
                                    }
                                })}
                                type="email"
                                placeholder="הכנס אימייל"
                                autoComplete="email"
                                className={errors.email ? "invalid" : ""}
                            />
                            {errors.email && (
                                <span className="error_login_user">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="login-field-group">
                            <label htmlFor="password">🔒 סיסמה:</label>
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
                            {errors.password && (
                                <span className="error_login_user">{errors.password.message}</span>
                            )}
                        </div>

                        <button type="submit" className="login-submit-btn">
                            כניסה
                        </button>
                        {errorMessage && <div className="login-details-errorSuccess">{errorMessage}</div>}
                        {successMessage && <div className="login-details-errorSuccess">{successMessage}</div>}
                    </form>
                </div>
            </div>
            <Footer />
        </>);
}

export default Login;