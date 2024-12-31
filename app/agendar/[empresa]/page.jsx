import { getDadosEmpresa } from "@/app/funcs/getDadosEmpresa";
import Formulario from "../components/formulario";

export default async function Page({params}){
    const empresa = (await params ).empresa
    const empresaData = await getDadosEmpresa(empresa) || [];


    return(
        
        <Formulario servicos={empresaData.servicos} endereco={empresaData.endereco} empresa={empresa}></Formulario>

    );

}