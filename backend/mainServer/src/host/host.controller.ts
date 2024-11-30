import { Controller, Post, Get, Req, Res, HttpException, HttpStatus, Body, Query, Delete } from '@nestjs/common';
import { HostService } from './host.service.js';
import { hostKeyPairDto } from '../dto/hostKeyPairDto.js';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { memoryDbDtoFromLiveVideoRequestDto } from '../dto/memoryDbDto.js';
import { LiveVideoRequestDto } from '../dto/liveSessionDto.js';
import { DEFAULT_VALUE } from '../common/constants.js';
import { generatePlaylist } from '../common/util.js';
import { getLastSegment } from '../common/crawler.js';

@Controller('host')
@ApiTags('Host API')
export class HostController {
  constructor(
    private readonly memoryDBService: MemoryDBService,
    private readonly hostService: HostService
  ) {}

  @Get('/session')
  @ApiOperation({
    summary: 'Session Key To Session Key API',
    description: 'Host의 Stream Key를 통해 Session Key를 찾습니다.'
  })
  @ApiCreatedResponse({ description: '스트림 키를 통해 세션키를 전달 받습니다.' })
  async findSession(@Query('streamKey') streamKey: string, @Req() req: Request, @Res() res: Response) {
    try {
      const sessionInfo = this.memoryDBService.findByStreamKey(streamKey);
      if (!sessionInfo) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      sessionInfo.state = true;
      sessionInfo.replay = false;
      sessionInfo.startDate = new Date();
      sessionInfo.streamUrl = `https://kr.object.ncloudstorage.com/web22/live/${sessionInfo.sessionKey}/index.m3u8`;
      this.memoryDBService.updateBySessionKey(streamKey, sessionInfo);
      res.status(HttpStatus.OK).json({ 'session-key': sessionInfo.sessionKey });
    } catch (error) {
      if ((error as { status: number }).status === 400) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: (error as { response: Response }).response
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Server logic error'
        });
      }
    }
  }

  @Get('/state')
  @ApiOperation({summary: 'Response this session is live', description: '현재 방송 세션이 라이브 상태인지 반환합니다.'})
  @ApiResponse({ status: 200, description: '현재 방송 상태에 대한 응답' })
  async getBroadcastState(@Query('sessionKey') sessionKey: string, @Res() res: Response) {
    const liveState = this.memoryDBService.findBySessionKey(sessionKey);
    if (!liveState) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    res.status(200).json({
      state: liveState.state
    });
  }

  @Post('/key')
  @ApiOperation({
    summary: 'Host Stream, Session Key Generate API',
    description: 'Host용 스트림키와 세션키를 생성합니다.'
  })
  @ApiCreatedResponse({ description: '스트림키, 세션키를 생성한다.' })
  async generateStreamKey(@Body() requestDto: hostKeyPairDto, @Req() req: Request, @Res() res: Response) {
    try {
      const host = req.headers['host'] as string;
      const contentType = req.headers['content-type'];

      if (!host || !contentType || !requestDto.userId) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      if (contentType !== 'application/json') {
        throw new HttpException('Content-Type must be application/json', HttpStatus.BAD_REQUEST);
      }

      const [streamKey, sessionKey] = await this.hostService.generateStreamKey(requestDto);
      if (!this.memoryDBService.findByUserId(requestDto.userId)) {
        this.memoryDBService.create({ userId: requestDto.userId, streamKey: streamKey, sessionKey: sessionKey });
      }
      res.status(HttpStatus.OK).json({ streamKey: streamKey, sessionKey: sessionKey });
    } catch (error) {
      if ((error as { status: number }).status === 400) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: (error as { response: Response }).response
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Server logic error'
        });
      }
    }
  }

  @Post('/update')
  @ApiOperation({ summary: 'Host Broadcast Data Update API', description: '호스트의 방송 정보를 업데이트합니다.' })
  @ApiResponse({ status: 200, description: '호스트의 방송 정보를 업데이트 했습니다.' })
  async updateBroadcastData(@Body() requestDto: LiveVideoRequestDto, @Res() res: Response) {
    try {
      const nowUserData = this.memoryDBService.findByUserId(requestDto.userId);
      if (!nowUserData) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      const objectStorageUrl = await this.hostService.uploadBase64ToS3(
        requestDto.defaultThumbnailImageUrl,
        nowUserData.sessionKey,
        'thumbnail'
      );
      const newSessionInfo = { ...requestDto, 
        defaultThumbnailImageUrl: objectStorageUrl || DEFAULT_VALUE.THUMBNAIL_IMG_URL, 
        notice : requestDto.notice || DEFAULT_VALUE.NOTICE, 
        hostName : requestDto.hostName || DEFAULT_VALUE.HOST_NAME};
      this.memoryDBService.updateByUserId(
        requestDto.userId,
        memoryDbDtoFromLiveVideoRequestDto(nowUserData, newSessionInfo)
      );
      res.status(HttpStatus.OK).json({
        status: 'success',
        data: newSessionInfo
      });
    } catch (error) {
      if ((error as { status: number }).status === 400) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: (error as { response: Response }).response
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 'Server logic error'
        });
      }
    }
  }

  @Delete('/session')
  @ApiOperation({ summary: 'Broadcast Close API', description: 'Host의 스트림키를 기준으로 방송을 종료로 설정합니다.' })
  @ApiCreatedResponse({ description: '스트림 키를 통해 방송 종료 여부를 받습니다.' })
  async closeBroadcast(@Query('streamKey') streamKey: string, @Req() req: Request, @Res() res: Response) {
    try {
      const sessionInfo = this.memoryDBService.findByStreamKey(streamKey);
      if (!sessionInfo) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
      sessionInfo.state = false;
      sessionInfo.endDate = new Date();
      if (sessionInfo.startDate) {
        const sessionSegmentInfo = await getLastSegment(`https://kr.object.ncloudstorage.com/web22/live/${sessionInfo.sessionKey}/index.m3u8`);
        if (!sessionSegmentInfo) {
          throw new HttpException('생방송 세그먼트를 불러오는 과정에서 문제가 발생하였습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const m3u8Data = generatePlaylist(sessionSegmentInfo[0], sessionSegmentInfo[1]);
        this.hostService.uploadToS3(m3u8Data, sessionInfo.sessionKey, 'replay', 'm3u8');
        sessionInfo.replay = true;
        sessionInfo.replayUrl = `https://kr.object.ncloudstorage.com/web22/live/${sessionInfo.sessionKey}/replay.m3u8`;
      }
      this.memoryDBService.updateBySessionKey(streamKey, sessionInfo);
      res.status(HttpStatus.OK).send();
    } catch (error) {
      if ((error as { status: number }).status === 400) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: (error as { response: Response }).response
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error:  (error as { response: Response }).response
        });
      }
    }
  }
}
