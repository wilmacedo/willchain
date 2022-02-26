import { ec } from "elliptic";

class Account {
  private addressKeyPair: ec.KeyPair;

  constructor(addressKeyPair: ec.KeyPair = new ec("secp256k1").genKeyPair()) {
    this.addressKeyPair = addressKeyPair;
  }

  getAddress(): string {
    return this.addressKeyPair.getPublic("hex");
  }

  getPrivateKey(): string {
    return this.addressKeyPair.getPrivate("hex");
  }
}

export default Account;
