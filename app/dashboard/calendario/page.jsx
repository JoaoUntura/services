import Calendar from "./component";
import { getAgendamentos } from "@/app/funcs/agendamentosCrud/getAgendamentos";


export default async function Page(){
    const events =  await getAgendamentos(1);

    return(
        <div className="w-full h-full flex flex-col items-center">
            <Calendar events={events}></Calendar>
        </div>
        
    );

}