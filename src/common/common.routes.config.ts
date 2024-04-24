import * as express from 'express';

export abstract class CommonRoutesConfig {
  _app: express.Application;
  _name: string;

  constructor(app: express.Application, name: string) {
    this._app = app;
    this._name = name;
    this.configureRoutes();
  }

  getName() {
    return this._name;
  }

  abstract configureRoutes(): express.Application;
}
