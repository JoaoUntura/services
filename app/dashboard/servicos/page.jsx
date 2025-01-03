import { getServicos } from "@/app/funcs/servicosCrud/getServicosEmpresa";
import TableServices from "./component";
import { getUserId } from "@/app/auth/auth";


export default async function Page(){
    const userId = await getUserId()
    const services = await getServicos(userId?.userId)


    return(

        <div className="w-full h-full flex flex-col items-center">
             <TableServices services={services}></TableServices>
        </div>
        
    );

}