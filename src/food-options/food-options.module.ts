import { Module } from '@nestjs/common';
import { FoodOptionsService } from './food-options.service';
import { FoodOptionsController } from './food-options.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodOption, FoodOptionSchema } from './schemas/food-option.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FoodOption.name,
        schema: FoodOptionSchema,
      },
    ]),
  ],
  controllers: [FoodOptionsController],
  providers: [FoodOptionsService],
})
export class FoodOptionsModule {}
