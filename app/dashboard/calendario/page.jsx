import Calendar from "./component";
import { getHorarios } from "@/app/funcs/getHorarios";

export default async function Page(){
    const events =  await getHorarios(1);


    return(
        <div className="w-full h-full flex flex-col items-center">
            <Calendar events={events}></Calendar>
        </div>
        
    );

}