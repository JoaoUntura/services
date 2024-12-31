'use server';

export async function getAgendamentos(empresa) {
    const response = await fetch(`http://localhost:3000/api/agendamentos/${empresa}`)
    const horarios = await response.json()
  
    return horarios
}