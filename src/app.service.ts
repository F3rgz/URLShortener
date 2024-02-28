import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/graphql';

export const ROOT_MESSAGE =
  'To begin, navigate to the following sub path: localhost:3000/shorten?url=http://anyurl.com/test';

@Injectable()
export class AppService {
  @Query(() => String)
  getHello(): string {
    return ROOT_MESSAGE;
  }
}
