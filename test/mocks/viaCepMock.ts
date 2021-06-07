import * as faker from 'faker';
import { InterfaceViaCep } from "../interfaces/InterfaceViaCep";

export const viaCepSuccess: InterfaceViaCep = {
    cep: faker.address.cityPrefix(),
    logradouro: faker.address.streetPrefix(),
    complemento: faker.address.streetAddress(),
    bairro: faker.address.direction(),
    localidade: faker.address.streetName(),
    uf: faker.address.state(),
    ibge: faker.lorem.lines(),
    gia: faker.address.cardinalDirection(),
    ddd: faker.phone.phoneFormats(),
    siafi: faker.lorem.lines()
}