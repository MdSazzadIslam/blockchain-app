import { IServerResponse } from "../models/block";
import axios, { AxiosResponse } from "axios";
import { config } from "dotenv";
config();

class AuthorService {
  constructor() {}
  /**
   *
   * @returns
   */
  public getBlocks = async (): Promise<any> => {
    try {
      const millSeconds: number = new Date().getTime();
      const res: AxiosResponse<IServerResponse> = await axios.get(
        process.env.BASE_URL + `blocks/${millSeconds}?format=json`
      );
      const { data } = res;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param id
   * @returns
   */
  public getBlock = async (id: string): Promise<any> => {
    try {
      const res: AxiosResponse<IServerResponse> = await axios.get(
        process.env.BASE_URL + `block/${id}?format=json`
      );
      const { data } = res;
      return data;
    } catch (err) {
      console.error(err);
    }
  };
}

export { AuthorService };
