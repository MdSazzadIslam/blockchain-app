import http from "../config";
import Response from "../models/response";

class BlockService {
  baseURL: string;
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL + "/blocks";
  }

  public async getBlocks<T>(): Promise<Response> {
    debugger;
    let res = await http
      .get<Array<T>>(this.baseURL)
      .then((response: any) => {
        const result = response.data;

        if (result && result.message) {
          return new Response(true, result.payload as Array<T>, "Success", "");
        } else {
          const msg =
            result.messageList && result.messageList.length > 0
              ? result.messageList[0].text
              : "Error";
          return new Response(false, null, "Error", msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, "Error", error);
      });

    return res;
  }

  public async getBlock<T>(param: any): Promise<Response> {
    let res = await http
      .get<T>(this.baseURL + `/${param}`)
      .then((response: any) => {
        const result = response.data;
        if (result && result.message) {
          return new Response(true, result.payload, "Success", "");
        } else {
          const msg =
            result.messageList && result.messageList.length > 0
              ? result.messageList[0].text
              : "Error";
          return new Response(false, null, "Error", msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, "Error", error);
      });
    return res;
  }
}

export default new BlockService();
