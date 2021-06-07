import axios, { AxiosStatic } from 'axios';
import { InternalError } from '../utils/errors/internal-error';

export class ViaCepResponseError extends InternalError {
    constructor(message: string) {
        const internalMessage =
            'Unexpected error returned by the ViaCep service';
        super(`${internalMessage}: ${message}`);
    }
}

export class ClientRequestError extends InternalError {
    constructor(message: string) {
        const internalMessage = `Unexpected error when trying to communicate to ViaCep`;
        super(`${internalMessage}: ${message}`);
    }
}

export default class ViaCep {
    constructor(protected request: AxiosStatic = axios) { }

    public async viaCep(cep: string) {
        try {
            const response = await this.request.get(`https://viacep.com.br/ws/${cep}/json/`);
            return response.data
        } catch (err) {
            if (err.response && err.response.status) {
                throw new ViaCepResponseError(
                    `Error: ${JSON.stringify(err.response.data)} Code: ${err.response.status
                    }`
                );
            }
            throw new ClientRequestError(err.message);
        }
    }
}