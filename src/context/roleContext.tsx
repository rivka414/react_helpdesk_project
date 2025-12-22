import { createContext, useEffect, useReducer, type FunctionComponent, type ReactNode } from "react";
import { getMe } from "../services/api.service";

interface RoleContextProps {
  children: ReactNode;
}
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
interface State {
  user: User | null;
}
type Action = { type: "SET_USER"; payload: User | null};
const initialState: State = { user: null };
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
interface UserContextType {
  state: State;
  setUser: (user: User | null) => void;
}
export const UserContext = createContext<UserContextType>({
  state: initialState,
  setUser: () => {},
});


const RoleContext: FunctionComponent<RoleContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
 const setUser = (user: User | null) => {
    dispatch({ type: "SET_USER", payload: user });
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await getMe(token);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);
  return (<>
    <UserContext value={ {state, setUser} }>{children}</UserContext>
  </>);
}

export default RoleContext;