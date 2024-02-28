import * as crypto from 'crypto';

/**
 * Creates a sha256 hash of the url and returns the first
 * five characters from the result in Hex.
 *
 * Consider instead converting the result to base 62.
 *
 * @param url: string
 * @returns string
 */
export const shortenURL = (url: string): string => {
  const fullHash = crypto.createHash('sha256');
  fullHash.update(url);
  const shortHash = fullHash.digest('hex').substring(0, 5);

  return shortHash;
};
