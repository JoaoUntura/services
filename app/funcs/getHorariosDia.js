'use server';

export async function getHorariosDia(empresa,dia, tempo) {

    const response = await fetch("http://localhost:3000/api/horariosDia", {method:'POST', headers:{'Content-Type': 'application/json'}, body:JSON.stringify({empresa:empresa, dia:dia, tempo:tempo})})
    const data = await response.json()

    return data
}