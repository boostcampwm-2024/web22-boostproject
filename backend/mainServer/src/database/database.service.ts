import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { ReplayVideoDto } from '../dto/replayVideoDto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReplayVideoEntity } from '../entity/replayVideoEntity.js';
import { memoryDbDtoToReplayVideoDto, replayVideoDtoToMemoryDbDto } from '../common/transformers.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectRepository(ReplayVideoEntity)
    private readonly replayVideoRepository: Repository<ReplayVideoEntity>,
    private readonly memoryDbService: MemoryDBService
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const replayInfo = (await this.replayVideoRepository.find());
      replayInfo.sort((a, b) => a.endDate.getTime() - b.endDate.getTime()).forEach((info) => {
        if (!this.memoryDbService.findBySessionKey(info.videoId)) {
          this.memoryDbService.create({...replayVideoDtoToMemoryDbDto(info), replay: true});
        }
      });
      console.log('Replay Load Complete');
    } catch(err) {
      console.log('Replay Load Error');
      console.log('Error: ', err);
    }
  }

  async onModuleDestroy(): Promise<void> {
    const replayInfo = this.memoryDbService.findAll().filter((info) => info.replay);
    await Promise.all(replayInfo.map(async (info) => {
      await this.createReplayVideo(memoryDbDtoToReplayVideoDto(info));
    }));
    console.log('Replay Save Complete');
  }

  async createReplayVideo(createReplayVideoDto: ReplayVideoDto): Promise<ReplayVideoEntity> {
    const newReplayVideo = this.replayVideoRepository.create(createReplayVideoDto);
    return this.replayVideoRepository.save(newReplayVideo);
  }
}
