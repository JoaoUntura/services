'use server';

export async function deleteAgendamento(id) {
  const response = await fetch(`http://localhost:3000/api/agendamentos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = response.json()

  return data
}