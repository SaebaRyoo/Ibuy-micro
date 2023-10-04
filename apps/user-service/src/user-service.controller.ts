import { Controller, Get, Post } from '@nestjs/common';
import { UserServiceService } from './user-service.service';

@Controller('order')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Post()
  findOne(): Promise<any> {
    return this.userServiceService.findOne('ryo');
  }
}
