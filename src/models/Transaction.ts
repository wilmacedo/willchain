import { SHA256 } from "crypto-js";
import * as elliptic from "elliptic";

const EC = new elliptic.ec("secp256k1");

class Transaction {
  private sender: string;
  private receiver: string;
  private amount: number;
  private signature: string;

  constructor(sender: string, receiver: string, amount: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.signature = "";
  }

  getSender(): string {
    return this.sender;
  }

  getReceiver(): string {
    return this.receiver;
  }

  getAmount(): number {
    return this.amount;
  }

  calculateHash(): string {
    return SHA256(this.sender + this.receiver + this.amount).toString();
  }

  signTransaction(signingKey: elliptic.ec.KeyPair): void {
    if (signingKey.getPublic("hex") !== this.sender) {
      throw new Error("cannot sign transaction of another wallet");
    }

    const txHash = this.calculateHash();
    const sig = signingKey.sign(txHash, "base64");
    this.signature = sig.toDER("hex");
  }

  isValid(): boolean {
    if (this.sender === null) {
      return true;
    }

    if (!this.signature || this.signature.length === 0) {
      throw new Error("unsigned transaction");
    }

    const publicKey = EC.keyFromPublic(this.sender, "hex");

    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

export default Transaction;
