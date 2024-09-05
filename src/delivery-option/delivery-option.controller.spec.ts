import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryOptionController } from './delivery-option.controller';
import { DeliveryOptionService } from './delivery-option.service';

describe('DeliveryOptionController', () => {
  let controller: DeliveryOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryOptionController],
      providers: [DeliveryOptionService],
    }).compile();

    controller = module.get<DeliveryOptionController>(DeliveryOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
