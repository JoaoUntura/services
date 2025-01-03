import {NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { decrypt } from './app/auth/auth';
// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard/calendario','/dashboard/servicos'];
const publicRoutes = ['/login','/'];

export default async function middleware(req) {

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);


    const cookieStore = await cookies();
    const cookieSession = cookieStore.get('session')?.value
    const session = await decrypt(cookieSession);
  


  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }


  console.log('ok')
  return NextResponse.next();
}