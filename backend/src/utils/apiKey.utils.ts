import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 10; // Lower than password — keys are long enough

export const generateApiKey = (): {
  plainKey: string;
  keyHash: string;
  keyPrefix: string;
} => {
  const randomPart = crypto.randomBytes(32).toString("hex");
  const plainKey = `mock_${randomPart}`;
  const keyHash = bcrypt.hashSync(plainKey, SALT_ROUNDS);
  const keyPrefix = plainKey.slice(0, 12);

  return { plainKey, keyHash, keyPrefix };
};

export const verifyApiKey = async (
  plain: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};
