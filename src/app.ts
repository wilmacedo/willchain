import Block from "./models/Block";
import Blockchain from "./models/Blockchain";

let willcoin = new Blockchain();

console.log("Mining block 1...");
willcoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));

console.log("Mining block 2...");
willcoin.addBlock(new Block(2, "12/07/2017", { amount: 10 }));
