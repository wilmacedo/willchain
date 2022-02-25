import SHA256 from "crypto-js/sha256";

class Block {
  private index: number;
  private timestamp: string;
  private data: any;
  private previousHash: string;
  private hash: string;

  constructor(
    index: number,
    timestamp: string,
    data: any,
    previousHash: string = ""
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }

  getHash() {
    return this.hash;
  }

  setHash(hash: string) {
    this.hash = hash;
  }

  setPreviousHash(previousHash: string) {
    this.previousHash = previousHash;
  }
}

export default Block;
