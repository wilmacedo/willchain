import Block from "./Block";

class Blockchain {
  private chain: Block[];
  private difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock(): Block {
    return new Block(0, "01/01/2017", "Genesis Block");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block: Block): void {
    block.setPreviousHash(this.getLatestBlock().getHash());
    block.mineBlock(this.difficulty);

    this.chain.push(block);
  }

  isChainValid(): boolean {
    // index 0 is genesis block
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.getHash() !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.getPreviousHash() !== previousBlock.getHash()) {
        return false;
      }
    }

    return true;
  }

  getChain(): Block[] {
    return this.chain;
  }
}

export default Blockchain;
