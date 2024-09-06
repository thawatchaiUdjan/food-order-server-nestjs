import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const configService = new ConfigService();

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = configService.get<number>('encryptSaltRounds');
  const salt = await bcrypt.genSalt(saltRounds);
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
