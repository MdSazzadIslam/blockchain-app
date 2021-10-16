import { HasId } from "./hasId";
export interface IBlock extends HasId {
  hash: string;
  height: number;
  time: number;
  blockIndex: number;
  size: number;
  bits: number;
  weight: number;
  mrkl_root: number;
  prev_block: number;
  nonce: number;
}

export interface IApiResponse {
  msg: string;
  status: string;
  blocks: IBlock[];
  block?: IBlock;
  count: number;
  next: string;
  previous: string;
}

export interface IErrors {
  [key: string]: string[];
}
