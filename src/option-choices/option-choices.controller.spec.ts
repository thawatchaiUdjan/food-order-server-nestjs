import { Test, TestingModule } from '@nestjs/testing';
import { OptionChoicesController } from './option-choices.controller';
import { OptionChoicesService } from './option-choices.service';

describe('OptionChoicesController', () => {
  let controller: OptionChoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionChoicesController],
      providers: [OptionChoicesService],
    }).compile();

    controller = module.get<OptionChoicesController>(OptionChoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
