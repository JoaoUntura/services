import { prisma } from "@/lib/prisma";

export async function GET(request, {params}) {
    const {empresa} = await params;
   
    const servicos = await prisma.servicos.findMany({where: {id_user:parseInt(empresa)}});
    const endereco = await prisma.users.findUnique({where :{id:parseInt(empresa)},  select:{endereco:true}})
   

    return new Response(JSON.stringify({servicos:servicos, endereco:endereco.endereco}),{
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
}