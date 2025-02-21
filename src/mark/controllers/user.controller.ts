import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/create.user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.userService.create(dto);
  }
}
