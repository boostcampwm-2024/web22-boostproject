import { Test, TestingModule } from '@nestjs/testing';
import { MockDataController } from './mock-data.controller';

describe('MockDataController', () => {
  let controller: MockDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockDataController],
    }).compile();

    controller = module.get<MockDataController>(MockDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
