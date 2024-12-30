import { prisma } from "@/lib/prisma";



export async function POST(request) {
    const data = await request.json();
    const userData = data.userData
    const servicoSelecionado = data.servicoSelecionado


    const agendamento = {...userData, id_user:parseInt(servicoSelecionado[0].id_user)}
   
    const agendamentoDb = await prisma.agendamentos.create({data:agendamento})
  

    await Promise.all(servicoSelecionado.map(async d => {
        d = {id_agendamento : agendamentoDb.id, id_servicos:parseInt(d.id)}
        await prisma.agendamentos_servicos.create({data:d}) 

    }))

        return new Response(JSON.stringify(agendamentoDb.id), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
    }
    


  


