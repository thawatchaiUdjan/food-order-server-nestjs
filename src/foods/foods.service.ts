import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './schemas/food.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  async create(createFoodDto: CreateFoodDto) {
    const food = new this.foodModel(createFoodDto);
    const result = await food.save();
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

  async findOne(id: string) {
    const result = await this.foodModel.findOne({ food_id: id });
    if (!result) {
      throw new NotFoundException('Food item not found');
    }
    return result;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const result = await this.foodModel
      .findOneAndUpdate({ food_id: id }, updateFoodDto, { new: true })
      .populate({
        path: 'food_options',
        populate: {
          path: 'option_choices',
        },
      });
    if (!result) {
      throw new NotFoundException('Food item to update not found');
    }
    return { food: result, message: 'Food item successfully updated' };
  }

  remove(id: string) {
    return `This action removes a #${id} food`;
  }
}
