// generateShortCode.js
import { customAlphabet } from "nanoid";

export const generateShortCode = () => {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, 8);
  return nanoid();
};
