import { prisma } from "@/lib/prisma";

export async function GET(request, {params}) {
    const {empresa} = await params;
   
    const servicos = await prisma.servicos.findMany({where: {id_user:parseInt(empresa)}});

   

    return new Response(JSON.stringify({servicos:servicos}),{
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
}