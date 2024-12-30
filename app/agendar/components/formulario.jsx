'use client';
import Cards from "./cards";
import {useState } from "react";
import Modal from "./modal";
import { getHorariosDia } from "@/app/funcs/getHorariosDia";
import { postAgendamento } from "@/app/funcs/postAgendamento";
import FinishScreen from "./finishScreen";


export default function Formulario({servicos, empresa}){  
    const [formCompleted, setForm] = useState(false)
    const [codigoAgendamento, setCodigo] = useState(null)
    const [horariosDisponives, setHorarios] = useState([])
    const [servicoSelecionado, setServico] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [userData, setUserData] = useState({data_inicio:null, data_fim:null, email:null, numero:null, nome_cliente:null})
    const [load, setLoading] = useState(false)
    const [isFinishScreen, setFinishScreen] = useState(false);

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

    const handleDateChange = async (value) => {
        setLoading(true);
        try {
            const tempos = servicoSelecionado.map((s) => s.tempo);
            const novosHorarios = await getHorariosDia(empresa, value, tempos);
            setHorarios(novosHorarios);
        } catch (error) {
            console.error("Erro ao carregar horários:", error);
        } finally {
            setLoading(false);
        }
    };

    const completeForm = () =>{

        if (userData.email && userData.numero && userData.nome_cliente && servicoSelecionado.length > 0){
            setForm(true)
        }else{
            alert('Complete as informações e insira pelo menos um serviço para continuar!')
        }

    }

    const submitForm = async() =>{

        try{
           const id = await postAgendamento(userData,servicoSelecionado)
           setCodigo(id);
        }catch (error){
            console.error("Erro ao dar submit:", error);
        }finally{
            setFinishScreen(true);
            
        }    

    }

    const renderLogic = () => {

        if (!formCompleted && !isFinishScreen) {

            return <>
                <div className="pt-36 w-full flex flex-col justify-start items-center h-full" >

                    <button onClick={() => setModalOpen(true)} className="text-white bg-black text-center px-8 py-2 rounded-lg">Adicionar serviço</button>

                    <table className="rounded p-3 shadow-md w-1/5 my-7">
                        <tbody>
                            {servicoSelecionado.map((s) => (
                                <tr key={s.id + "_row"} className="border-b">
                                    <td key={s.id} className="py-3 px-4 w-52" >{s.nome}</td>
                                    <td className="py-3 px-4 w-36" key={s.preco} >R$ {s.preco}</td>
                                    <td key={s.id + "_button"} onClick={() => deleteServico(s)} className="py-3 px-4 w-3" ><button>X</button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>

                        <table>
                            <tbody className="space-y-2">
                                {servicos.map(s => (
                                    <tr key={s.id + "_row"} className="border-b h-20">
                                        <td className="py-3 px-4 w-52" key={s.id} > {s.nome}</td>
                                        <td className="py-3 px-4 w-36" key={s.preco} >R$ {s.preco}</td>
                                        <td key={s.id + "_button"} className=" text-black/75 rounded-lg shadow-md border py-1 w-52 text-center"><button onClick={() => addServico(s)}>+ Adicionar</button></td>
                                    </tr>
                                ))}
                            </tbody>


                        </table>

                    </Modal>
                    <input type="text" placeholder="Nome completo" name='nome' onChange={(e) => changeUserData("nome_cliente", e.target.value)} className="mb-6 w-72 text-lg p-1 rounded"></input>
                    <input type="email" placeholder="Email" name='email' onChange={(e) => changeUserData("email", e.target.value)} className="mb-6  w-72 text-lg  p-1"></input>
                    <input type="tel" placeholder="Celular" name='numero' onChange={(e) => changeUserData("numero", e.target.value)} className="mb-6  w-72 text-lg  p-1"></input>

                    <button onClick={() => completeForm()} className="text-white bg-black px-10 py-3 rounded-lg mt-5">Próximo</button>


                </div>
               
            </>
        } else if (formCompleted && !isFinishScreen) {
            return <div className="pt-36 w-full flex flex-col justify-start items-center h-full" >
                <p>Esolha a data para o serviço: </p>
                <input className="mb-8 mt-3 text-lg" type="date" placeholder="Data" name='data' onChange={(e) => handleDateChange(e.target.value)} ></input>


                {load ? <p className="py-16">Carregando horários ...</p> : <Cards data={horariosDisponives} changeUserData={changeUserData} userData={userData}></Cards>}

                <button onClick={() => submitForm()} className="text-white bg-black px-12 py-3 rounded-lg mt-5">Agendar</button>
            </div>
        } else if (isFinishScreen) {
            return <div className="pt-8 w-full flex flex-col justify-start items-center h-full">
                    <FinishScreen userData={userData} codigoAgendamento={codigoAgendamento}></FinishScreen>
                </div>
              
        }

    }

    return (

        <div className="w-full flex flex-col justify-start items-center h-full">
            
            {renderLogic()}

        </div>


    );

}