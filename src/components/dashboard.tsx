import { useContext, type FunctionComponent } from "react";
import Header from "./header";
import Footer from "./footer";
import { UserContext } from "../context/roleContext";
import "../css/dashboard.css";

interface DashboardProps {

}

const Dashboard: FunctionComponent<DashboardProps> = () => {
    const { state } = useContext(UserContext);
    const { user } = state;

    return (<>
        <Header />
        <div className="dashboard-container">
            {user?.role == "admin" && (
                <div className="admin-view">
                    <h1 className="dashboard-title-admin">📊 לוח בקרה למנהל מערכת</h1>

                    <h3 className="welcome-message admin-color">שלום מנהל יקר: הנה אפשרויות השימוש שלך באתר.</h3>


                    <div className="options-list admin-options">
                        <p className="option-item">יכולת צפיה בכל הכרטיסים</p>
                        <p className="option-item">יכולת שינוי של הסטטוסים של הכרטיסים</p>
                        <p className="option-item">יכולת להקצות כרטיסים לagent</p>
                    </div>
                </div>
            )}
            {user?.role == "customer" && (
                <div className="customer-view">
                    <h1 className="dashboard-title-customer">ברוך הבא ללוח הבקרה שלך! כאן תוכל לנהל את כרטיסי התמיכה שלך בקלות וביעילות. השתמש בתפריט למעלה כדי לנווט בין האפשרויות השונות.</h1>
                    <h3 className="welcome-message customer-color">שלום לקוח יקר: הנה אפשרויות השימוש שלך באתר</h3>
                    <div className="options-list customer-options">
                        <p className="option-item">צפיה בכרטיסים שלך</p>
                        <p className="option-item">יצירת כרטיס חדש</p>
                        <p className="option-item">הוספת תגובות לכרטיסים קיימים</p>
                    </div>
                </div>
            )}
            {user?.role == "agent" && (
                <div className="agent-view">
                    <h1 className="dashboard-title-agent">🛠️ לוח בקרה לנציג תמיכה</h1>
                    <h3 className="welcome-message agent-color">שלום נציג יקר: הנה אפשרויות השימוש שלך באתר</h3>
                    <div className="options-list agent-options">
                        <p className="option-item">צפיה בכל הכרטיסים שהוקצו לך</p>
                        <p className="option-item">עדכון סטטוס הכרטיסים</p>
                        <p className="option-item">הוספת תגובות לכרטיסים</p>
                    </div>
                </div>
            )}
        </div>

        <Footer />
    </>);
}

export default Dashboard;