import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemoryDBService } from '../memory-db/memory-db.service.js';
import { MemoryDbDto } from '../dto/memoryDbDto.js';

@ApiTags('Dev API')
@Controller('dev')
export class MockDataController {
  constructor(private readonly memoryDbService: MemoryDBService) {}

  @ApiOperation({ summary: 'Get all Session Info', description: '모든 방송 정보를 돌려줍니다.' })
  @ApiResponse({ status: 200, description: 'Returns all Session Info' })
  
  @Get('/all')
  getAllMemoryData() {
    return this.memoryDbService.findAll();
  }

  @Delete('/delete')
  @ApiQuery({
    name: 'startId',
    required: true,
    description: '시작 번호',
  })
  @ApiQuery({
    name: 'endId',
    required: false,
    description: '끝 번호',
    default: -1, // 기본값 설정
  })
  @ApiOperation({ summary: 'Delete Session Info', description: '방송 정보를 삭제합니다. (start만 적으면 단일, start, end 범위를 적으면 범위 삭제)' })
  deleteMemoryData(@Query('startId') startId: number, @Query('endId') endId: number) {
    if (Number(endId) === -1) {
      this.memoryDbService.delete(Number(startId));
    }
    else if (Number(startId) < Number(endId)) {
      this.memoryDbService.rangeDelete(startId, endId);
    }
  }

  @Post('/append')
  @ApiOperation({ summary: 'Delete Session Info', description: '방송 정보를 삭제합니다. (start만 적으면 단일, start, end 범위를 적으면 범위 삭제)' })
  appendMemoryData(@Body() newData: MemoryDbDto) {
    this.memoryDbService.create(newData);
  }
}
