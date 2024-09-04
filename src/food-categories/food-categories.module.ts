import { Module } from '@nestjs/common';
import { FoodCategoriesService } from './food-categories.service';
import { FoodCategoriesController } from './food-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FoodCategories,
  FoodCategoriesSchema,
} from './schemas/food-categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FoodCategories.name,
        schema: FoodCategoriesSchema,
      },
    ]),
  ],
  controllers: [FoodCategoriesController],
  providers: [FoodCategoriesService],
})
export class FoodCategoriesModule {}
