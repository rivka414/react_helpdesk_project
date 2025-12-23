import { useContext} from "react";
import { UserContext } from "../context/roleContext";
import { Navigate, Outlet } from "react-router-dom";

interface GuardRoleProps {
   
}
 
const GuardRole = () => {
     const { state } = useContext(UserContext);
     const role= state.user?.role;
     if(role!="admin")
     {
         return <Navigate to="/dashboard" replace />;
     }

  
       return <Outlet />;
}
 
export default GuardRole;