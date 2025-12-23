import { useContext, type FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/roleContext";
import "../css/header.css";

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    const { state } = useContext(UserContext);
    const { user } = state;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (<>
        <header className="app-header-container">
            {token &&
                <div className="header-links-group">

                    <Link className="header-nav-link" to="/dashboard">בית</Link>
                    {user?.role == 'customer' &&
                        <Link className="header-nav-link" to="/tickets/new">טופס כרטיס חדש</Link>
                    }

                    <Link className="header-nav-link" to="/ticketList">רשימת כרטיסים</Link>
                    {user?.role == 'admin' &&
                        <Link className="header-nav-link" to="/addUser">הוספת משתמש</Link>
                    }
                    <button className="logout-btn" onClick={(logOut)}>logout</button>
                </div>}
            {token &&
                <div>
                    {user?.role == 'admin' && <div className="header-user-role">Admin: {user?.name}</div>}
                    {user?.role == 'agent' && <div className="header-user-role">Support: {user?.name}</div>}
                    {user?.role == 'customer' && <div className="header-user-role">Client: {user?.name}</div>}
                </div>}
            {!token &&
                <div className="header-links-group">
                    <div>
                        <Link className="header-nav-link" to="/login">להתחברות</Link>
                    </div>
                    <div>
                        <p className="header-user-role">הנך משתמש בלתי מחובר</p>
                    </div>
                </div>

            }
        </header>
    </>);
}

export default Header;