import dotenv from 'dotenv';
import path from 'path';
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { hostKeyPairDto } from '../dto/hostKeyPairDto.js';
import { decodeBase64Image, randomKey } from '../common/util.js';

dotenv.config({ path: path.resolve('../.env') });

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.OBJECT_STORAGE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.OBJECT_STORAGE_SECRET_ACCESS_KEY!
  },
  region: process.env.OBJECT_STORAGE_REGION!,
  endpoint: process.env.OBJECT_STORAGE_ENDPOINT!
});

@Injectable()
export class HostService {
  async generateStreamKey(requestDto: hostKeyPairDto): Promise<Array<string>> {
    dotenv.config({ path: path.resolve('../.env') });
    const streamKey = randomKey(requestDto.userId, process.env.STREAM_KEY_SALT || '');
    const sessionKey = randomKey(requestDto.userId, process.env.SESSION_KEY_SALT || '');
    return [streamKey, sessionKey];
  }

  async uploadBase64ToS3(base64Data: string, sessionKey: string, fileName: string): Promise<string | null> {
    try {
      if (!base64Data) return null;
      const { buffer, fileType } = decodeBase64Image(base64Data);

      const bucketName = process.env.OBJECT_STORAGE_BUCKET_NAME!;
      const key = `live/${sessionKey}/${fileName}.${fileType}`;

      const params = {
        Bucket: bucketName,
        Key: key, 
        Body: buffer,
        ContentType: fileType,
        ACL: 'public-read' as ObjectCannedACL
      };

      // PutObjectCommand로 파일 업로드
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // 업로드된 파일의 URL 반환
      const location = `${process.env.OBJECT_STORAGE_ENDPOINT}/${bucketName}/${key}`;
      return location;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  }

  async uploadToS3(data: string,  sessionKey: string, fileName: string, fileType: string = '') {
    try {
      const bucketName = process.env.OBJECT_STORAGE_BUCKET_NAME!;
      const key = `live/${sessionKey}/${fileName}.${fileType || fileType}`;
      const params = {
        Bucket: bucketName,
        Key: key, 
        Body: data,
        ContentType: fileType,
        ACL: 'public-read' as ObjectCannedACL
      };

      // PutObjectCommand로 파일 업로드
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // 업로드된 파일의 URL 반환
      const location = `${process.env.OBJECT_STORAGE_ENDPOINT}/${bucketName}/${key}`;
      return location;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  }
}
