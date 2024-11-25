import { Injectable, OnModuleInit } from '@nestjs/common';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { MemoryDbDto } from '../dto/memoryDbDto.js';

@Injectable()
export class MockDataService implements OnModuleInit {
  private mockData: MemoryDbDto[] = [
    new MemoryDbDto({
      userId: 'host001',
      streamKey: 'stream001',
      sessionKey: 'session001',
      liveId: 'session001',
      liveTitle: 'Tech Conference 2024',
      category: 'Technology',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test1_thumbnail.png',
      tags: ['Conference', 'Tech', '2024'],
      startDate: new Date('2024-11-21T09:00:00'),
      endDate: new Date('2024-11-21T11:00:00'),
      state: true,
      channel: {
        channelName: '네이버 부스트캠프',
        channelId: '',
      }
    }),
    new MemoryDbDto({
      userId: 'host002',
      streamKey: 'stream002',
      sessionKey: 'session002',
      liveId: 'session002',
      liveTitle: 'DAN24',
      category: 'Art',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test2_thumbnail.png',
      tags: ['Dan', 'Showcase', 'Art'],
      startDate: new Date('2024-11-21T12:00:00'),
      endDate: new Date('2024-11-21T14:00:00'),
      state: true,
      channel: {
        channelName: '네이버',
        channelId: '',
      }
    }),
    new MemoryDbDto({
      userId: 'host003',
      streamKey: 'stream003',
      sessionKey: 'session003',
      liveId: 'session003',
      liveTitle: 'Gaming Tournament Finals',
      category: 'Gaming',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test3_thumbnail.png',
      tags: ['Gaming', 'Esports', 'Finals'],
      startDate: new Date('2024-11-21T15:00:00'),
      endDate: new Date('2024-11-21T18:00:00'),
      state: true,
      channel: {
        channelName: 'T1',
        channelId: '',
      }
    }),
    new MemoryDbDto({
      userId: 'test_replay',
      streamKey: 'replay_stream',
      sessionKey: 'replay_session',
      liveId: 'replay_session',
      liveTitle: 'Replay Title',
      category: 'Replay Category',
      tags: ['replay', '다시보기'],
      startDate: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      endDate: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      state: true,
    }),
    new MemoryDbDto({
      userId: 'replay_host001',
      streamKey: 'replay_stream001',
      sessionKey: 'replay_session001',
      liveId: 'replay_session001',
      liveTitle: 'Replay Tech Conference 2024',
      category: 'Replay Technology',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test1_thumbnail.png',
      tags: ['Replay', 'Conference', 'Tech'],
      startDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      endDate: new Date(Date.now() - 90 * 60 * 1000), // 90 minutes ago
      state: false,
      replay: true,
    }),
    new MemoryDbDto({
      userId: 'replay_host002',
      streamKey: 'replay_stream002',
      sessionKey: 'replay_session002',
      liveId: 'replay_session002',
      liveTitle: 'Replay DAN24',
      category: 'Replay Art',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test2_thumbnail.png',
      tags: ['Replay', 'Dan', 'Art'],
      startDate: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      endDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      state: false,
      replay: true,
    }),
    new MemoryDbDto({
      userId: 'replay_host003',
      streamKey: 'replay_stream003',
      sessionKey: 'replay_session003',
      liveId: 'replay_session003',
      liveTitle: 'Replay Gaming Tournament Finals',
      category: 'Replay Gaming',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test3_thumbnail.png',
      tags: ['Replay', 'Gaming', 'Esports'],
      startDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      endDate: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      state: false,
      replay: true,
    }),
    new MemoryDbDto({
      userId: 'replay_host004',
      streamKey: 'replay_stream004',
      sessionKey: 'replay_session004',
      liveId: 'replay_session004',
      liveTitle: 'Replay Music Showcase',
      category: 'Replay Music',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test4_thumbnail.png',
      tags: ['Replay', 'Music', 'Showcase'],
      startDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      endDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      state: false,
      replay: true,
    }),
  ];

  constructor(private readonly memoryDbService: MemoryDBService) {}

  // In-Memory 데이터베이스 초기화 메서드
  initializeData() {
    this.mockData.forEach((data) => {
      this.memoryDbService.create(data);
    });
  }

  // 모듈 초기화 시 실행
  onModuleInit() {
    this.initializeData();
  }
}
