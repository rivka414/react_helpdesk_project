import { useContext, type FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "../css/moreUpdateTicket.css";
import { UserContext } from "../context/roleContext";

interface MoreUpdateTickectProps {

}

const MoreUpdateTickect: FunctionComponent<MoreUpdateTickectProps> = () => {
    const { id } = useParams();
    const { state } = useContext(UserContext);
    const { user } = state;
    return (<>
        <Header />
        <div className="divButtonsMoreUpdate">
            <div className="containerMoreUpdate">
                <h2 className="titleMoreUpdate">ניהול פניה מספר: {id}</h2>
                <div className="buttonsGrid">
                    <Link to={`/changeStatus/${id}`} className="buttonOptionsUpdate">
                        <span>🔄</span> לעדכון סטטוס הפניה
                    </Link>
                    <Link to={`/importanceTicket/${id}`} className="buttonOptionsUpdate">
                        <span>⚠️</span> לעדכון דחיפות הפניה
                    </Link>
                    {user?.role == "admin" && <Link to={`/ticketToAgent/${id}`} className="buttonOptionsUpdate">
                        <span>👤</span> הקצאת הפניה לסוכן
                    </Link>}
                </div>
            </div>
        </div>
        <Footer />
    </>);
}

export default MoreUpdateTickect;