import { prisma } from "@/lib/prisma";

export async function GET(request, {params}) {
    const {empresa} = await params;
   
    const servicos = await prisma.servicos.findMany({where: {id_user:parseInt(empresa)}});   

    return new Response(JSON.stringify(servicos),{
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request) {
  const service = await request.json()
  console.log(service)
  const servico = await prisma.servicos.create({data:service});   

  return new Response(JSON.stringify(servico), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request, {params}) {
  const {empresa} = await params;
  
  await prisma.servicos.delete({where:{id:parseInt(empresa)}});   

  return new Response(JSON.stringify("Service deleted!"), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}


export async function PATCH(request) {
  const service = await request.json();
  const { id, ...data } = service;

  const servicoAtualizado = await prisma.servicos.update({
    where: { id: parseInt(id) },
    data,
  });
  
  return new Response({
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}