import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);
import clsx from 'clsx';

export default function Cards({data, changeUserData, userData}){

    const submitDate = (inicio, fim) =>{
        changeUserData('data_inicio', inicio);
        changeUserData('data_fim', fim);
    }



    return(

        <div className="flex flex-col px-3 overflow-auto max-h-[60%]">

            {data.map((d) => {

                let inicio = dayjs(d.data_inicio).utc()
                let fim = dayjs(d.data_fim).utc()
                return <button key={d.data_inicio + "_key"} onClick={() => submitDate(d.data_inicio, d.data_fim)} className={clsx("text-black/75 text-lg px-12 py-3 rounded-lg shadow-md border mt-5", { 'border-4 border-green-500': userData.data_inicio === d.data_inicio })}>{` ${inicio.get('hours')}:${inicio.get('minute') === 0 ? '00' : inicio.get('minute')} - ${fim.get('hours')}:${fim.get('minute') === 0 ? '00' : fim.get('minute')} `}</button>

            }

            )}

        </div>

    
    );

}