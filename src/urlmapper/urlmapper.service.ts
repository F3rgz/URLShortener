import { Injectable } from '@nestjs/common';
import { urlRecord } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { shortenURL } from '../utils/hashing/hashing.utils';

@Injectable()
export class UrlmapperService {
  constructor(private prisma: PrismaService) {}

  async getRecord(key): Promise<Partial<urlRecord>> {
    return this.prisma.urlRecord.findUnique({
      where: { key },
      select: { key: true, url: true },
    });
  }

  async createRecord(url: string): Promise<Partial<urlRecord>> {
    const shortUrl = shortenURL(url);

    const existingRecord = await this.prisma.urlRecord.findUnique({
      where: { key: shortUrl },
      select: { key: true },
    });

    if (existingRecord?.key) {
      return existingRecord;
    }

    return await this.prisma.urlRecord.create({
      data: {
        url,
        key: shortUrl,
      },
      select: { key: true },
    });
  }
}
