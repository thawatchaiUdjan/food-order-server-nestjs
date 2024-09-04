import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function hashPassword(
  password: string,
  saltRound: number,
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateUuid() {
  return uuidv4();
}
