import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { cloudinary } from 'src/config/cloudinary.config';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UtilsService {
  constructor(private readonly configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.get<number>('encryptSaltRounds');
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateUuid(): string {
    return uuidv4();
  }

  getFoodIdFromReq(req: Request): string {
    let foodId = req.params.id;
    if (!foodId) {
      foodId = this.generateUuid();
      req.params.id = foodId;
    }
    return foodId;
  }

  async deleteImageFile(imageUrl: string, imageFolder: string): Promise<any> {
    if (imageUrl) {
      let publicId = imageUrl.split('/').pop().split('.')[0];
      if (imageFolder) {
        publicId = `${imageFolder}/${publicId}`;
      }
      await cloudinary.uploader.destroy(publicId);
    }
  }
}
