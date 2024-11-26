import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createPool, Pool, RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('../.env') });

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool | null = null;

  async onModuleInit(): Promise<void> {
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
  }

  async onModuleDestroy(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      console.log('Database pool closed');
    }
  }

  async runQuery<T extends RowDataPacket[]>(query: string, parameters: unknown[] = []): Promise<T> {
    if (!this.pool) {
      throw new Error('Database pool is not initialized');
    }
    const [rows] = await this.pool.execute<T>(query, parameters);
    return rows;
  }
}
