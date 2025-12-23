import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/roleContext";

interface GuardNotAgentProps {
    
}
 
const GuardNotAgent = () => {
    const {state}=useContext(UserContext);
    const role= state.user?.role;
    if(role =="agent")
    {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
}
 
export default GuardNotAgent;