import crypto from 'crypto';

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = crypto.scryptSync(password, salt, KEY_LENGTH, { N: 4096, r: 8, p: 1 });
  return `scrypt:${salt.toString('hex')}:${key.toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (!stored.startsWith('scrypt:')) return false;
  const [, saltHex, hashHex] = stored.split(':');
  const salt = Buffer.from(saltHex, 'hex');
  const key = crypto.scryptSync(password, salt, KEY_LENGTH, { N: 4096, r: 8, p: 1 });
  return key.toString('hex') === hashHex;
}
