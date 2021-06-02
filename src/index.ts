import { SetupServer } from './server';

async function main() {
    const app = new SetupServer(3000);
    await app.init()
}

main();