'use client';

import FullCalendar from '@fullcalendar/react';

import timeGridPlugin from '@fullcalendar/timegrid'; // Para visualização com horários
import Modal from '@/app/agendar/components/modal';
import { useState } from 'react';

export default function Calendar({events}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedEvent, setEvent] = useState(null)

    const formatedEvents = events.map(e => ({title: e.nome_cliente, start:e.data_inicio, end:e.data_fim, extendedProps: {numero:e.numero, email:e.email, servicos:e.agendamentos_servicos.map(s => (s.servicos.nome))}}))
    console.log(formatedEvents)

    const handleEventClick = (e) =>{
        setModalOpen(true)
        setEvent(e.event)
        console.log(e.event)
    }

    return(
    <div className='w-1/2 mt-14 shadow-lg rounded-lg'>
          <FullCalendar
      plugins={[ timeGridPlugin ]}
      initialView="timeGridWeek"
      allDaySlot = {false}
      locale='pt'
      eventClick={handleEventClick}
      headerToolbar = {
        {left: 'prev,next,today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay' }// user can switch between the two
      }
      buttonText={{
        today: 'Hoje',
        timeGridWeek:'Semana',
        timeGridDay:'Dia'
      }}
       timeZone = 'UTC'
      events={formatedEvents}
    />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {
          <div className='w-72 flex flex-col justify-center items-center'>
            <p className='mb-2'>Número:  {selectedEvent?.extendedProps.numero}</p>
            <p className='mb-2'>Email:  {selectedEvent?.extendedProps.email}</p>
            <p className='mb-2' >Serviços: </p>
            {selectedEvent?.extendedProps?.servicos.map(s => (<p key={s}>{s}</p>))}
          </div>
        }

      </Modal>
    </div>
 

);
}
  
