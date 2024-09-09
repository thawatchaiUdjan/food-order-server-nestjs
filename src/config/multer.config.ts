import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from './cloudinary.config';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

function generateUuid(): string {
  return uuidv4();
}

function generateHash(input: string): string {
  const algorithm = 'sha256';
  const encoding = 'base64url';
  return crypto.createHash(algorithm).update(input).digest(encoding);
}

function getFoodIdFromReq(req: Request): string {
  let foodId = req.params.id;
  if (!foodId) {
    foodId = generateUuid();
    req.params.id = foodId;
  }
  return foodId;
}

export const foodStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const foodId = getFoodIdFromReq(req);
    const publicId = generateHash(foodId);
    return {
      folder: 'foods',
      format: 'png',
      public_id: publicId,
    };
  },
});
