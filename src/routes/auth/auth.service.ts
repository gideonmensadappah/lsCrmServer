import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
