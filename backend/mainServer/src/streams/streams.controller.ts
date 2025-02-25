import { Controller, Get, Res, HttpStatus, Query, HttpException } from '@nestjs/common';
import { StreamsService } from './streams.service.js';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { fromLiveSessionDto, LiveSessionResponseDto } from '../dto/liveSessionDto.js';
import { MemoryDbDto } from '../dto/memoryDbDto.js';

@ApiTags('Stream Information API')
@Controller('streams')
export class StreamsController {
  constructor( private readonly memoryDBService: MemoryDBService,  private readonly streamsService: StreamsService) { }

  @Get('/random')
  @ApiOperation({ summary: 'Get 4ea Broadcas Info API', description: '랜덤하게 4개의 방송 정보를 받아온다. (방송이 없을 경우 빈 배열 반환)' })
  @ApiResponse({ status: 200, description: '랜덤한 4개의 방송 정보를 받았습니다.' })
  async findSession(@Res() res: Response) {
    try {
      const serchedData = await this.memoryDBService.getRandomBroadcastInfo(4);
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

  @Get('/latest')
  @ApiOperation({summary : 'Get 8ea Live Session And 8ea Append Session Info', description:'현재 진행 중인 라이브 정보를 최신부터 8개, 추가 정보 8개씩 불러옵니다. (방송이 없을 경우 빈 배열 반환)'})
  async getLatestSession(@Res() res: Response) {
    try {
      const streamChecker = (item: MemoryDbDto) => item.state;
      const compare = (a: MemoryDbDto, b: MemoryDbDto) => {
        const aTime = a.startDate ? a.startDate.getTime() : 0;
        const bTime = b.startDate ? b.startDate.getTime() : 0;
        return aTime - bTime;
      };
      const [serchedData, appendData] = this.memoryDBService.getBroadcastInfo<LiveSessionResponseDto>(8, fromLiveSessionDto, streamChecker, compare, 8);
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

  @Get('/live')
  @ApiOperation({summary : 'Get Live Session Info', description:'liveId에 대해 현재 진행 중인 방송 정보를 불러옵니다.'})
  async getSessionInfo(@Query('liveId') sessionKey: string, @Res() res: Response) {
    try {
      const sessionInfo = this.memoryDBService.findBySessionKey(sessionKey);
      if (!sessionInfo) {
        throw new HttpException('No Available Session', HttpStatus.BAD_REQUEST);
      }
      res.status(HttpStatus.OK).json({info : fromLiveSessionDto(sessionInfo)});
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


  @Get('/notice')
  @ApiOperation({summary : 'Get Live Session Notice', description:'현재 진행 중인 방송 공지를 받아옵니다.'})
  async getNotice(@Query('sessionKey') sessionKey : string, @Res() res: Response) {
    try {
      const sessionInfo = this.memoryDBService.findBySessionKey(sessionKey);
      if (!sessionInfo) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      res.status(HttpStatus.OK).json({notice: sessionInfo.notice, channelName: sessionInfo.channel.channelName});
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
  @ApiOperation({summary: 'Get Session exited', description: '방송 세션에 대한 존재 여부를 반환 받습니다.'})
  async getExistence(@Query('sessionKey') sessionKey: string, @Res() res: Response) {
    try {
      if (this.memoryDBService.chzzkSwitch && sessionKey in this.memoryDBService.chzzkDb) {
        res.status(HttpStatus.OK).json({existed: true});
        return;
      }
      const liveSessions = this.memoryDBService.findAll().filter((info) => info.state);
      if (liveSessions.some((info) => info.sessionKey === sessionKey)) {
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