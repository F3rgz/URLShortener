import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UrlmapperService } from './urlmapper.service';

describe('UrlmapperService', () => {
  let service: UrlmapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlmapperService, PrismaService],
    }).compile();

    service = module.get<UrlmapperService>(UrlmapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
