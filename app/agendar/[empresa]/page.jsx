import { getServicos } from "../../funcs/getServicos";
import Formulario from "../components/formulario";

export default async function Page({params}){
    const empresa = (await params ).empresa
    const servicos = await getServicos(empresa) || [];

    return(
       
        <Formulario servicos={servicos.servicos}></Formulario>

    );

}