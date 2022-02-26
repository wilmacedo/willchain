import { ec } from "elliptic";

class Account {
  private addressKeyPair: ec.KeyPair;
  private address: string;
  private privateKey: string;

  constructor(addressKeyPair: ec.KeyPair = new ec("secp256k1").genKeyPair()) {
    this.addressKeyPair = addressKeyPair;
    this.address = addressKeyPair.getPublic("hex");
    this.privateKey = addressKeyPair.getPrivate("hex");
  }

  getKeyPair(): ec.KeyPair {
    return this.addressKeyPair;
  }

  getAddress(): string {
    return this.address;
  }

  getPrivateKey(): string {
    return this.privateKey;
  }
}

export default Account;
