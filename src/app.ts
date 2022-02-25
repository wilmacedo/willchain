import Blockchain from "./models/Blockchain";
import Transaction from "./models/Transaction";
import * as elliptic from "elliptic";

const EC = new elliptic.ec("secp256k1");
const sk = EC.keyFromPrivate(
  "a77a00d1f8b835dddd6a11e7c382687575633dae736c3c8c91404a03c386c00c"
);
const address = sk.getPublic("hex");

let willcoin = new Blockchain();

const tx1 = new Transaction(address, "address2", 10);
tx1.signTransaction(sk);
willcoin.addTransaction(tx1);

console.log(`\n Starting the miner...`);
willcoin.minePendingTransactions(address);

console.log(`\nBalance of will is ${willcoin.getBalanceOfAddress(address)}`);
