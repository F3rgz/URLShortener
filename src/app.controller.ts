import { Controller, Get, Param, Query, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { UrlmapperService } from './urlmapper/urlmapper.service';

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
  async getShortUrl(@Req() request: Request, @Query('url') url) {
    const shortURL = await this.urlMapperService.createRecord(url);
    // TODO: Alter this to dynamically find the host name
    // OR provide one as an environment variable.
    //
    // The host & port is hard-coded here due to dev environment
    return `Your short URL: localhost:3000/${shortURL.key}`;
  }

  @Get('not-found')
  notFound() {
    return 'Could not find any record of your provided URL.';
  }

  @Get(':key')
  @Redirect('/not-found')
  async findOne(@Param('key') key: string) {
    const existingRecords = await this.urlMapperService.getRecord(key);

    if (existingRecords) {
      return { url: existingRecords.url };
    }
  }
}
