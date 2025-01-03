'use client';

import { IoPersonCircle } from "react-icons/io5";
import { login } from "../auth/auth";
import { useActionState } from "react";

export default function Page(){

    const [state, action] = useActionState(login, undefined);

    return(
        <div className="flex flex-col justify-center items-center h-2/4 mt-20">
            
            <form action={action} className="flex flex-col justify-center items-center">
                <IoPersonCircle className="mb-5" size="7em" ></IoPersonCircle>
                <input type="text" placeholder="Email" name='email' required className="mb-6 w-64 p-1"></input>
                <input type="password" placeholder="Senha" name='senha' required className="mb-6 w-64 p-1"></input>
                <button type='submit' className="text-white bg-black px-12 py-3 rounded-lg">Login</button>
                {state?.message && <p className="mt-5">{state.message}</p>}
               
            </form>
           
        </div>
    )

}

/* 
{
"email":"teste",
"senha":"123"
}

*/