import { useContext, useEffect, useState, type FunctionComponent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getComments, getTicketById } from "../services/api.service";
import "../css/ticketDetails.css";
import { UserContext } from "../context/roleContext";
import Header from "./header";
import Footer from "./footer";



interface TicketDetailsProps {

}
/*קריאת שרת עם הid שב url והצגה של הפרטים שלו*/
const TicketDetails: FunctionComponent<TicketDetailsProps> = () => {

    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [ticket, setTicket] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const { state } = useContext(UserContext);
    const { user } = state;
    const navigate = useNavigate();
    useEffect(() => {
        const ticketById = async () => {
            try {
                if (!token) {
                    navigate("/login");
                    return;
                }
                const data1 = await getTicketById(id as string, token);
                const comments1 = await getComments(id as string, token);
                setTicket(data1);
                setComments(comments1);

            } catch (error) {
                console.error("Error fetching ticket by ID:", error);
            }
        };
        ticketById();
    }, [token]);

    const printComments = () => {

        if (!comments.length) return <p className="noComments">אין תגובות</p>;
        return comments.map((comment: any) => {


            return (<div key={comment.id} className="comments">
                <p className={`comment-content ${comment.author_id == user?.id ? "support" : "client"}`}>
                    {comment.author_id == user?.id && `${user?.name} - התגובה שלך:`}
                    {comment.content}
                </p>
            </div>)
        })
    }
    return (<>
        <Header />
        <h1 className="title_details">פרטי כרטיס תמיכה</h1>
        <p className="content_details">כאן יוצגו פרטי כרטיס התמיכה עם ה-ID: {id}</p>
        {!ticket ? (
            <p>טוען נתונים...</p>
        ) : (
            <>
                <p className="content_details">נושא הכרטיס: {ticket.subject}</p>
                <p className="content_details">תיאור הכרטיס: {ticket.description}</p>

            </>
        )}
        <h2 className="title_details">תגובות:</h2>
        {printComments()}
        {user?.role == 'agent' &&
            <Link className="button_details" to={`/addComments/${id}`}>הוסף תגובה</Link>}
        {user?.role == 'customer' && <Link className="button_details" to={`/addComments/${id}`}>הוסף תגובה</Link>}
        <Footer />
    </>);
}

export default TicketDetails;