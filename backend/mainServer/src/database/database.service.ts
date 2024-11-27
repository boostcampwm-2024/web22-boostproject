import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createPool, Pool, RowDataPacket } from 'mysql2/promise';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { ReplayVideoDto } from '../dto/replayVideoDto.js';
import { memoryDbDtoToReplayVideoDto } from '../common/transformers.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('../.env') });

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool | null = null;

  constructor(private readonly memoryDbService: MemoryDBService) {}

  async onModuleInit(): Promise<void> {
    try {
      this.pool = createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      console.log('Database pool initialized');
  
      if (this.pool) {
        const [rows] = await this.pool.query('SELECT 1');
        if (rows) {
          console.log('Database connection verified successfully');
        }
      }
    } catch (e) {
      console.error('Error initializing the database pool:', e);
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.pool) {
      const replayInfo = this.memoryDbService.findAll().filter((info) => info.replay);
      await Promise.all(
        replayInfo.map((info) => this.saveReplayVideoToDb(memoryDbDtoToReplayVideoDto(info))),
      );     
      await this.pool.end();
      console.log('Database pool closed');
    }
    else {
      console.log('Database is not initialized');
    }
  }

  async runQuery<T extends RowDataPacket[]>(query: string, parameters: unknown[] = []): Promise<T> {
    if (!this.pool) {
      throw new Error('Database pool is not initialized');
    }
    const [rows] = await this.pool.execute<T>(query, parameters);
    return rows;
  }

  async saveReplayVideoToDb(video: ReplayVideoDto): Promise<void> {
    const query = `
      INSERT INTO ReplayVideo (
        video_no, video_id, video_title, start_date, end_date, 
        thumbnail_image_url, trailer_url, duration, read_count, 
        category, live_pr, channel_name, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        video_id = VALUES(video_id),
        video_title = VALUES(video_title),
        start_date = VALUES(start_date),
        end_date = VALUES(end_date),
        thumbnail_image_url = VALUES(thumbnail_image_url),
        trailer_url = VALUES(trailer_url),
        duration = VALUES(duration),
        read_count = VALUES(read_count),
        category = VALUES(category),
        live_pr = VALUES(live_pr),
        channel_name = VALUES(channel_name),
        tags = VALUES(tags);
    `;

    const parameters = [
      video.videoNo,                  // 방송 고유 번호
      video.videoId,                  // 방송 ID
      video.videoTitle,               // 방송 제목
      video.startDate,                // 방송 시작 날짜
      video.endDate,                  // 방송 종료 날짜
      video.thumbnailImageUrl,        // 썸네일 URL
      video.trailerUrl,               // 트레일러 URL
      video.duration,                 // 방송 재생 시간
      video.readCount ?? null,        // 조회수 (nullable)
      video.category,                 // 방송 카테고리
      video.livePr,                   // 라이브 조회수
      video.channel.channelName,      // 채널 이름
      JSON.stringify(video.tags),     // 태그 JSON 배열
    ];

    await this.runQuery(query, parameters);
    console.log(`ReplayVideo with ID ${video.videoId} saved to the database.`);
  }
}
