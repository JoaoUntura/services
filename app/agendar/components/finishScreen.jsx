'use client';

import { AiFillCheckCircle, AiOutlineExport  } from "react-icons/ai";
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function FinishScreen({userData,codigoAgendamento}){

    const position = [-21.946324, -46.717932];

    const handleClick = (plataform) => {
        if (plataform === 'waze'){
            const wazeUrl = `https://waze.com/ul?q=${position[0]},${position[1]}`;
            window.open(wazeUrl, "_blank"); // Abre o Waze em uma nova aba ou no app

        }else if('google'){

            
            const googleMapsUrl = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
            window.open(googleMapsUrl, "_blank"); // Abre o Google Maps em uma nova aba ou no app

        }
       

      };

    return(
        <>
            <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                    <Popup>Localização</Popup>
                </Marker>
            </MapContainer>

            <button onClick={() => handleClick('waze')} className="text-white bg-black px-12 py-3 rounded-lg mt-5 flex items-center gap-2">
                    Abrir no Waze
                    <AiOutlineExport></AiOutlineExport>
            </button>

            <button onClick={() => handleClick('google')} className="text-white bg-black px-12 py-3 rounded-lg mt-5 flex items-center gap-2">
                    Abrir no Google Maps
                    <AiOutlineExport></AiOutlineExport>
            </button>

            <div className="w-full flex flex-col items-center h-full">

                <h1 className="text-black text-xl mb-5 mt-4">Agendamento Finalizado!</h1>

                <p>Data: {dayjs(userData.data_inicio).utc().format('HH:mm DD/MM/YY')}</p>
                <p>Término estimado: {dayjs(userData.data_fim).utc().format('HH:mm DD/MM/YY')}</p>
                <p>Nome registrado: {userData.nome_cliente}</p>

                <h1 className="mt-4">Código do serviço: {codigoAgendamento}</h1>
                <p className="mb-6">Guarde esse código em caso de cancelamento</p>
                <AiFillCheckCircle color="green" size="5em" ></AiFillCheckCircle>

               
            </div>
           


        </>

    
    );

}