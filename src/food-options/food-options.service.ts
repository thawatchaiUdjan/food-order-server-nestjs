import { Injectable } from '@nestjs/common';
import { CreateFoodOptionDto } from './dto/create-food-option.dto';
import { UpdateFoodOptionDto } from './dto/update-food-option.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FoodOption } from './schemas/food-option.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodOptionsService {
  constructor(
    @InjectModel(FoodOption.name) private foodOptionModel: Model<FoodOption>,
  ) {}

  create(createFoodOptionDto: CreateFoodOptionDto) {
    return 'This action adds a new foodOption';
  }

  async findAll(): Promise<FoodOption[]> {
    return this.foodOptionModel.find().populate('option_choices').exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} foodOption`;
  }

  update(id: number, updateFoodOptionDto: UpdateFoodOptionDto) {
    return `This action updates a #${id} foodOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodOption`;
  }
}
