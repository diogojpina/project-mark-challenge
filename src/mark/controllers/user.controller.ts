import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from '../dtos/user/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/user/create.user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list(): Promise<User[]> {
    return await this.userService.list();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<User> {
    return await this.userService.get(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.userService.create(dto);
  }

  @Put()
  async update(@Param('id') id: number, @Body() dto: UserDto): Promise<User> {
    return await this.userService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.userService.delete(id);
  }
}
