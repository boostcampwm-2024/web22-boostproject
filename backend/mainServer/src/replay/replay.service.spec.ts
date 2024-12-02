import { Test, TestingModule } from '@nestjs/testing';
import { ReplayService } from './replay.service';

describe('ReplayService', () => {
  let service: ReplayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplayService],
    }).compile();

    service = module.get<ReplayService>(ReplayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
