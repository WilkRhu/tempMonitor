import { getCity } from "./saveTempService";

const returnHistoric = async (cities: string) => {
    try {
        const historic = await getCity(cities, 'saveTemp');
        const arrayHistoric: Array<[]> = []
        if(historic.length !== 0) {
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

export { returnHistoric };
