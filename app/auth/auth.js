
'use server';
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";


const bcrypt = require('bcryptjs');


const key = new TextEncoder().encode(process.env.JWT_SECRET || 'secreta-chave');

const cookie = {name:'session', options : {httpOnly:true, secure:true, sameSite: 'lax', path: '/'}, duration:  15 * 24 * 60 * 60 * 1000,}

export async function encrypt(payload){

    return new SignJWT(payload).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('1day').sign(key)

}


export async function decrypt(session){

    try{
        const {payload} = await jwtVerify (session, key, {algorithms:['HS256'],})
        return payload
    }catch(error){
        return null
    }

}


export async function createSession(userId){

  const expires =  new Date(Date.now() + cookie.duration)

  const session = await encrypt({userId, expires})

  const cookieStore = await cookies();

  cookieStore.set(cookie.name, session, {...cookie.options, expires})

  redirect('/dashboard/calendario')

}


export async function getUserId(){
    
    const cookieStore = await cookies();

    const cookieSession = cookieStore.get(cookie.name)?.value
    const session = await decrypt(cookieSession);

    const user = await prisma.users.findFirst({where:{id:(parseInt(session.userId))}}, {select:{active:true}})


    if (!session?.userId || !user.active){
        redirect('/login')
    }

    return {userId : session.userId}

}
  


export async function deleteSession(){
    
    const cookieStore = await cookies();

    cookieStore.delete(cookie.name)
    redirect('/login')
}


export async function login(state, formData){
    const errorMessage = {message: 'Login inválido!'}

    const emailForm = formData.get('email')
    const senhaForm = formData.get('senha')

    const user = await prisma.users.findFirst({where: {email: emailForm}})

    if (!user){
        return errorMessage
    }

   
    
    const passwordValid = await bcrypt.compare(senhaForm, user.senha)

    if(!passwordValid || !user.active){
        return errorMessage

    }{
        await createSession(user.id.toString());
    }

   
    
}
