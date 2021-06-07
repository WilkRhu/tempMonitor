import request from 'supertest';
import { ViaCepController } from '../../src/controller/viaCep.controller';
import { pool } from '../../src/database/database';
import { SetupServer } from '../../src/server';
import { viaCepSuccess } from '../mocks/viaCepMock';

let server: any;
beforeAll(async () => {
    const viaCepController = new ViaCepController();
    server = await new SetupServer(process.env.PORT);
    server.addControllers([viaCepController])
})

describe('Test ViaCep', () => {
    it('should success on create viaCep', async () => {
        const create = await request(server.app).post(`/cities/cep/${55880000}`).send(viaCepSuccess)
        expect(create.status).toBe(201)
    })
})

afterAll(async () => {
    await pool.query('DELETE FROM viaCep')
    await process.on('SIGTERM', () => {
        server.close(() => {
            console.log('Process terminated')
        })
    })
})