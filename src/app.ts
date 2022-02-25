import Block from "./models/Block";
import Blockchain from "./models/Blockchain";

let willcoin = new Blockchain();

willcoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
willcoin.addBlock(new Block(2, "12/07/2017", { amount: 10 }));
