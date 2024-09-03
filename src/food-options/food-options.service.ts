import { Injectable } from '@nestjs/common';
import { CreateFoodOptionDto } from './dto/create-food-option.dto';
import { UpdateFoodOptionDto } from './dto/update-food-option.dto';

@Injectable()
export class FoodOptionsService {
  create(createFoodOptionDto: CreateFoodOptionDto) {
    return 'This action adds a new foodOption';
  }

  findAll() {
    return `This action returns all foodOptions`;
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
