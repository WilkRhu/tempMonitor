import { SetupServer } from './server';

export async function main() {
    const app = new SetupServer(process.env.PORT);
    await app.init()
}

main();