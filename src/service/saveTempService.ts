import { pool } from '../database/database';
import { SaveTempDTO } from '../dto/saveTempDTO';
import { InterfaceHistoric } from '../interfaces/Interfacehistoric';

export class SaveTempService {

    protected async getCity(city: string): Promise<InterfaceHistoric[]> {
        const ret = await pool.query(`SELECT * FROM saveTemp WHERE city = '${city}'`)
        return Object.assign(ret[0])
    }


    protected async saveTemp(data: SaveTempDTO): Promise<any> {
        const { city_name, temp, date, time } = data;
        const saveRet = await pool.query(`INSERT INTO saveTemp (city, temp, date, time) VALUES  ('${city_name}', '${temp}', '${date}', '${time}')`)
        return Object.assign(saveRet[0])
    }

    protected async deleteCities(city: string): Promise<any> {
        return await pool.query(`DELETE FROM saveTemp WHERE city = '${city}'`)
    }

    protected async deleteHistoric(city: string): Promise<InterfaceHistoric[]> {
        const ret = await pool.query(`UPDATE saveTemp SET temp = ${0}, date = '', time = '' WHERE city = '${city}'`)
        return await this.getCity(city)
    }

    protected async returnHistoric(cities: string): Promise<any> {
        try {
            const historic = await this.getCity(cities);
            const arrayHistoric: Array<[]> = []
            if (historic.length !== 0) {
                historic.forEach((element: any) => {
                    const data = {
                        date: element.date + ' ' + element.time,
                        degrees: element.temp
                    }
                    arrayHistoric.push(Object.assign(data))
                });
                return {
                    city: cities,
                    temperatures: arrayHistoric
                }
            }
            return 'There is no history for the city informed!'

        } catch (error) {
            return error.message
        }
    }

}


