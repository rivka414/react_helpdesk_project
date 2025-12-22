import { useEffect, useState, type FunctionComponent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { assignTicketToAgent, getTicketById, getUsers } from "../services/api.service";
import Header from "./header";
import Footer from "./footer";
import "../css/ticketToAgent.css";

interface TicketToAgentProps {

}
interface Users {
    id: number;
    name: string;
    role: string;
    is_active: boolean;
}
interface AssignAgentForm {
    assigned_to: number;
}

const TicketToAgent: FunctionComponent<TicketToAgentProps> = () => {
    const { id } = useParams();
    const [data, setData] = useState<Users[]>([]);
    const [dataTicket, setDataTicket] = useState<any>();
    const { register, handleSubmit } = useForm<AssignAgentForm>();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        const users = async () => {
            try {
                if (!token || !id) {

                    return;
                }
                setData(await getUsers(token));
                setDataTicket(await getTicketById(id as string, token));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        users();
    }, []);

    const onSubmit: SubmitHandler<AssignAgentForm> = async (data) => {
        try {
            if (!token) {

                return;
            }
            if (!dataTicket) return <div>Loading ticket...</div>;
            else {
                await assignTicketToAgent(id as string, data.assigned_to, token);
                setSuccessMessage("הסוכן שונה בהצלחה");
                const timeout = setTimeout(() => {
                    navigate("/ticketList");
                }, 1000);
                return () => clearTimeout(timeout);
            }
        }
        catch (error) {
            console.error("Error changing status:", error);
        }
    }

    return (<>
        <Header />
        <div className="div_form_change_agent">
            <form onSubmit={handleSubmit(onSubmit)} className="form_change_agent">
                <h2 className="h2_change_agent">עדכון הסוכן לכרטיס מספר: {id}</h2>
                <div className="all_options_change_agent">
                    <select {...register("assigned_to", { required: true, valueAsNumber: true })}>
                        <option value="" className="options_change_agent">בחר סוכן</option>
                        {data.map((users) => (
                            users.role == "agent" && users.is_active == true &&
                            <option className="options_change_agent" key={users.id} value={users.id} disabled={users.id === dataTicket?.assigned_to}>
                                {users.name}{users.id === dataTicket?.assigned_to ? "(נוכחי)" : ""}
                            </option>

                        ))}
                    </select>
                </div>
                <button type="submit" className="button_change_agent">שנה סוכן</button>
                {successMessage && <div className="ticket-to-agent-success">{successMessage}</div>}
            </form>
        </div>
        <Footer />
    </>);
}

export default TicketToAgent;