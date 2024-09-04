import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodCategoriesService } from './food-categories.service';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food-category.dto';

@Controller('category')
export class FoodCategoriesController {
  constructor(private readonly foodCategoriesService: FoodCategoriesService) {}

  @Post()
  create(@Body() createFoodCategoryDto: CreateFoodCategoryDto) {
    return this.foodCategoriesService.create(createFoodCategoryDto);
  }

  @Get()
  findAll() {
    return this.foodCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodCategoryDto: UpdateFoodCategoryDto,
  ) {
    return this.foodCategoriesService.update(id, updateFoodCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodCategoriesService.remove(id);
  }
}
