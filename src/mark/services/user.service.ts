import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user/create.user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existingUsers = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUsers)
      throw new HttpException('Email already exists.', HttpStatus.NOT_FOUND);

    const user = new User();
    Object.assign(user, dto);

    return await this.userRepository.save(user);
  }
}
