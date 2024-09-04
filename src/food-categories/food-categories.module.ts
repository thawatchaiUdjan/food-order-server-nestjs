import { Module } from '@nestjs/common';
import { FoodCategoriesService } from './food-categories.service';
import { FoodCategoriesController } from './food-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FoodCategory,
  FoodCategorySchema,
} from './schemas/food-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FoodCategory.name,
        schema: FoodCategorySchema,
      },
    ]),
  ],
  controllers: [FoodCategoriesController],
  providers: [FoodCategoriesService],
})
export class FoodCategoriesModule {}
