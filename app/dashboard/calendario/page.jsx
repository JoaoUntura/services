import { getUserId } from "@/app/auth/auth";
import Calendar from "./component";
import { getAgendamentos } from "@/app/funcs/agendamentosCrud/getAgendamentos";


export default async function Page(){
    const userId = await getUserId()
    console.log(userId)
    const events =  await getAgendamentos(userId?.userId);

    return(
        <div className="w-full h-full flex flex-col items-center">
            <Calendar events={events}></Calendar>
        </div>
        
    );

}