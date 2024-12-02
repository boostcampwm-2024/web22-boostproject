import { Controller, Get, Res, HttpStatus, Query, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ReplayService } from './replay.service.js';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { memoryDbDtoToReplayVideoDto } from '../common/transformers.js';
import { MemoryDbDto } from '../dto/memoryDbDto.js';
import { ReplayVideoDto } from '../dto/replayVideoDto.js';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('replay')
export class ReplayController {
  constructor(private readonly replayService: ReplayService, private readonly memoryDBService: MemoryDBService) {}

  @Get('/latest')
  @ApiOperation({summary: 'Get 8ea Replay And 8ea Append Replay Info', description: '가장 최근에 등록된 다시보기 8개와 추가 8개의 다시보기를 불러옵니다. (다시보기가 없을 경우 빈 배열 반환)'})
  @ApiOkResponse({description: '정상적으로 데이터를 불러왔습니다.'})
  async getLatestReplay(@Res() res: Response) {
    try {
      const replayChecker = (item: MemoryDbDto) => { return item.replay && !item.state; };
      const [serchedData, appendData] = this.memoryDBService.getBroadcastInfo<ReplayVideoDto>(8, memoryDbDtoToReplayVideoDto, replayChecker, 8);
      res.status(HttpStatus.OK).json({info: serchedData, appendInfo: appendData});
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

  @Get('/video')
  @ApiOperation({summary : 'Get Replay Info', description:'videoId에 대해 다시보기 정보를 불러옵니다.'})
  async getReplayInfo(@Query('videoId') sessionKey: string, @Res() res: Response) {
    try {
      const sessionInfo = this.memoryDBService.findBySessionKey(sessionKey);
      if (!sessionInfo || !sessionInfo.replay) {
        throw new HttpException('No Available Session', HttpStatus.BAD_REQUEST);
      }
      sessionInfo.readCount = sessionInfo.readCount + 1;
      this.memoryDBService.updateBySessionKey(sessionKey, sessionInfo);
      res.status(HttpStatus.OK).json({info : memoryDbDtoToReplayVideoDto(sessionInfo)});
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

  @Get('/existence')
  @ApiOperation({summary: 'Get replay exited', description: '다시보기에 대한 존재 여부를 반환 받습니다.'})
  async getExistence(@Query('videoId') videoId: string, @Res() res: Response) {
    try {
      const replaySessions = this.memoryDBService.findAll().filter((info) => info.replay);
      if (replaySessions.some((info) => info.sessionKey === videoId)) {
        res.status(HttpStatus.OK).json({existed: true}); 
      }
      else {
        res.status(HttpStatus.OK).json({existed: false});
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
