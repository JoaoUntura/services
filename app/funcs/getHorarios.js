'use server';

export async function getHorarios(empresa) {
    const response = await fetch(`http://localhost:3000/api/horarios/${empresa}`)
    const horarios = await response.json()
  
    return horarios
}