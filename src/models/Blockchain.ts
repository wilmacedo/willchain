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
    return new Block(Date.parse("2017-10-01"), [], "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string): void {
    const rewardTx = new Transaction(
      "",
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTx);

    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transaction: Transaction) {
    if (!transaction.getSender() || !transaction.getReceiver()) {
      throw new Error("sender or receiver is not filled");
    }

    if (!transaction.isValid()) {
      throw new Error("cannot add invalid transaction to chain");
    }

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

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

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
