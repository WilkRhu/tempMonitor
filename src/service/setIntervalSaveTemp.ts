import * as ls from 'local-storage';
import HgBrasil from '../client/hgBrasil';
import { getCity, saveTemp } from './saveTempService';

const city: Array<[]> = [];
async function setTimeSaveTemp(cities: string, dates: Date) {
    ls.set('@city', cities)
    city.push(ls.get('@city'))
    if (cities) {
        const retGetCity = await getCity(cities, 'saveTemp')
        if (retGetCity.length != 0) {
            return {
                message: 'Já existe um histórico referente pra essa cidade acesse a rota para excluir e criar um novo'
            }
        }
    }
    const resultApi = await new HgBrasil().hgTemperature(`${cities ? cities : city[0]}`)
    ls.set('@key', dates ? dates.getTime() : ls.get('@key'))
    const dateNew = new Date();
    const addDate = dateNew.setTime(parseInt(ls.get('@key')) + (1 * 60 * 1000))
    if (new Date().getTime() < addDate) {
        await saveTemp(resultApi)
        console.log('cadastrou')
        await interval(1)
        return {
            message: `Será criado um histórico da cidade ${cities} dentro de 30 horas, retorne para verificar depois de ${format_time(addDate)}`
        };
    } else {
        while (city.length) {
            city.pop();
        }
        console.log(city)
        await interval(0)
        return { message: 'Final da criacao do plano' };

    }

}

const interval = async (verify: number) => {
    const interval = setTimeout(setTimeSaveTemp, 30000)
    if (verify === 0) clearTimeout(interval)

}

function format_time(time: any) {
    const date = new Date(time)
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return day + '/' + month + '/' + year + ' as ' + hours + ':' + minutes

}

export { setTimeSaveTemp };

