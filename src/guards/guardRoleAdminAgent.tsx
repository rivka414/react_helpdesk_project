import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/roleContext";

interface GuardRoleAdminAgentProps {
    
}
 
const GuardRoleAdminAgent = () => {
    const {state}=useContext(UserContext);
    const role= state.user?.role;
    if(role =="customer")
    {
        return <Navigate to="/dashboard" replace />;
    }
    
    return <Outlet />;
}
 
export default GuardRoleAdminAgent;