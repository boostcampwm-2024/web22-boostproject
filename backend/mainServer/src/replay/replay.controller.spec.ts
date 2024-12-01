import { Test, TestingModule } from '@nestjs/testing';
import { ReplayController } from './replay.controller';
import { ReplayService } from './replay.service';

describe('ReplayController', () => {
  let controller: ReplayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplayController],
      providers: [ReplayService],
    }).compile();

    controller = module.get<ReplayController>(ReplayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
