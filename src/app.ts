import Blockchain from "./models/Blockchain";
import Transaction from "./models/Transaction";
import Account from "./models/Account";
import Storage from "./storage";
import { SYNC_TIMEOUT } from "./data";

Storage.loadDatabase();

let blockchainInstance = new Blockchain();
let account = new Account();

let startTimeout = new Date();
let endTimeout = new Date();

console.log("Syncing blocks...");
while (!blockchainInstance.isSynced()) {
  endTimeout = new Date();

  if ((endTimeout.getTime() - startTimeout.getTime()) / 1000 > SYNC_TIMEOUT) {
    throw new Error("Timeout error when syncing blocks...");
  }

  if (blockchainInstance.isSynced()) {
    break;
  }
}
console.log("Successfully sync chain!");

const transaction = new Transaction(account.getAddress(), "address2", 10);
transaction.signTransaction(account.getKeyPair());

blockchainInstance.addTransaction(transaction);
