import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';
import morgan from 'morgan';
import { SaveTempController } from './controller/saveTemp.controller';
import { ViaCepController } from './controller/viaCep.controller';
import './utils/module-alias';
export class SetupServer extends Server {
  constructor(private port?: number | string) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.settings();
    this.middleware();
    this.listen();
    this.setupController();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    
  }

  private setupController(): void {
    const saveTempController = new SaveTempController();
    const viaCepController = new ViaCepController();
    this.addControllers([saveTempController, viaCepController])
  }

  private middleware() {
    this.app.use(morgan('dev'))
  }

  private settings() {
    this.app.set('port', this.port || process.env.PORT)
  }

  async listen() {
    await this.app.listen(this.app.get('port') || process.env.PORT)
    console.log('Server on port ', this.app.get('port'))
  }

  public getApp(): Application {
    return this.app;
  }
}