'use server';

export async function createServico(data) {
  const response = await fetch('http://localhost:3000/api/servicos_crud/0', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const newService = await response.json()

  
  return newService;
}
