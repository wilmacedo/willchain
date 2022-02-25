import Block from "./models/Block";
import Blockchain from "./models/Blockchain";
import Transaction from "./models/Transaction";

let willcoin = new Blockchain();

willcoin.createTransaction(new Transaction("address1", "address2", 100));
willcoin.createTransaction(new Transaction("address2", "address1", 50));

console.log(`\n Starting the miner...`);
willcoin.minePendingTransactions("will-address");

console.log(
  `\nBalance of will is ${willcoin.getBalanceOfAddress("will-address")}`
);

console.log(`\n Starting the miner again...`);
willcoin.minePendingTransactions("will-address");

console.log(
  `\nBalance of will is ${willcoin.getBalanceOfAddress("will-address")}`
);
