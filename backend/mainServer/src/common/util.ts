import crypto from 'crypto';
import { fromLiveCurationDto } from '../dto/liveCurationDto.js';
import { MemoryDbDto } from '../dto/memoryDbDto.js';

export function getRandomElementsFromArray(array: Array<MemoryDbDto>, n: number) {
  const result = [];
  const usedIndices = new Set();
  const resultLength = (array.length < n) ? array.length : n;
  while (result.length < resultLength) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!usedIndices.has(randomIndex)) {
      const liveCurationDto = fromLiveCurationDto(array[randomIndex]);
      result.push(liveCurationDto);
      usedIndices.add(randomIndex);
    }
  }

  return result;
}

export function decodeBase64Image(base64Data: string): { buffer: Buffer; fileType: string } {
  try {
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid Base64 data');
    }

    const fileType = matches[1].split('/')[1]; // ex) jpeg
    const imageData = matches[2];
    const buffer = Buffer.from(imageData, 'base64');

    return { buffer: buffer, fileType: fileType };
  } catch (error) {
    console.error('Error saving Base64 image:', error);
    throw error;
  }
}

export function randomKey(uuid: string, salt: string, length: number = 20) {
  const hash = crypto.createHmac('sha256', salt).update(uuid).digest('hex');
  return hash.substring(0, length);
}

export function generatePlaylist(N: number, duration: number): string {
  const header = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:2
#EXT-X-MEDIA-SEQUENCE:0`;

  const body = Array.from({ length: N + 1 }, (_, i) => {
    return `#EXTINF:${duration.toFixed(6)},
index${i}.ts`;
  }).join('\n');

  const footer = '#EXT-X-ENDLIST';

  return `${header}\n${body}\n${footer}`;
}
