import { Test, TestingModule } from '@nestjs/testing';
import { RedisClientManagerService } from './redis-client-manager.service';

describe('RedisClientManagerService', () => {
  let service: RedisClientManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisClientManagerService],
    }).compile();

    service = module.get<RedisClientManagerService>(RedisClientManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
