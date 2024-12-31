'use server';

export async function getDadosEmpresa(empresa) {
    const response = await fetch(`http://localhost:3000/api/dados/${empresa}`)
    const servicos = await response.json()
  
    return servicos
}