import { useEffect, useState, type FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCommentToTicket, getTicketById } from "../services/api.service";
import { useForm } from "react-hook-form";
import Header from "./header";
import Footer from "./footer";
import "../css/addComment.css";

interface AddCommentsProps {

}
interface CommentFormProps {
    content: string;
}
const AddComments: FunctionComponent<AddCommentsProps> = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<CommentFormProps>()
    const navigate = useNavigate();

    useEffect(() => {
        const ticketById = async () => {
            try {
                // הנחה שיש פונקציה getToken שמחזירה טוקן חוקי
                if (!token) {
                    navigate("/login");
                    return;
                }
                await getTicketById(id as string, token);
            } catch (error) {
                console.error("Error fetching ticket by ID:", error);
            }
        };
        ticketById();
    }, [token]);


    const onSubmit = async (data: CommentFormProps) => {
        try {
            if (!token) {
                navigate("/login");
                return;
            }


            await addCommentToTicket(id as string, data.content, token);

            setSuccessMessage(`התגובה נשלחה בהצלחה: ${data.content}`);
            const timeOut = setTimeout(() => {
                navigate(`/ticketList`);
            }, 2000);
            return () => clearTimeout(timeOut);

        } catch (error) {
            console.error("Error adding comment to ticket:", error);
        }
    }


    return (<>
        <Header />
        <form className="add-comments-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>הוסף תגובה לכרטיס #ID{id}</h2>
            <div className="form-group" >
                <label htmlFor="content">תגובה:</label>
                <textarea
                    id="content"
                    className={errors.content ? "invalid" : ""}
                    rows={4} cols={50}
                    placeholder="הקלד את התגובה שלך כאן..."
                    {...register("content", { required: "חובה למלא תגובה" })} />
                {errors.content && (
                    <span className="error_new_comment">{errors.content.message}</span>
                )}
            </div>
            <button type="submit">שלח תגובה</button>
            {successMessage && <div className="add-comment-success">{successMessage}</div>}
        </form>
        <Footer />
    </>);
}

export default AddComments;