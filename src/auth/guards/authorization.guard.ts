import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from 'src/mark/enum/permission.enum';
import { REQUIRED_PERMISSION_KEY } from '../decorator/required.permission.decorator.ts';
import { User } from 'src/mark/entities/user.entity.js';

@Injectable()
export class AuthorizationRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<Permission>(
      REQUIRED_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return user.getRole().hasPermission(requiredPermission);
  }
}
