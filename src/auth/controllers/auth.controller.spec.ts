import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
import { User } from '../../mark/entities/user.entity';
import { UserRole } from '../../mark/enum/user.role.enum';

const user = new User();
user.id = 1;
user.name = 'Admin';
user.email = 'admin@admin.com';
user.password = '$2b$10$S99RMmW3pSEy7ioZex.MW.9r4Y0kMLVlEg8oBtYzbhXkxCXXDZneG';
user.roleCode = UserRole.ADMIN;

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        if (token === AuthService) {
          return {
            login: jest.fn().mockResolvedValue(Promise.resolve('token')),
          };
        }
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should login', async () => {
      const dto: LoginDto = {
        email: 'admin@admin.com',
        password: '123456',
      };
      expect((await controller.login(dto)).token).toBe('token');
    });
  });
});
