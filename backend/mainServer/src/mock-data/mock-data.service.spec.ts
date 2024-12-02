import { Test, TestingModule } from '@nestjs/testing';
import { MockDataService } from './mock-data.service';

describe('MockDataService', () => {
  let service: MockDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockDataService],
    }).compile();

    service = module.get<MockDataService>(MockDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
