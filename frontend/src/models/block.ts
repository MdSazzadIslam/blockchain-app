export default class Block {
  Id?: string;
  hash: string;
  height: number;
  time: number;
  blockIndex: number;

  constructor(
    _id: string,
    _hash: string,
    _height: number,
    _time: number,
    _blockIndex: number
  ) {
    this.Id = _id;
    this.hash = _hash;
    this.height = _height;
    this.time = _time;
    this.blockIndex = _blockIndex;
  }
}
