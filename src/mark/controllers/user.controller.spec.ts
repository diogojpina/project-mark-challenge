import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';
import { ModuleMocker } from 'jest-mock';
import { UserRole } from '../enum/user.role.enum';
import { CreateUserDto } from '../dtos/user/create.user.dto';
import { UserDto } from '../dtos';

const userAdmin = new User();
userAdmin.id = 1;
userAdmin.name = 'Admin';
userAdmin.email = 'admin@gmail.com';
userAdmin.roleCode = UserRole.ADMIN;

const users = [userAdmin];

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            list: jest.fn().mockResolvedValue(Promise.resolve(users)),
            get: jest.fn().mockResolvedValue(Promise.resolve(users[0])),
            create: jest.fn().mockResolvedValue(Promise.resolve(users[0])),
            update: jest.fn().mockResolvedValue(Promise.resolve(users[0])),
            delete: jest.fn().mockResolvedValue(Promise.resolve(true)),
          };
        }
      })
      .compile();

    userController = module.get<UserController>(UserController);
  });

  describe('list', () => {
    it('should return an array of users', async () => {
      expect(await userController.list()).toBe(users);
    });
  });

  describe('get', () => {
    it('should return an user', async () => {
      expect(await userController.get(1)).toBe(users[0]);
    });
  });

  describe('create', () => {
    it('should create and return an user', async () => {
      const dto = new CreateUserDto();
      dto.name = 'Admin';
      dto.email = 'admin@gmail.com';
      dto.password = '123456';
      dto.roleCode = UserRole.ADMIN;
      const user = await userController.create(dto);
      expect(user.id).toBe(1);
    });
  });

  describe('update', () => {
    it('should update and return an user', async () => {
      const dto = new UserDto();
      dto.name = 'Admin';
      dto.email = 'admin@gmail.com';
      dto.roleCode = UserRole.ADMIN;
      const user = await userController.update(1, dto);
      expect(user.id).toBe(1);
    });
  });

  describe('delete', () => {
    it('should delete and user and return true', async () => {
      expect(await userController.delete(1)).toBe(true);
    });
  });
});
