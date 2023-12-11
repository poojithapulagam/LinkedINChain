// Assuming this is your utility file, update the path accordingly
import { PublicKey } from '@solana/web3.js';

export function condensePublicKey(publicKey: PublicKey): string {
  // Your logic to condense the public key
  return publicKey.toBase58().substring(0, 10); // Adjust the logic as needed
}
