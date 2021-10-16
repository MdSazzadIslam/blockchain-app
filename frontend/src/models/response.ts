export default class Response {
  public status: boolean;
  public data: any;
  public messages: string;
  public exception: string;

  constructor(_status: boolean, _data: any, _msg: string, _exception: string) {
    this.status = _status;
    this.data = _data;
    this.messages = _msg;
    this.exception = _exception;
  }
}
