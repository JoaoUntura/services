'use client';

import { use, useState } from "react";
import Modal from "./modal";

export default function Formulario({servicos}){
    
    const [servicoSelecionado, setServico] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [userData, setUserData] = useState({data_inicio:null, email:null, numero:null, nome_cliente:null})

    const addServico = (servicoObject) => {
        if (!servicoSelecionado.includes(servicoObject)){

            setServico(prev => ([...prev, servicoObject]))
            setModalOpen(false)
        }
       
    }

    const deleteServico = (servicoObject) => {
        if (servicoSelecionado.includes(servicoObject)){

            setServico(prev => (prev.filter(s => s !== servicoObject)))
         
        }
    }

    const changeUserData = (field, value) =>{
        setUserData(prev=> ({...prev, [field]:value}))
        
    }

    const submitForm = async() =>{

        await fetch("/api/agendamentos", {method:'POST', headers:{'Content-Type': 'application/json'}, body:JSON.stringify({userData:userData,servicoSelecionado:servicoSelecionado})})

    }

    return(
        <div className="w-full flex flex-col justify-center items-center h-2/4 mt-20">
        <button className="mb-5" onClick={()=>setModalOpen(true)} className="text-white bg-black text-center px-8 py-2 rounded-lg">Adicionar serviço</button>

        <table className="rounded p-3 shadow-md w-1/6 my-7">
            <tbody>
                {servicoSelecionado.map((s)=> (
                    <tr key={s.id + "_row"} className="border-b">
                        <td key={s.id} className="py-3 px-4 w-52" >{s.nome}</td>
                        <td className="py-3 px-4 w-36" key={s.preco} >R$ {s.preco}</td>
                        <td key={s.id + "_button"}onClick={()=>deleteServico(s)} className="py-3 px-4 w-3" ><button>X</button></td>
                        
                    </tr>
                    ))}
            </tbody>
        </table>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>

            <table>
                <tbody>
                    {servicos.map(s => (
                        <tr key={s.id + "_row"} className="border-b">
                            <td className="py-3 px-4 w-52" key={s.id} > {s.nome}</td>
                            <td className="py-3 px-4 w-36" key={s.preco} >R$ {s.preco}</td>
                            <td key={s.id + "_button"}className="py-3 w-52 text-center"><button onClick={() => addServico(s)}>+ Adicionar</button></td>
                        </tr>
                    ))}
                </tbody>
               

            </table>
        
        </Modal>
            <input type="text" placeholder="Nome completo" name='nome' onChange={(e) => changeUserData("nome_cliente", e.target.value)} className="mb-6 w-64 p-1"></input>
            <input type="email" placeholder="Email" name='email' onChange={(e) => changeUserData("email", e.target.value)} className="mb-6 w-64 p-1"></input>
            <input type="tel" placeholder="Celular" name='numero' onChange={(e) => changeUserData("numero", e.target.value)} className="mb-6 w-64 p-1"></input>

            <input type="datetime-local" placeholder="Data" name='data' onChange={(e) => {
                const localDate = new Date(e.target.value); // Data local do usuário
                const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000); // Converte para UTC
                changeUserData("data_inicio", utcDate.toISOString()); // Envia como ISO UTC
            }}  className="mb-6 w-64 p-1"></input>


        <button onClick={()=>submitForm()} className="text-white bg-black px-12 py-3 rounded-lg">Agendar</button>

        </div> 
       

    );

}