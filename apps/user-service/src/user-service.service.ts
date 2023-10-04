import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServiceService {
  private readonly users = [
    {
      userId: 1,
      username: 'ryo',
      password: 'abc',
    },
    {
      userId: 2,
      username: 'william',
      password: '123',
    },
  ];

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
