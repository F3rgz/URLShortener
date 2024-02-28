import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/graphql';

@Injectable()
export class AppService {
  @Query(() => String)
  getHello(): string {
    return 'To begin, navigate to the following sub path: localhost:3000/shorten?http://anyurl.com/test';
  }
}
