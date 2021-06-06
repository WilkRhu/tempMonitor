/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import HgBrasil from '@src/client/hgBrasil';
import * as ls from 'local-storage';
import { getCity, saveTemp } from './saveTempService';

const city: Array<[]> = [];
 const setTimeSaveTemp = async (cities: string, dates: Date) => {
     try {
        if (cities) {
            const retGetCity = await getCity(cities, 'saveTemp')
            if (retGetCity.length != 0) {
                return {
                    message: 'There is already a history for this city, access the route to delete and create a new one'
                }
            }
        }
        ls.set('@city', cities)
        city.push(ls.get('@city'))
        const resultApi = await new HgBrasil().hgTemperature(`${cities ? cities : city[0]}`)
        ls.set('@key', dates ? dates.getTime() : ls.get('@key'))
        const dateNew = new Date();
        const addDate = dateNew.setTime(parseInt(ls.get('@key')) + (30 * 60 * 60 * 1000))
        if (new Date().getTime() < addDate) {
            await saveTemp(resultApi)
            console.log('cadastrou')
            interval(1)
        } else {
            while (city.length) {
                city.pop();
            }
            console.log(city)
            interval(0)
    
        }
     } catch (error) {
         return error
     }

}

const interval = (verify: number) => {
    if(verify > 0) setTimeout(setTimeSaveTemp, 3600000)
    clearTimeout()
}

export { setTimeSaveTemp };

