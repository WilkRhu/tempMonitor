import HgBrasil from "../../../src/client/hgBrasil";

describe('', () => {
    it('client success return', async () => {
        const client = await new HgBrasil().hgTemperature('Recife');
        expect(client.city_name).toBe('Recife')
    })
})