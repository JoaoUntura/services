import { prisma } from "@/lib/prisma";

export async function GET(request, {params}) {
    const {empresa} = await params;
   
    const horarios = await prisma.agendamentos.findMany({
      where: {
        id_user: parseInt(empresa),
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