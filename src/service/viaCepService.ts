import { pool } from "../database/database";
import { ViaCepDTO } from "../dto/viaCepDTO";
import { InterfaceViaCep } from "../interfaces/InterfaceViaCep";

export class ViaCepService {
    protected async createViaCep(data: ViaCepDTO): Promise<InterfaceViaCep> {
        const {
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            uf,
            ibge,
            gia,
            ddd,
            siafi
        } = data
        const saveViaCep = await pool.query(`INSERT INTO viaCep (
            cep, 
            logradouro, 
            complemento, 
            bairro,
            localidade,
            uf,
            ibge,
            gia,
            ddd,
            siafi
            ) VALUES (
                '${cep}',
                '${logradouro}',
                '${complemento}',
                '${bairro}',
                '${localidade}',
                '${uf}',
                '${ibge}',
                '${gia}',
                '${ddd}',
                '${siafi}'
            )`);
        const { insertId } = Object.assign(saveViaCep[0])
        const ret = await pool.query(`SELECT * FROM viaCep WHERE id = ${insertId}`);
        return Object.assign(ret[0])
    }
}