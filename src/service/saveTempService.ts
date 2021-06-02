import { pool } from '../database/database'

export const getAll = async (table: string) => {
    return await pool.query(`SELECT * FROM ${table}`)
}

export const getOne = async (id: number, table: string) => {
    return await pool.query(`SELECT * FROM ${table} WHERE id = ${id}`)
}

export const getCity = async (city: string, table: string) => {
    const ret = await pool.query(`SELECT * FROM ${table} WHERE city = '${city}'`)
    return Object.assign(ret[0])
}


export const saveTemp = async (data: any) => {
    const { city_name, temp, date, time } = data;
    return await pool.query(`INSERT INTO saveTemp (city, temp, date, time) VALUES  ('${city_name}', '${temp}', '${date}', '${time}')`)
}

export const deleteCities = async (city: string) => {
    return await pool.query(`DELETE FROM saveTemp WHERE city = '${city}'`)
}