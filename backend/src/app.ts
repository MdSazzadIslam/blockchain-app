import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import logger from "./utils/logger";
import { Routes } from "./routes/index";

export class App {
  public app: express.Application;
  public routes: Routes;

  constructor() {
    this.app = express();
    this.routes = new Routes();
    this.setMiddleWare();
    this.routes.routes(this.app);
  }
  /**
   * loading all middlewares
   */
  public setMiddleWare() {
    this.app.use(logger);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
  }
}
export default new App().app;
