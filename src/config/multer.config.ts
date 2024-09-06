import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from './cloudinary.config';
import { generateHash, getFoodIdFromReq } from 'src/common/utils';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const foodStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const foodId = getFoodIdFromReq(req);
    const publicId = generateHash(foodId);
    return {
      folder: configService.get<string>('uploadImage.folders.food'),
      format: configService.get<string>('uploadImage.format'),
      public_id: publicId,
    };
  },
});
