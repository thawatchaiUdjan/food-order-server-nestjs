import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './schemas/food.schema';
import { Model } from 'mongoose';
import { Request } from 'express';
import { deleteImageFile, getFoodIdFromReq } from 'src/common/utils';
import { CreateFoodRes, MessageRes } from 'src/types/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createFoodDto: CreateFoodDto,
    req: Request,
    file: Express.Multer.File,
  ): Promise<CreateFoodRes> {
    const foodImgUrl = file ? file.path : '';
    const foodId = getFoodIdFromReq(req);
    const food = await new this.foodModel({
      ...createFoodDto,
      food_id: foodId,
      food_image_url: foodImgUrl,
    }).save();
    const result = await food.populate({
      path: 'food_options',
      populate: {
        path: 'option_choices',
      },
    });

    return { food: result, message: 'Food added successfully' };
  }

  async findAll(): Promise<Food[]> {
    return this.foodModel
      .find()
      .populate({
        path: 'food_options',
        populate: {
          path: 'option_choices',
        },
      })
      .exec();
  }

  async findOne(id: string): Promise<Food> {
    const result = await this.foodModel.findOne({ food_id: id });
    if (!result) {
      throw new NotFoundException('Food item not found');
    }
    return result;
  }

  async update(
    id: string,
    updateFoodDto: UpdateFoodDto,
    file: Express.Multer.File,
  ): Promise<CreateFoodRes> {
    const foodImgUrl = file ? file.path : '';
    const food = await this.foodModel.findOneAndUpdate(
      { food_id: id },
      { ...updateFoodDto, food_image_url: foodImgUrl },
      { new: true },
    );
    if (!food) {
      throw new NotFoundException('Food item to update not found');
    }
    const result = await food.populate({
      path: 'food_options',
      populate: {
        path: 'option_choices',
      },
    });
    return { food: result, message: 'Food item successfully updated' };
  }

  async remove(id: string): Promise<MessageRes> {
    const food = await this.foodModel.findOneAndDelete({ food_id: id });
    const foodFolder = this.configService.get<string>(
      'uploadImage.folders.food',
    );
    if (!food) {
      throw new NotFoundException('Food item to delete not found');
    }
    await deleteImageFile(food.food_image_url, foodFolder);
    return { message: 'Food item successfully deleted' };
  }
}
