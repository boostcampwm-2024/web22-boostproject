// host.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { HostController } from './host.controller.js';
import { HostService } from './host.service.js';
import { HttpStatus } from '@nestjs/common';
import {describe, expect, jest} from '@jest/globals';
import {Request, Response} from 'express';

describe('HostController', () => {
  let controller: HostController;
  let service: HostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostController],
      providers: [HostService],
    }).compile();

    controller = module.get<HostController>(HostController);
    service = module.get<HostService>(HostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 200 with host data for valid request', async () => {
    const mockUuid = 'test-uuid';
    const [mockStreamKey, mockSessionKey] = await service.generateStreamKey(mockUuid);

    jest.spyOn(service, 'generateStreamKey').mockResolvedValue([mockStreamKey, mockSessionKey]);

    const req = {
      headers: {
        host: 'http://example.com',
        'content-type': 'application/json',
      },
      body: {
        uuid: mockUuid,
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.generateStreamKey(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ 'stream-key':mockStreamKey, 'session-key':mockSessionKey });
  });

  it('should return 400 for invalid request with missing uuid', async () => {
    jest.spyOn(service, 'generateStreamKey').mockResolvedValue(undefined);

    const req = {
      headers: {
        host: 'http://example.com',
        'content-type': 'application/json',
      },
      body: {
        // uuid가 없는 비정상적인 요청
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.generateStreamKey(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should return 400 for invalid request with incorrect content-type', async () => {
    jest.spyOn(service, 'generateStreamKey').mockResolvedValue(undefined);

    const req = {
      headers: {
        host: 'http://example.com',
        'content-type': 'text/plain',
      },
      body: {
        uuid: 'test-uuid',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.generateStreamKey(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });
});
