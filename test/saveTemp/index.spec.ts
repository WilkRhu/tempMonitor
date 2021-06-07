import request from 'supertest';
import { SaveTempController } from '../../src/controller/saveTemp.controller';
import { pool } from '../../src/database/database';
import { SetupServer } from '../../src/server';

let server: any;
let create: any;
beforeAll(async () => {
    const saveTempController = new SaveTempController();
    server = await new SetupServer(process.env.PORT);
    server.addControllers([saveTempController])
    create = await request(server.app).post(`/cities/Recife`)
})

describe('/POST', () => {
    it('should success on create saveTemp', async () => {
        expect(create.body.message).toBe('A history of the city will be created Recife within 30 hours, return to check after')
        expect(create.status).toBe(201)
    })


    it('should error already a history', async () => {
        const newCreate = await request(server.app).post('/cities/Recife')
        expect(newCreate.body.message).toBe('There is already a history for this city, access the route to delete and create a new one')
        expect(newCreate.status).toBe(400)
    })
});

describe('/GET', () => {
    it('should success return historic city', async () => {
        const historic = await request(server.app).get('/cities/Recife');
        expect(historic.status).toBe(200);
        expect(historic.body.city).toBe('Recife')
    })

    it('should error return historic city', async () => {
        const historic = await request(server.app).patch('/cities/');
        expect(historic.body).toEqual({})
    })
})

describe('/PATCH', () => {
    it('should delete historic city', async () => {
        const historic = await request(server.app).patch('/cities/Recife');
        expect(historic.status).toBe(200);
        expect(historic.body[0].date).toEqual('')
        expect(historic.body[0].temp).toEqual(0)
        expect(historic.body[0].time).toEqual('')
    })

    it('should error historic city', async () => {
        const historic = await request(server.app).get('/cities/');
        expect(historic.body).toEqual({})
    })
})

describe('/DELETE', () => {
    it('should delete city', async () => {
        const historic = await request(server.app).delete('/cities/Recife');
        expect(historic.status).toBe(200);
        expect(historic.body.message).toBe('Deleted register of the city Recife')
    })

    it('should error return historic city', async () => {
        const historic = await request(server.app).get('/cities/');
        expect(historic.status).toBe(404)
        expect(historic.body).toEqual({})
    })
})


afterAll(async () => {
    await pool.query('DELETE FROM saveTemp')
    await process.on('SIGTERM', () => {
        server.close()
    })
})