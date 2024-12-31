'use client';

import { useState } from "react";
import Modal from "@/app/agendar/components/modal";
import { createServico } from "@/app/funcs/servicosCrud/createServico";
import { AiOutlineCloseCircle } from "react-icons/ai";

import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { deleteServico } from "@/app/funcs/servicosCrud/deleteServicos";
dayjs.extend(utc);



export default function TableServices({services}){
    const [servicesData, setServices] = useState(services)
    const [edit, setEdit] = useState(true)
    const [newService, setNewService] = useState({nome:null,  id_user:1, tempo:null,preco:null})
    const [modalOpen, setModalOpen] = useState(false)
    const headers = ["Nome", "Duração", "Preço", "Editar"]  

    const changeNewService = (field, value) => {
        setNewService(prev => ({...prev, [field]:value}))
    }

    const submitServico = async() => {
        try{
            const dbService = await createServico(newService);
            setServices(prev => ([...prev, dbService]));
        }catch(e){
            console.log(e)
        }
      
    }

    const delService = async(serviceId) => {
       const response =  await deleteServico(serviceId)
       setServices(prev => (prev.filter(s => s.id !== serviceId)) )
    }

    return(

        <div className="w-full h-full flex flex-col items-center">
             <table className="table-auto ">
                <thead>
                    <tr className="border-y">
                        {headers.map(h => (
                            <th className="p-3"key={h}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    
                {servicesData.map(s => (

                <tr key={s.id + "_receita"} className="border-y">
                <td className="py-3 px-4 pr-8 w-52 text-center"> <input className="mx-auto"  type='text' value={s.nome} readOnly={edit}/>   </td>
                <td className="py-3 px-4 pr-8 w-52 text-center"><input className="pl-2 w-28" type='text' value={dayjs(s.tempo).utc().format('HH:mm')} readOnly={edit}/>  </td>
                <td className="py-3 px-4 pr-8 w-52 text-center"><input className="pl-2 w-28" type='text' value={s.preco} readOnly={edit}/> </td>
                <td className="w-52 text-center">
                    <button onClick={() => delService(s.id)}> <AiOutlineCloseCircle size="1.5em"></AiOutlineCloseCircle> </button>

                </td>
                </tr>


                ))}
                </tbody>
            </table>

            <Modal  isOpen={modalOpen} onClose={() => setModalOpen(false)} >
                <div className="flex w-full h-full flex-col p-10 justify-center align-middle">

                <input type="text" placeholder="Nome" onChange={(e) => changeNewService("nome", e.target.value)} className="mb-6 w-72 text-lg p-1 rounded"></input>
                <p>Duração de serviço:</p>
                <input type="time" placeholder="Duração" onChange={(e) => changeNewService("tempo", `1970-01-01T${e.target.value}:00.000Z`)} className="mb-6  w-72 text-lg  p-1"></input>
                <input type="number" placeholder="Preço" onChange={(e) => changeNewService("preco", parseFloat(e.target.value))} className="mb-6  w-72 text-lg  p-1"></input>

                <button onClick={() => submitServico()} className="text-white bg-black px-10 py-3 rounded-lg mt-5">Criar</button>  

                </div>
       

            </Modal>
            <button onClick={() => setModalOpen(true)} className="text-white bg-[#1E2B37]  px-10 py-3 rounded-lg mt-5">Adicionar +</button>  

        </div>
        
    );

}