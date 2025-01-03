import { prisma } from "@/lib/prisma";

export async function POST(request) {
    const data = await request.json();
    const user = await prisma.users.create({ data });
    return new Response({
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
}


