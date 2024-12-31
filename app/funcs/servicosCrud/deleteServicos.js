'use server';

export async function deleteServico(id) {
  const response = await fetch(`http://localhost:3000/api/servicos_crud/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = response.json()

  return data
}