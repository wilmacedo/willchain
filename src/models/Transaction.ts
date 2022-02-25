class Transaction {
  private sender: string;
  private receiver: string;
  private amount: number;

  constructor(sender: string, receiver: string, amount: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
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
}

export default Transaction;
