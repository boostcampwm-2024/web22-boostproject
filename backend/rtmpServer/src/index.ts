import NodeMediaServer from '@hoeeeeeh/node-media-server';

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 현재 파일의 URL을 파일 경로로 변환
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 상위 디렉터리의 .env 파일을 불러오기
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const httpConfig = {
  port: 8000,
  allow_origin: '*',

  //package.json 기준
  mediaroot: path.resolve(__dirname, '../media')
};

const rtmpConfig = {
  port: 1935,
  chunk_size: 60000,
  gop_cache: true,
  ping: 10,
  ping_timeout: 60
};

const transformationConfig = {
  //package.json 기준
  ffmpeg: path.resolve(__dirname, '../ffmpeg'),
  tasks: [
    {
      app: 'live',
      hls: true,
      hlsFlags: '[hls_time=10:hls_list_size=3:hls_flags=delete_segments]',
      vc: 'libx264',
      vcParam: ['-g', '60', '-keyint_min', '60', '-sc_threshold', '0'],
      ac: 'copy',
      ffmpegLogLevel: 'verbose'
    }
  ],
  //package.json 기준
  MediaRoot: path.resolve(__dirname, '../media')
};

const S3ClientConfig = {
  region: process.env.OBJECT_STORAGE_REGION || '',
  endpoint: process.env.OBJECT_STORAGE_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.OBJECT_STORAGE_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.OBJECT_STORAGE_SECRET_ACCESS_KEY || ''
  }
};
console.log(S3ClientConfig);

const config = {
  s3Client: S3ClientConfig,
  http: httpConfig,
  rtmp: rtmpConfig,
  trans: transformationConfig
};

const nodeMediaServer = new NodeMediaServer(config);

nodeMediaServer.run();
