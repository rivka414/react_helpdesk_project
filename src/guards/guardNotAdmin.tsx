import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../context/roleContext";

interface GuardNotAdminProps {
    
}
 
const GuardNotAdmin = () => {
    const {state}=useContext(UserContext);
    const role= state.user?.role;
    if(role =="admin")
    {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
}
 
export default GuardNotAdmin;