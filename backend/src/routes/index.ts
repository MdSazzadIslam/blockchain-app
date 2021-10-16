import { BlockRoute } from "./blockRoute";

/**
 * Init Express REST routes
 * @returns {void}
 */

class Routes {
  private prefix: string = "/api/v1/nuri";
  public routes(app): void {
    app.use(this.prefix, new BlockRoute().router);
  }
}
export { Routes };
