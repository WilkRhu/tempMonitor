import ViaCep from "../../../src/client/viaCep";

describe('', () => {
    it('client success return', async () => {
        const client = await new ViaCep().viaCep('55880000');
        expect(client.cep).toBe('55880-000')
        expect(client.ddd).toBe('81')
        expect(client.localidade).toBe('Ferreiros')
    })

    it('client error return', async () => {
        try {
            await new ViaCep().viaCep('');

        } catch (error) {
            expect(error.name).toBe('ViaCepResponseError')
        }
    })
})