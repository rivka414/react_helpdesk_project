import type { FunctionComponent } from "react";
import Header from "./header";
import Footer from "./footer";
import { Link } from "react-router-dom";
import "../css/error.css";

interface ErrorProps {

}

const Error: FunctionComponent<ErrorProps> = () => {
    return (<>

        <Header />
        <div className="error-page-wrapper">
            <div className="error-container">
                <div className="error-icon">🔍</div>
                <h1 className="error-code">404</h1>
                <h2 className="error-title">אופס! נראה שהלכת לאיבוד</h2>
                <p className="error-text">
                    הדף שחיפשת לא נמצא. ייתכן שהכתובת שגויה או שהדף הועבר למקום אחר.
                    <br />
                    אל דאגה, אנחנו כאן כדי לעזור לך לחזור למסלול.
                </p>
                <Link to="/ticketList" className="back-home-btn">
                    חזרה לרשימת הכרטיסים
                </Link>
            </div>
        </div>
        <Footer /></>);
}

export default Error;