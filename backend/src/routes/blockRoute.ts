import { Router } from "express";
import { BlockController } from "../controllers/blockController";

class BlockRoute {
  public blockController: BlockController;
  public router: Router;

  constructor() {
    this.blockController = new BlockController();
    this.router = Router();
    this.configRoutes();
  }

  public configRoutes() {
    this.router.get("/blocks", this.blockController.getBlocks);
    this.router.get("/blocks/:id", this.blockController.getBlock);
  }
}
export { BlockRoute };
