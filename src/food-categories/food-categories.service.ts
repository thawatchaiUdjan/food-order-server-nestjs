import { Injectable } from '@nestjs/common';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FoodCategories } from './schemas/food-categories.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodCategoriesService {
  constructor(
    @InjectModel(FoodCategories.name)
    private foodCategories: Model<FoodCategories>,
  ) {}

  create(createFoodCategoryDto: CreateFoodCategoryDto) {
    return 'This action adds a new foodCategory';
  }

  async findAll(): Promise<FoodCategories[]> {
    return this.foodCategories.find().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} foodCategory`;
  }

  update(id: string, updateFoodCategoryDto: UpdateFoodCategoryDto) {
    return `This action updates a #${id} foodCategory`;
  }

  remove(id: string) {
    return `This action removes a #${id} foodCategory`;
  }
}
