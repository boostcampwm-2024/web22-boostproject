import { Injectable } from '@nestjs/common';
import { MemoryDbDto } from '../dto/memoryDbDto.js';
import { getRandomElementsFromArray } from '../common/util.js';

@Injectable()
export class MemoryDBService {
  private db: MemoryDbDto[] = [];
  private currentId = 0;

  findAll(): MemoryDbDto[] {
    return this.db;
  }

  findById(id: number): MemoryDbDto | undefined {
    return this.db.find(item => item.id === id);
  }

  findByUserId(userId: string): MemoryDbDto | undefined {
    return this.db.find(item => item.userId === userId);
  }

  findByStreamKey(streamKey: string): MemoryDbDto | undefined {
    return this.db.find(item => item.streamKey === streamKey);
  }

  findBySessionKey(sessionKey: string): MemoryDbDto | undefined {
    return this.db.find(item => item.sessionKey === sessionKey);
  }
  
  getRandomBroadcastInfo(count: number) {
    const liveSession = this.db.filter(item => item.state);
    return getRandomElementsFromArray(liveSession, count);
  }

  getBroadcastInfo<T>(size: number, dtoTransformer: (info: MemoryDbDto) => T, checker: (item: MemoryDbDto) => boolean, appender: number = 0) {
    const findSession = this.db.filter(item => checker(item));
    if (findSession.length < size) {
      const findSessionRev = findSession.reverse().map((info) => dtoTransformer(info));
      return [[...findSessionRev], []];
    }
    const latestSession = findSession.slice(-size).reverse().map((info) => dtoTransformer(info));
    if (appender === 0) {
      return [[...latestSession], []];
    }
    else if (findSession.length < size + appender) {
      const appendSession = findSession.slice(0, findSession.length - size).reverse().map((info) => dtoTransformer(info));
      return [[...latestSession], [...appendSession]];
    }
    else {
      const appendSession = findSession.slice(-size - appender, -size).reverse().map((info) => dtoTransformer(info));
      return [[...latestSession], [...appendSession]];
    }
  }

  create(item: Partial<MemoryDbDto>): void {
    const newItem = new MemoryDbDto({ ...item, id: ++this.currentId });
    this.db.push(newItem);
  }

  updateByUserId(userId: string, updatedItem: Partial<MemoryDbDto>): boolean {
    const index = this.db.findIndex(item => item.userId === userId);
    if (index === -1) return false;
    this.db[index] = { ...this.db[index], ...updatedItem } as MemoryDbDto;
    return true;
  }

  updateBySessionKey(sessionKey: string, updatedItem: Partial<MemoryDbDto>): boolean {
    const index = this.db.findIndex(item => item.sessionKey === sessionKey);
    if (index === -1) return false;
    this.db[index] = { ...this.db[index], ...updatedItem } as MemoryDbDto;
    return true;
  }

  delete(id: string | number): boolean {
    const index = this.db.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.db.splice(index, 1);
    return true;
  }
  
  rangeDelete(startId: number, endId: number): boolean {
    const startIndex = this.db.findIndex(item => item.id >= startId);
    const endIndex = this.db.findIndex(item => item.id > endId);

    if (startIndex === -1) return false;  
    if (endIndex === -1) {
      this.db = this.db.slice(0, startIndex);
    } else {
      this.db = [...this.db.slice(0, startIndex), ...this.db.slice(endIndex)];
    }
    return true;
  }  
}

@Injectable()
export class MemoryDBManager {
  private readonly databases = new Map<new (...args: unknown[]) => unknown, MemoryDBService>();

  register(target: new (...args: unknown[]) => unknown, service: MemoryDBService): void {
    this.databases.set(target, service);
  }

  get(target: new (...args: unknown[]) => unknown): MemoryDBService | undefined {
    return this.databases.get(target);
  }
}
