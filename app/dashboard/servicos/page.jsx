import { getServicos } from "@/app/funcs/servicosCrud/getServicosEmpresa";
import TableServices from "./component";


export default async function Page(){
    const services = await getServicos(1)


    return(

        <div className="w-full h-full flex flex-col items-center">
             <TableServices services={services}></TableServices>
        </div>
        
    );

}