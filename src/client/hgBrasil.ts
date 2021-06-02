import axios, { AxiosStatic } from 'axios';
import { InternalError } from '../utils/errors/internal-error';

export interface SaveTemp {
  city: string,
  temp: number,
  date: string,
  time: string
}

export class SaveTempResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      'Unexpected error returned by the HgBrasil service';
    super(`${internalMessage}: ${message}`);
  }
}

export class ClientRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage = `Unexpected error when trying to communicate to HgBrasil`;
    super(`${internalMessage}: ${message}`);
  }
}

export default class HgBrasil {
  constructor(protected request: AxiosStatic = axios) { }

  public async hgTemperature(city: string) {
    try {
      const response = await this.request.get(`https://api.hgbrasil.com/weather?array_limit=2&city_name=${city}&fields=only_results,temp,city_name,time,date&key=91b35038`);
      return response.data
    } catch (err) {
      if (err.response && err.response.status) {
        throw new SaveTempResponseError(
          `Error: ${JSON.stringify(err.response.data)} Code: ${err.response.status
          }`
        );
      }
      throw new ClientRequestError(err.message);
    }
  }
}