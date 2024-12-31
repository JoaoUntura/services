
import Link from 'next/link'



export default function Dash(){

    const links = [{"href":"/dashboard/servicos", "name":"Serviços"}]


    return(
        <div className='bg-[#1E2B37] flex flex-col items-center pt-10  shadow-lg shadow-slate-500 rounded-r-lg h-full w-56 fixed top-0 left-0'>

            <Link key={"home"} href={'/dashboard/calendario'} className='text-white text-2xl mr-3'>Home</Link>

            {links.map(l => (
                <Link key={l.name} href={l.href} className='text-white text-xl mt-9 mr-3'>{l.name}</Link> 
            ))}
        
        </div>
    )
}