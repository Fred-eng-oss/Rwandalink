import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

export function verifyPassword(password: string, stored: string): boolean {
  if (stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$')) {
    return bcrypt.compareSync(password, stored);
  }
  if (stored.startsWith('scrypt:')) {
    const [, saltHex, hashHex] = stored.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const key = crypto.scryptSync(password, salt, KEY_LENGTH, { N: 4096, r: 8, p: 1 });
    return key.toString('hex') === hashHex;
  }
  return false;
}
