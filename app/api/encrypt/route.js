import { prisma } from "@/lib/prisma";
const bcrypt = require('bcryptjs');

export async function POST(request) {
    const data = await request.json();
    
    const newPass = bcrypt.hash(data.senha, 10, (err, hash) => {
        if (err) {
          console.error('Erro ao gerar o hash:', err);
          return;
        }
        console.log('Senha criptografada:', hash);
      });

    return new Response(JSON.stringify(newPass),{
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
}


