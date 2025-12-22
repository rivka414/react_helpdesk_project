import { useContext, useEffect, useState, type FunctionComponent } from "react";
import { getTickets } from "../services/api.service";
import Header from "./header";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/roleContext";
import "../css/tickectList.css"
import Footer from "./footer";

interface TicketListProps {

}

const TicketList: FunctionComponent<TicketListProps> = () => {
    const token = localStorage.getItem("token");
    let [list, setList] = useState<any[]>([]);
    const { state } = useContext(UserContext);
    const { user } = state;
    const navigate = useNavigate();
    // const [filterUnassigned, setFilterUnassigned] = useState(false);
    const [filterUnassigned, setFilterUnassigned] = useState<boolean>(() => {
        const saved = localStorage.getItem("filterUnassigned");
        return saved ? JSON.parse(saved) : false;
    });
    useEffect(() => {
        localStorage.setItem(
            "filterUnassigned",
            JSON.stringify(filterUnassigned)
        );
    }, [filterUnassigned]);

    useEffect(() => {

        const getTicketsFunc = async () => {
            try {
                if (!token) {
                    navigate("/login");
                    return;
                }
                setList(await getTickets(token));
            } catch (err) {
                console.log(err);
            }
        }
        if (token) {
            getTicketsFunc();
        }
        return () => {
            localStorage.removeItem("filterUnassigned");
        };
    }, [token]);

    const displayedTickets = filterUnassigned
        ? list.filter(ticket => !ticket.assigned_to)
        : list;

    // const deleteTicketById = async (ticketId: number) => {
    //     if (!token) return;
    //     try {
    //         await deleteTicket(ticketId.toString(), token);
    //         setList(list.filter(ticket => ticket.id != ticketId));
    //     }
    //     catch (err) {
    //         alert("שגיאה במחיקת הכרטיס");
    //         console.log(err);
    //     }
    // };
    return (<>
        <Header />
        <div className="list-content-wrapper">
            {user?.role == "admin" &&
                <div className="filter-container">
                    <label className="toggle-wrapper" htmlFor="unassigned-filter">
                        <span className="toggle-label">הצג רק כרטיסים פנויים (לא משויכים)</span>
                        <div className="switch">
                            <input
                                id="unassigned-filter"
                                type="checkbox"
                                checked={filterUnassigned}
                                onChange={() => setFilterUnassigned(!filterUnassigned)}
                            />
                            <span className="slider"></span>
                        </div>
                    </label>
                </div>}
            <h1 className="list-page-title">📝 רשימת כל הכרטיסים</h1>

            {displayedTickets.length == 0 ? (
                <div className="no-tickets-message">
                    <p>🎉 אין כרטיסי תמיכה זמינים כרגע.</p>
                    <p className="sub-text">ייתכן שכל הבעיות נפתרו! נסו לרענן או לבדוק מאוחר יותר.</p>
                </div>
            ) : (
                <div className="tickets-grid">
                    {displayedTickets.map((ticket) => (
                        <div key={ticket.id} className={`ticket-card priority-${ticket.priority_name}`}>
                            <h3 className="card-subject">
                                #ID{ticket.id} - {ticket.subject}
                            </h3>
                            <p>הכרטיס: {ticket.status_name}</p>
                            <p>רמת הדחיפות היא : {ticket.priority_name}</p>
                            <p className="card-description">
                                {ticket.description}
                            </p>{ticket.assigned_to && <p className="card-description">הכרטיס שייך ל: {ticket.assigned_to_name}</p>}

                            <div className="card-footer">

                                <span className="card-timestamp">
                                    🗓️ נוצר ב: {new Date(ticket.created_at).toLocaleDateString()}
                                </span>

                                {user?.role == 'customer' && (
                                    <div>
                                        <Link className="view-details-btn" to={`/addComments/${ticket.id}`}>להוספת תגובות לכרטיס</Link>
                                    </div>
                                )}
                                {user?.role != "customer" && <Link className="view-details-btn" to={`/moreUpdateTicket/${ticket.id}`}>לפעולות נוספות</Link>}
                                <Link className="view-details-btn" to={`/ticketList/${ticket.id}`}>לצפיה בפרטים</Link>

                                {/* {user?.role == "admin" && <button className="view-details-btn" onClick={() => {
                                    deleteTicketById(ticket.id);
                                }}>למחיקת הכרטיס</button>} */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Footer />
    </>);
}

export default TicketList;