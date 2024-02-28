import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlmapperService } from './urlmapper/urlmapper.service';

export const ROOT_MESSAGE =
  'To begin, navigate to the following sub path: localhost:3000/shorten?http://anyurl.com/test';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly urlMapperService: UrlmapperService,
  ) {}

  @Get()
  getDefault(): string {
    return this.appService.getHello();
  }

  @Get('shorten')
  async getShortUrl(@Query() query: { url: string }) {
    const shortURL = await this.urlMapperService.createRecord(query.url);
    return `Your short URL: ${shortURL.key}`;
  }
}
