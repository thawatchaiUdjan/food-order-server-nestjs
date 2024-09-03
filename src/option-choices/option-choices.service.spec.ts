import { Test, TestingModule } from '@nestjs/testing';
import { OptionChoicesService } from './option-choices.service';

describe('OptionChoicesService', () => {
  let service: OptionChoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionChoicesService],
    }).compile();

    service = module.get<OptionChoicesService>(OptionChoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
