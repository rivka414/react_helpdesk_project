import { useState, type FunctionComponent } from "react";
import Header from "./header";
import Footer from "./footer";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createTicket } from "../services/api.service";
import { useNavigate } from "react-router-dom";
import "../css/newTicketForm.css";

interface NewTicketFormProps {

}
interface NewTicketForm {
    subject: string,
    description: string,
    priority_id: number
}
const NewTicketForm: FunctionComponent<NewTicketFormProps> = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<NewTicketForm>();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const onSubmit: SubmitHandler<NewTicketForm> = async (data) => {
        const token = localStorage.getItem("token");
        try {
            if (!token) {
                throw new Error("No token found");
            }
            await createTicket(data.subject, data.description, data.priority_id, token);
            setSuccessMessage(`הכרטיס נוצר בהצלחה: ${data.subject}`);
            const timeOut = setTimeout(() => {
                navigate(`/ticketList`);
            }, 2000);
            return () => clearTimeout(timeOut);
        } catch (error) {
            console.error("Failed to create ticket:", error);
        }
    }
    return (<>
        <Header />
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="form_new_ticket">
                <h2 className="title_new_ticket">פתיחת פניה חדשה</h2>

                <div className="new_ticket">
                    <label htmlFor="subject">נושא הפניה:</label>
                    <input
                        id="subject"
                        {...register("subject", { required: "חובה למלא נושא" })}
                        type="text"
                        placeholder="הכנס נושא"
                        className={errors.subject ? "invalid" : ""}
                    />
                    {errors.subject && (
                        <span className="error_new_ticket">{errors.subject.message}</span>
                    )}
                </div>

                <div className="new_ticket">
                    <label htmlFor="description">תיאור הפניה:</label>
                    <textarea
                        id="description"
                        {...register("description", { required: "חובה למלא תיאור" })}
                        placeholder="הכנס תיאור"
                        className={errors.description ? "invalid" : ""}
                    />
                    {errors.description && (
                        <span className="error_new_ticket">{errors.description.message}</span>
                    )}
                </div>
                <div className="new_ticket">
                    <label htmlFor="priority_id">רמת דחיפות</label>
                    <select {...register("priority_id")}>
                        <option value="1" className="options_form_new_ticket">נמוך</option>
                        <option value="2" className="options_form_new_ticket">בינוני</option>
                        <option value="3" className="options_form_new_ticket">גבוה</option>
                    </select>
                </div>

                <button type="submit" className="button_form_new_ticket">
                    ליצירת הכרטיס
                </button>
                {successMessage && <div className="new-ticket-success">{successMessage}</div>}
            </form>
        </div>
        <Footer />
    </>);
}

export default NewTicketForm;