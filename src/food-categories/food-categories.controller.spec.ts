import { Test, TestingModule } from '@nestjs/testing';
import { FoodCategoriesController } from './food-categories.controller';
import { FoodCategoriesService } from './food-categories.service';

describe('FoodCategoriesController', () => {
  let controller: FoodCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodCategoriesController],
      providers: [FoodCategoriesService],
    }).compile();

    controller = module.get<FoodCategoriesController>(FoodCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
