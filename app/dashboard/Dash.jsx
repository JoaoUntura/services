
import Link from 'next/link'



export default function Dash(){

    const links = [{"href":"/dashboard/table", "name":"Home"}, {"href":"/dashboard/graficos", "name":"Gráficos"}]


    return(
        <div className='bg-black flex flex-col items-center pt-10  shadow-lg shadow-slate-500 rounded-r-lg h-full w-56 fixed top-0 left-0'>
            {links.map(l => (
                <Link key={l.name} href={l.href}>{l.name}</Link> 
            ))}
        
        </div>
    )
}