import { ec } from "elliptic";

import Account from "../models/Account";

const getAccount = (address: string): Account => {
  const EC = new ec("secp256k1");

  const addressKeyPair = EC.keyFromPublic(address, "hex");

  return new Account(addressKeyPair);
};

export { getAccount };
