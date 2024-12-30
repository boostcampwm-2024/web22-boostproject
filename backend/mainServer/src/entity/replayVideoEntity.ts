import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('replay_video')
export class ReplayVideoEntity {
  @PrimaryColumn({ name: 'video_id' })
    videoId: string = ''; // 방송 ID (방송 세션키)

  @Column({ name: 'video_no' })
    videoNo: number = 0; // 방송 고유 번호

  @Column({ name: 'video_title' })
    videoTitle: string = ''; // 방송 제목

  @Column({ name: 'start_date', type: 'datetime' })
    startDate: Date = new Date(); // 방송 시작 날짜

  @Column({ name: 'end_date', type: 'datetime' })
    endDate: Date = new Date(); // 방송 종료 날짜

  @Column({ name: 'thumbnail_image_url', type: 'text' })
    thumbnailImageUrl: string = ''; // 썸네일 이미지 URL

  @Column({ name: 'trailer_url', type: 'text', nullable: true })
    trailerUrl?: string = ''; // 트레일러 방송 URL (nullable)

  @Column()
    duration: number = 0; // 방송 재생 시간 (초 단위)

  @Column({ name: 'read_count', nullable: true })
    readCount?: number = 0; // 조회수 (nullable)

  @Column()
    category: string = ''; // 방송 카테고리

  @Column({ name: 'live_pr' })
    livePr: number = 0; // 라이브 조회수

  @Column({ type: 'json' })
    channel: { channelName: string; channelId: string } = { channelName: '', channelId: '' }; // 채널 정보 (JSON 객체)

  @Column({ type: 'json' })
    tags: string[] = []; // 방송 태그 (JSON 배열)

  @Column({ name: 'replay_url' })
    replayUrl: string = ''; // 다시보기 URL (m3u8)
}
