import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../mark/services/user.service';
import { User } from '../../mark/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        'Email and/or password invalid!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new HttpException(
        'Email and/or password invalid!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.createToken(user);
  }

  async createToken(user: User): Promise<string> {
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        roleCode: user.roleCode,
      },
    };

    return await this.jwtService.signAsync(payload);
  }
}
