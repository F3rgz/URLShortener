import { Injectable } from '@nestjs/common';
import { Prisma, urlRecord } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UrlmapperService {
  constructor(private prisma: PrismaService) {}

  async getRecord(
    recordWhereUniqueInput: Prisma.urlRecordWhereUniqueInput,
  ): Promise<urlRecord> {
    return this.prisma.urlRecord.findUnique({ where: recordWhereUniqueInput });
  }

  async createRecord(data): Promise<Prisma.urlRecordWhereUniqueInput> {
    return this.prisma.urlRecord.create({
      data,
    });
  }
}
