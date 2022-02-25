import SHA256 from "crypto-js/sha256";
import Transactions from "./Transaction";

class Block {
  private timestamp: number;
  private transactions: Transactions[];
  private previousHash: string;
  private hash: string;
  private nonce: number;

  constructor(
    timestamp: number,
    transactions: Transactions[],
    previousHash: string = ""
  ) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(): string {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  getHash(): string {
    return this.hash;
  }

  setHash(hash: string): void {
    this.hash = hash;
  }

  getPreviousHash(): string {
    return this.previousHash;
  }

  setPreviousHash(previousHash: string): void {
    this.previousHash = previousHash;
  }

  setTransactions(transactions: any): void {
    this.transactions = transactions;
  }

  getTransactions(): Transactions[] {
    return this.transactions;
  }

  mineBlock(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
  }
}

export default Block;
