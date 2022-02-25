import Block from "./Block";
import Transaction from "./Transaction";

class Blockchain {
  private chain: Block[];
  private difficulty: number;
  private pendingTransactions: Transaction[];
  private miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock(): Block {
    return new Block(new Date(2017, 10, 1, 0).getTime(), []);
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string): void {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction("", miningRewardAddress, this.miningReward),
    ];
    // this.miningReward += 150;
  }

  createTransaction(transaction: Transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address: string) {
    let balance = 0;

    for (const block of this.chain) {
      for (const transactions of block.getTransactions()) {
        if (transactions.getSender() === address) {
          balance -= transactions.getAmount();
        }

        if (transactions.getReceiver() === address) {
          balance += transactions.getAmount();
        }
      }
    }

    return balance;
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
