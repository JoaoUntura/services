import { prisma } from "@/lib/prisma";



export async function POST(request) {
    const data = await request.json();
    const userData = data.userData
    const servicoSelecionado = data.servicoSelecionado

   const final = new Date (userData.data_inicio); 

    servicoSelecionado.map(d=>{

      
      const [horas, min] = formatarTempo(new Date(d.tempo));
  
      final.setHours(final.getHours() + horas);

      final.setMinutes(final.getMinutes() + min);
  

    })


    const agendamento = {...userData, data_fim:final.toISOString(), id_user:parseInt(servicoSelecionado[0].id_user)}
    console.log(agendamento)
    const agendamentoDb = await prisma.agendamentos.create({data:agendamento})
  

    await Promise.all(servicoSelecionado.map(async d => {
        d = {id_agendamento : agendamentoDb.id, id_servicos:parseInt(d.id)}
        await prisma.agendamentos_servicos.create({data:d}) 

    }))

        return new Response({
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
    }
    


    function formatarTempo(dataHora) {
      return dataHora.toISOString().slice(11, 16).split(':').map(Number); // Extrai "HH:MM" do formato ISO
    }
    



