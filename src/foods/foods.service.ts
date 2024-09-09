import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './schemas/food.schema';
import { Model } from 'mongoose';
import { Request } from 'express';
import { CreateFoodRes, MessageRes } from 'src/types/interfaces';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    private readonly utils: UtilsService,
  ) {}

  async create(
    createFoodDto: CreateFoodDto,
    req: Request,
    file: Express.Multer.File,
  ): Promise<CreateFoodRes> {
    if (file) createFoodDto.food_image_url = file.path;
    const foodId = this.utils.getFoodIdFromReq(req);
    const food = await new this.foodModel({
      ...createFoodDto,
      food_id: foodId,
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
    if (file) updateFoodDto.food_image_url = file.path;
    const food = await this.foodModel.findOneAndUpdate(
      { food_id: id },
      { ...updateFoodDto },
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
    const foodFolder = 'foods';
    if (!food) {
      throw new NotFoundException('Food item to delete not found');
    }
    await this.utils.deleteImageFile(food.food_image_url, foodFolder);
    return { message: 'Food item successfully deleted' };
  }
}
