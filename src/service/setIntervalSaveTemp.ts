/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as ls from 'local-storage';
import { body } from '../../test/mocks/mockSaveTemp.json';
import HgBrasil from '../client/hgBrasil';
import { SaveTempService } from './saveTempService';
export class SetTime extends SaveTempService {
    public async setTimeSaveTemp(cities: string, dates: Date): Promise<any> {
        const city: Array<[]> = [];
        try {
            if (cities) {
                const retGetCity = await this.getCity(cities)
                if (retGetCity.length != 0) {
                    return {
                        message: 'There is already a history for this city, access the route to delete and create a new one'
                    }
                }
            }
            ls.set('@city', cities)
            city.push(ls.get('@city'))
            const resultApi = await (process.env.NODE_ENV !== 'test' ? new HgBrasil().hgTemperature(`${cities ? cities : city[0]}`) : null);
            ls.set('@key', dates ? dates.getTime() : ls.get('@key'))
            const dateNew = new Date();
            const addDate = dateNew.setTime(parseInt(ls.get('@key')) + (30 * 60 * 60 * 1000))
            if (new Date().getTime() < addDate) {
                await this.saveTemp(process.env.NODE_ENV === 'test' ? body : resultApi)
                console.log('cadastrou')
                this.interval(1)
            } else {
                while (city.length) {
                    city.pop();
                }
                console.log(city)
                this.interval(0)

            }
        } catch (error) {
            return error
        }

    }

    public interval = (verify: number) => {
        if (verify > 0) setTimeout(this.setTimeSaveTemp, 3600000)
        clearTimeout()
    }

}

