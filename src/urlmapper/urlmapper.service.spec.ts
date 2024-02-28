import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { shortenURL } from '../utils/hashing/hashing.utils';
import { UrlmapperService } from './urlmapper.service';

describe('UrlmapperService', () => {
  let urlMapperService: UrlmapperService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlmapperService, PrismaService],
    }).compile();

    urlMapperService = module.get<UrlmapperService>(UrlmapperService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRecord', () => {
    it('should return a record when given a valid key', async () => {
      const mockRecord = { key: 'abc', url: 'https://example.com' };
      const mockFindUnique = jest
        .spyOn(prismaService.urlRecord, 'findUnique')
        .mockResolvedValue(mockRecord as any);

      const result = await urlMapperService.getRecord(mockRecord.key);

      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { key: mockRecord.key },
        select: { key: true, url: true },
      });
      expect(result).toEqual(mockRecord);
    });

    it('should return null when no record is found for the given key', async () => {
      const mockKey = 'invalidKey';
      jest.spyOn(prismaService.urlRecord, 'findUnique').mockResolvedValue(null);

      const result = await urlMapperService.getRecord(mockKey);

      expect(result).toBeNull();
    });
  });

  describe('createRecord', () => {
    it('should create a new record for a URL', async () => {
      const mockUrl = 'https://example.com';
      const mockShortUrl = shortenURL(mockUrl);
      jest.spyOn(prismaService.urlRecord, 'findUnique').mockResolvedValue(null);
      const mockCreate = jest
        .spyOn(prismaService.urlRecord, 'create')
        .mockResolvedValue({ key: mockShortUrl } as any);

      const result = await urlMapperService.createRecord(mockUrl);

      expect(mockCreate).toHaveBeenCalledWith({
        data: { url: mockUrl, key: mockShortUrl },
        select: { key: true },
      });
      expect(result).toEqual({ key: mockShortUrl });
    });

    it('should return existing record if URL already shortened', async () => {
      const mockUrl = 'https://example.com';
      const mockShortUrl = shortenURL(mockUrl);
      const mockRecord = { key: mockShortUrl };
      jest
        .spyOn(prismaService.urlRecord, 'findUnique')
        .mockResolvedValue(mockRecord as any);

      const result = await urlMapperService.createRecord(mockUrl);

      expect(result).toEqual(mockRecord);
    });
  });
});
