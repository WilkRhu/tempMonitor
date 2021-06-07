import { ClientRequestError } from "../../../src/client/hgBrasil"

describe('', () => {
    it('test class ClientRequestError', async () => {
        const clientError = await new ClientRequestError('Message Error')
        expect(clientError.message).toBe('Unexpected error when trying to communicate to HgBrasil: Message Error')
    })
})