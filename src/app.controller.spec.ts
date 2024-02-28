import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UrlmapperService } from './urlmapper/urlmapper.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let urlMapperService: UrlmapperService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, UrlmapperService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    urlMapperService = app.get<UrlmapperService>(UrlmapperService);
  });

  describe('getDefault', () => {
    it('should return "Hello World!"', () => {
      jest.spyOn(appService, 'getHello').mockReturnValue('Hello World!');
      expect(appController.getDefault()).toBe('Hello World!');
    });
  });

  describe('getShortUrl', () => {
    it('should return short URL for the provided URL', async () => {
      const url = 'https://example.com';
      const shortURL = { key: 'abc123' };
      jest.spyOn(urlMapperService, 'createRecord').mockResolvedValue(shortURL);

      const result = await appController.getShortUrl({} as any, url);

      expect(result).toBe(`Your short URL: localhost:3000/${shortURL.key}`);
    });
  });

  describe('notFound', () => {
    it('should return a "not found" message', () => {
      expect(appController.notFound()).toBe(
        'Could not find any record of your provided URL.',
      );
    });
  });

  describe('findOne', () => {
    it('should redirect to /not-found if record not found', async () => {
      jest.spyOn(urlMapperService, 'getRecord').mockResolvedValue(null);

      const result = await appController.findOne('abc123');

      // undefined is returned if no match is found.
      expect(result).toEqual(undefined);
    });

    it('should return redirect URL if record found', async () => {
      const existingRecord = { url: 'https://example.com' };
      jest
        .spyOn(urlMapperService, 'getRecord')
        .mockResolvedValue(existingRecord);

      const result = await appController.findOne('abc123');

      expect(result).toEqual({ url: existingRecord.url });
    });
  });
});
