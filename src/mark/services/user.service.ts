import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/user/user.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user/create.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async get(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existingUsers = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUsers)
      throw new HttpException('Email already exists.', HttpStatus.NOT_FOUND);

    const user = new User();
    Object.assign(user, dto);
    user.password = await bcrypt.hash(dto.password, 10);

    return await this.userRepository.save(user);
  }

  async update(id: number, dto: UserDto): Promise<User> {
    const user = await this.get(id);
    return await this.userRepository.save({ ...user, dto });
  }

  async delete(id: number): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }
}
