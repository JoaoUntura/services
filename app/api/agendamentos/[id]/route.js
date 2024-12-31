import { prisma } from "@/lib/prisma";



export async function POST(request, {params}) {
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
    
export async function GET(request, {params}) {
    const {id} = await params;
    
    const horarios = await prisma.agendamentos.findMany({
        where: {
        id_user: parseInt(id),
        },
        select: {
        id:true,
        data_inicio:true,
        email:true,
        numero:true,
        data_fim:true,
        id_user:true,
        nome_cliente:true,
        agendamentos_servicos: {
            select: {
            servicos: {
                select: {
                nome: true,
                },
            },
            },
        },
        },
    });

    return new Response(JSON.stringify(horarios),{
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}


  
export async function DELETE(request, {params}) {
    const {id} = await params;
    
    await prisma.agendamentos.delete({where:{id:parseInt(id)}});   
  
    return new Response(JSON.stringify("Service deleted!"), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }


