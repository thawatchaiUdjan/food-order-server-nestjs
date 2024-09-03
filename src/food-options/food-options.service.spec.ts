import { Test, TestingModule } from '@nestjs/testing';
import { FoodOptionsService } from './food-options.service';

describe('FoodOptionsService', () => {
  let service: FoodOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodOptionsService],
    }).compile();

    service = module.get<FoodOptionsService>(FoodOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
