import { Token } from "../types/schema";

export function addToken(address: string): void {
  let token = Token.load(address);
  if (token != null) {
    return;
  }

  token = new Token(address);
  if (address == "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd") {
    token.decimals = 18;
    token.name = "LRCToken";
    token.symbol = "LRC";
  } else {
    token.decimals = 0;
    token.name = null;
    token.symbol = null;
  }

  token.save();
}
