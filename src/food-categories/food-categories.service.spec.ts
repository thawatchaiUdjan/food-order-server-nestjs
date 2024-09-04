import { Test, TestingModule } from '@nestjs/testing';
import { FoodCategoriesService } from './food-categories.service';

describe('FoodCategoriesService', () => {
  let service: FoodCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodCategoriesService],
    }).compile();

    service = module.get<FoodCategoriesService>(FoodCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
