import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ReplayService } from './replay.service.js';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { memoryDbDtoToReplayVideoDto } from '../common/transformers.js';
import { MemoryDbDto } from '../dto/memoryDbDto.js';

@Controller('replay')
export class ReplayController {
  constructor(private readonly replayService: ReplayService, private readonly memoryDBService: MemoryDBService) {}

  @Get('/latest')
  async getLatestSession(@Res() res: Response) {
    try {
      const replayChecker = (item: MemoryDbDto) => item.replay;
      const serchedData = this.memoryDBService.getBroadcastInfo(8, memoryDbDtoToReplayVideoDto, replayChecker);
      res.status(HttpStatus.OK).json({info: serchedData});
    } catch (error) {
      if ((error as { status: number }).status === 400) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: (error as { response: Response }).response
        });
      }
      else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Server logic error',
        });
      }
    }
  }
}
