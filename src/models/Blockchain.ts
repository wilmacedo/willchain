import Block from "./Block";

class Blockchain {
  private chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2017", "Genesis Block");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block: Block) {
    block.setPreviousHash(this.getLatestBlock().getHash());
    block.setHash(block.calculateHash());

    this.chain.push(block);
  }
}

export default Blockchain;
