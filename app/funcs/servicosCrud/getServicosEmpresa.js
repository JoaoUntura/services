'use server';

export async function getServicos(empresa) {
    const response = await fetch(`http://localhost:3000/api/servicos_crud/${empresa}`)
    const servicos = await response.json()
  
    return servicos
}