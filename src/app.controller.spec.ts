import { Test, TestingModule } from '@nestjs/testing';
import { AppController, ROOT_MESSAGE } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UrlmapperService } from './urlmapper/urlmapper.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, UrlmapperService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getDefault()).toBe(ROOT_MESSAGE);
    });
  });
});
