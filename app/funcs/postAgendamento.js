'use server';

export async function postAgendamento(userData,servicoSelecionado) {
    const response = await fetch("http://localhost:3000/api/agendamentos", {method:'POST', headers:{'Content-Type': 'application/json'}, body:JSON.stringify({userData:userData,servicoSelecionado:servicoSelecionado})})
    const id = await response.json()
  
    return id
}