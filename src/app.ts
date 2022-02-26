import Blockchain from "./models/Blockchain";
import Transaction from "./models/Transaction";
import Account from "./models/Account";
import Storage from "./storage";

const account = new Account();
Storage.loadDatabase();

let instance = new Blockchain();

const tx1 = new Transaction(account.getAddress(), "address2", 10);
tx1.signTransaction(account.getKeyPair());
instance.addTransaction(tx1);

// console.log(`\n Starting the miner...`);
instance.minePendingTransactions(account.getAddress());

// console.log(
//   `\nBalance of will is ${instance.getBalanceOfAddress(account.getAddress())}`
// );
