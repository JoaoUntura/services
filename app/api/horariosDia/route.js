import { prisma } from "@/lib/prisma";
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);

export async function POST(request) {

    const data = await request.json()
 
    const dia = dayjs(data.dia).utc()
    let inicio = dayjs(data.dia).utc()
    let fim = dayjs(data.dia).utc()

    const temposServicos = data.tempo


    let timeAcumulator = dayjs('2020-01-01T00:00:00.000Z').utc()
    temposServicos.map(t => {
        timeAcumulator = timeAcumulator.add(dayjs(t).utc().get('hour'), 'hour')
        timeAcumulator = timeAcumulator.add(dayjs(t).utc().get('minute'), 'minute')
    })


    let {inicio_dia, fim_dia} = await prisma.users.findUnique({where:{id: parseInt(data.empresa)}, select : {inicio_dia:true, fim_dia:true}})
    inicio_dia = dayjs(inicio_dia).utc()
    fim_dia = dayjs(fim_dia).utc()


    inicio = inicio.set('hour', inicio_dia.get('hour')).set('minute', inicio_dia.get('minute'));
    fim = fim.set('hour', fim_dia.get('hour')).set('minute', fim_dia.get('minute'));


    
    const horariosDia = await prisma.agendamentos.findMany({
        where: {
        data_inicio: {
            gte: inicio,
            lte: fim,
        },
        },
        select : {data_inicio:true, data_fim:true},
        orderBy: {
        data_inicio: 'asc',
        },
    });
    

    let intervalosLivres = []

    if (horariosDia.length === 0) {
        // Não há horários, todo o intervalo está livre
        intervalosLivres.push({ start: inicio, end: fim });
    } else if (horariosDia.length === 1) {
        // Caso com apenas um horário
        const unicoHorario = horariosDia[0];
        intervalosLivres.push({ start: inicio, end: dayjs(unicoHorario.data_inicio).utc() });
        intervalosLivres.push({ start: dayjs(unicoHorario.data_fim).utc(), end: fim });
    } else {
        // Caso com múltiplos horários
        for (let i = 0; i < horariosDia.length; i++) {
            if (i === 0) {
                // Primeiro intervalo antes do primeiro horário
                intervalosLivres.push({ start: inicio, end: dayjs(horariosDia[i].data_inicio).utc() });
            }
    
            if (i > 0) {
                // Intervalo entre o horário anterior e o atual
                if (dayjs(horariosDia[i].data_inicio).diff(horariosDia[i - 1].data_fim, 'minutes') > 0) {
                    intervalosLivres.push({
                        start: dayjs(horariosDia[i - 1].data_fim).utc(),
                        end: dayjs(horariosDia[i].data_inicio).utc()
                    });
                }
            }
    
            if (i === horariosDia.length - 1) {
                // Último intervalo após o último horário
                intervalosLivres.push({ start: dayjs(horariosDia[i].data_fim).utc(), end: fim });
            }
        }
    }
    

    

    const minutesNeed = timeAcumulator.get('hour') * 60 + timeAcumulator.get('minute');
    let disponiveis = [];
    console.log(intervalosLivres);
    for (let i = 0; i < intervalosLivres.length; i++){
      
        if(intervalosLivres[i].end.diff(intervalosLivres[i].start , 'minutes') >= minutesNeed){

            let possiveis = Math.floor(intervalosLivres[i].end.diff(intervalosLivres[i].start , 'minutes') / minutesNeed)
           
            disponiveis.push({data_inicio:intervalosLivres[i].start, data_fim:intervalosLivres[i].start.add(minutesNeed,'minutes')})

            if (possiveis > 1) {
                let inicio = intervalosLivres[i].start;
                for (let y = 1; y < possiveis; y++) {
                    disponiveis.push({
                        data_inicio: inicio.add(y * minutesNeed, 'minutes'),
                        data_fim: inicio.add((y + 1) * minutesNeed, 'minutes')
                    });
                }
            }
            
        }
    }

    return new Response(JSON.stringify(disponiveis),{
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    
  

}