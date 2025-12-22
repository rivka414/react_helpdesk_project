import { useEffect, useState, type FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { useForm, type SubmitHandler } from "react-hook-form";
import { changeTicketStatus, getStatuses } from "../services/api.service";
import "../css/changeStatus.css";

interface ChangeStatusProps {

}
interface StatusFormProps {
    id: number;
    name: string | null;

}
const ChangeStatus: FunctionComponent<ChangeStatusProps> = () => {
    const { id } = useParams();
    const { register, handleSubmit } = useForm<StatusFormProps>();
    const [data, setData] = useState<StatusFormProps[]>([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    useEffect(() => {

        const statuses = async () => {
            try {
                if (!token) {

                    return;
                }
                setData(await getStatuses(token))
            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        }
        statuses();
    }, []);
    const onSubmit: SubmitHandler<StatusFormProps> = async (data) => {
        try {
            if (!token) {

                return;
            }
            await changeTicketStatus(id as string, data.id, token);
            setSuccessMessage("סטטוס הכרטיס שונה בהצלחה");
            const timeOut = setTimeout(() => {
            navigate("/ticketList");}, 2000);
            return () => clearTimeout(timeOut);
        }
        catch (error) {
            console.error("Error changing status:", error);
        }
    }
    return (<>
        <Header />

        <div className="main_container_change_status">
            <form onSubmit={handleSubmit(onSubmit)} className="form_change_status">
                <h2 className="h2_change_status">שינוי סטטוס לכרטיס מספר: {id}</h2>
                <div className="select_change_status">
                    <select {...register("id", { required: true, valueAsNumber: true })}>
                        <option value="" className="option_change_status">בחר סטטוס</option>
                        {data.map((status) => (
                            <option key={status.id} value={status.id} className="option_change_status">
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="button_change_status">שנה סטטוס</button>
                {successMessage && <div className="change-status-success">{successMessage}</div>}
            </form>
        </div>
        <Footer />

    </>);
}

export default ChangeStatus;