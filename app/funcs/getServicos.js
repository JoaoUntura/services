'use server';

export async function getServicos(empresa) {
    const response = await fetch(`http://localhost:3000/api/servicos/${empresa}`)
    const servicos = await response.json()
  
    return servicos
}