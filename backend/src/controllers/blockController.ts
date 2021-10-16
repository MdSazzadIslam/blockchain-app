import { IBlock } from "../models/block";
import { Request, Response } from "express";
import { AuthorService } from "../services/blockService";
import { Cache } from "../utils/cache";

class BlockController {
  public authorService: AuthorService;
  public cache: Cache;

  constructor() {
    this.authorService = new AuthorService();
    this.cache = new Cache();
  }
  /**
   * Get list of blocks
   * @route GET
   * @param req
   * @param res
   * @returns http response
   */
  public getBlocks = async (req: Request, res: Response) => {
    try {
      let limit: number = 20;
      let offset: number = 0;

      if (typeof req.query.limit !== "undefined") {
        limit = parseInt(req.query.limit as string);
      }

      if (typeof req.query.offset !== "undefined") {
        offset = parseInt(req.query.offset as string);
      }

      const response: IBlock[] = await this.authorService.getBlocks();
      if (response) {
        return res.status(200).send({ message: "success", payload: response });
      } else {
        return res.status(200).send({ message: "No record found" });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error occured while retriving  the data " + err.message,
      });
    }
  };

  /**
   * Get details for a block
   *@route GET /:id
   * @param req
   * @param res
   * @returns http response
   */
  public getBlock = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const cacheResponse: IBlock = await this.cache.getObject(id);
      if (cacheResponse) {
        return res
          .status(200)
          .send({ message: "success", payload: cacheResponse });
      } else {
        const response: IBlock = await this.authorService.getBlock(id);
        if (response) {
          await this.cache.setObject(id, response);
          return res
            .status(200)
            .send({ message: "success", payload: response });
        } else {
          return res
            .status(200)
            .send({ message: `No record found with this id = ${id}` });
        }
      }
    } catch (err) {
      res.status(500).send({
        message: "Error occured while retriving  the data " + err.message,
      });
    }
  };
}

export { BlockController };
