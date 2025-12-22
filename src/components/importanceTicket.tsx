import { useEffect, useState, type FunctionComponent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getPriorities, updatePriority } from "../services/api.service";
import Header from "./header";
import Footer from "./footer";
import "../css/importanceTicket.css";

interface ImportanceTickectProps {

}
interface ImportanceFormProps {
    id: number;
    name: string | null;
}

const ImportanceTickect: FunctionComponent<ImportanceTickectProps> = () => {
    const { id } = useParams();
    const { register, handleSubmit } = useForm<ImportanceFormProps>();
    const [data, setData] = useState<ImportanceFormProps[]>([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    useEffect(() => {
        const priorities = async () => {
            try {
                if (!token) {

                    return;
                }
                setData(await getPriorities(token));
            } catch (error) {
                console.error("Error fetching priorities:", error);
            }
        }
        priorities();
    }, []);

    const onSubmit: SubmitHandler<ImportanceFormProps> = async (data) => {
        try {
            if (!token) {

                return;
            }
            await updatePriority(id as string, data.id, token);
            setSuccessMessage("רמת הדחיפות של הכרטיס שונתה בהצלחה");
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
        <div className="main_container_important">
            <form onSubmit={handleSubmit(onSubmit)} className="form_important">
                <h2 className="h2_important">שינוי רמת דחיפות לכרטיס מספר: {id}</h2>
                <div className="select_important">
                    <select {...register("id", { required: true, valueAsNumber: true })}>
                        <option value="" className="option_important">-- בחר עדיפות --</option>
                        {data.map((priority) => (
                            <option key={priority.id} value={priority.id} className="option_important">
                                {priority.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="button_important">שנה רמת דחיפות</button>
                {successMessage && <div className="success_important_message">{successMessage}</div>}
            </form>
        </div>
        <Footer />
    </>);
}

export default ImportanceTickect;