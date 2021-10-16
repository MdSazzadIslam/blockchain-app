export interface IBlock {
  hash: string;
  height: number;
  time: number;
  blockIndex: number;
  size: number;
  bits: number;
  weight: number;
  mrklRoot: number;
  nonce: number;
}

export interface IServerResponse {
  msg: string;
  status: string;
  blocks: IBlock[];
  block?: IBlock;
  count: number;
  next: string;
  previous: string;
}

export interface IBlockParams {
  page?: number;
  limit?: number;
}
