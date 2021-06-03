import * as dotenv from 'dotenv';
import { SetupServer } from './server';
dotenv.config()

async function main() {
    const app = new SetupServer(process.env.PORT || 3000);
    await app.init()
}

main();