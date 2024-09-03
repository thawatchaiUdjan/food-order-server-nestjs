import { Test, TestingModule } from '@nestjs/testing';
import { FoodOptionsController } from './food-options.controller';
import { FoodOptionsService } from './food-options.service';

describe('FoodOptionsController', () => {
  let controller: FoodOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodOptionsController],
      providers: [FoodOptionsService],
    }).compile();

    controller = module.get<FoodOptionsController>(FoodOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
