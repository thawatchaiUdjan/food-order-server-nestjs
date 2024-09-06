import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Request } from 'express';
import { cloudinary } from 'src/config/cloudinary.config';
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

export function generateUuid(): string {
  return uuidv4();
}

export function getFoodIdFromReq(req: Request): string {
  let foodId = req.params.id;
  if (!foodId) {
    foodId = generateUuid();
    req.params.id = foodId;
  }
  return foodId;
}

export function generateHash(input: string): string {
  const algorithm = configService.get<string>('encryptSaltRounds');
  console.log('algorithm', algorithm);

  return crypto
    .createHash(algorithm)
    .update(input)
    .digest(
      configService.get<crypto.BinaryToTextEncoding>('hash.hashEncoding'),
    );
}

export async function deleteImageFile(
  imageUrl: string,
  imageFolder: string,
): Promise<any> {
  if (imageUrl) {
    let publicId = imageUrl.split('/').pop().split('.')[0];
    if (imageFolder) {
      publicId = `${imageFolder}/${publicId}`;
    }
    await cloudinary.uploader.destroy(publicId);
  }
}
