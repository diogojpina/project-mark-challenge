import { CreateUserDto } from 'src/mark/dtos/user/create.user.dto';
import { User } from '../user.entity';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserFactory {
  public static async create(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    user.roleCode = dto.roleCode;

    user.password = await bcrypt.hash(dto.password, 10);

    return user;
  }
}
