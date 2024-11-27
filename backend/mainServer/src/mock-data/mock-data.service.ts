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
      userId: 'host004',
      streamKey: 'stream004',
      sessionKey: 'session004',
      liveId: 'session004',
      liveTitle: 'Music Live Show',
      category: 'Music',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test4_thumbnail.png',
      tags: ['Music', 'Live', 'Concert'],
      startDate: new Date('2024-11-21T19:00:00'),
      endDate: new Date('2024-11-21T21:00:00'),
      state: true,
      channel: {
        channelName: 'MNet',
        channelId: '',
      }
    }),
    new MemoryDbDto({
      userId: 'host005',
      streamKey: 'stream005',
      sessionKey: 'session005',
      liveId: 'session005',
      liveTitle: 'Cooking with Pros',
      category: 'Food',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test5_thumbnail.png',
      tags: ['Cooking', 'Food', 'Recipes'],
      startDate: new Date('2024-11-22T12:00:00'),
      endDate: new Date('2024-11-22T14:00:00'),
      state: true,
      channel: {
        channelName: 'FoodTV',
        channelId: '',
      }
    }),
    new MemoryDbDto({
      userId: 'host006',
      streamKey: 'stream006',
      sessionKey: 'session006',
      liveId: 'session006',
      liveTitle: 'Tech Conference 2024',
      category: 'Technology',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test6_thumbnail.png',
      tags: ['Tech', 'Conference', 'Innovation'],
      startDate: new Date('2024-11-22T15:00:00'),
      endDate: new Date('2024-11-22T18:00:00'),
      state: true,
      channel: {
        channelName: 'TechWorld',
        channelId: '',
      }
    }),
    new MemoryDbDto({
      userId: 'host007',
      streamKey: 'stream007',
      sessionKey: 'session007',
      liveId: 'session007',
      liveTitle: 'Art Masterclass',
      category: 'Art',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test7_thumbnail.png',
      tags: ['Art', 'Painting', 'Creative'],
      startDate: new Date('2024-11-23T10:00:00'),
      endDate: new Date('2024-11-23T12:00:00'),
      state: true,
      channel: {
        channelName: 'ArtChannel',
        channelId: '',
      }
    }),
    new MemoryDbDto({
      userId: 'host008',
      streamKey: 'stream008',
      sessionKey: 'session008',
      liveId: 'session008',
      liveTitle: 'Fitness Live Session',
      category: 'Health',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test8_thumbnail.png',
      tags: ['Fitness', 'Health', 'Workout'],
      startDate: new Date('2024-11-23T16:00:00'),
      endDate: new Date('2024-11-23T17:00:00'),
      state: true,
      channel: {
        channelName: 'FitTV',
        channelId: '',
      }
    }),
    new MemoryDbDto({
      userId: 'host009',
      streamKey: 'stream009',
      sessionKey: 'session009',
      liveId: 'session009',
      liveTitle: 'Travel Vlog Live',
      category: 'Travel',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test9_thumbnail.png',
      tags: ['Travel', 'Adventure', 'Vlog'],
      startDate: new Date('2024-11-24T09:00:00'),
      endDate: new Date('2024-11-24T11:00:00'),
      state: true,
      channel: {
        channelName: 'TravelNow',
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
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/test10_thumbnail.png',
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
    new MemoryDbDto({
      userId: 'replay_host005',
      streamKey: 'replay_stream005',
      sessionKey: 'replay_session005',
      liveId: 'replay_session005',
      liveTitle: 'Replay Music Showcase',
      category: 'Replay Music',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test5_thumbnail.png',
      tags: ['Replay', 'Music', 'Showcase'],
      startDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      endDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      state: false,
      replay: true,
    }),
    new MemoryDbDto({
      userId: 'replay_host006',
      streamKey: 'replay_stream006',
      sessionKey: 'replay_session006',
      liveId: 'replay_session006',
      liveTitle: 'Replay Music Showcase',
      category: 'Replay Music',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test6_thumbnail.png',
      tags: ['Replay', 'Music', 'Showcase'],
      startDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      endDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      state: false,
      replay: true,
    }),
    new MemoryDbDto({
      userId: 'replay_host007',
      streamKey: 'replay_stream007',
      sessionKey: 'replay_session007',
      liveId: 'replay_session007',
      liveTitle: 'Replay Music Showcase',
      category: 'Replay Music',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test7_thumbnail.png',
      tags: ['Replay', 'Music', 'Showcase'],
      startDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      endDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      state: false,
      replay: true,
    }),
    new MemoryDbDto({
      userId: 'replay_host008',
      streamKey: 'replay_stream008',
      sessionKey: 'replay_session008',
      liveId: 'replay_session008',
      liveTitle: 'Replay Music Showcase',
      category: 'Replay Music',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test8_thumbnail.png',
      tags: ['Replay', 'Music', 'Showcase'],
      startDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      endDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      state: false,
      replay: true,
    }),
    new MemoryDbDto({
      userId: 'replay_host009',
      streamKey: 'replay_stream009',
      sessionKey: 'replay_session009',
      liveId: 'replay_session009',
      liveTitle: 'Replay Music Showcase',
      category: 'Replay Music',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test9_thumbnail.png',
      tags: ['Replay', 'Music', 'Showcase'],
      startDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      endDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      state: false,
      replay: true,
    }),
    new MemoryDbDto({
      userId: 'replay_host010',
      streamKey: 'replay_stream010',
      sessionKey: 'replay_session010',
      liveId: 'replay_session010',
      liveTitle: 'Replay Music Showcase',
      category: 'Replay Music',
      defaultThumbnailImageUrl: 'https://kr.object.ncloudstorage.com/web22/static/replay_test10_thumbnail.png',
      tags: ['Replay', 'Music', 'Showcase'],
      startDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      endDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      state: false,
      replay: true,
    }),
  ];

  constructor(private readonly memoryDbService: MemoryDBService) {}

  initializeData() {
    this.mockData.forEach((data) => {
      if (data.state) {
        data['streamUrl'] = `https://kr.object.ncloudstorage.com/web22/live/${data.sessionKey}/index.m3u8`;
      } else {
        data['replayUrl'] = `https://kr.object.ncloudstorage.com/web22/live/${data.sessionKey}/replay.m3u8`;
      }
      this.memoryDbService.create(data);
    });
  }

  // 모듈 초기화 시 실행
  onModuleInit() {
    this.initializeData();
  }
}
