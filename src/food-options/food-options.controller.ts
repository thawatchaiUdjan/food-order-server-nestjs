import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodOptionsService } from './food-options.service';
import { CreateFoodOptionDto } from './dto/create-food-option.dto';
import { UpdateFoodOptionDto } from './dto/update-food-option.dto';

@Controller('food-options')
export class FoodOptionsController {
  constructor(private readonly foodOptionsService: FoodOptionsService) {}

  @Post()
  create(@Body() createFoodOptionDto: CreateFoodOptionDto) {
    return this.foodOptionsService.create(createFoodOptionDto);
  }

  @Get()
  findAll() {
    return this.foodOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodOptionDto: UpdateFoodOptionDto) {
    return this.foodOptionsService.update(+id, updateFoodOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodOptionsService.remove(+id);
  }
}
