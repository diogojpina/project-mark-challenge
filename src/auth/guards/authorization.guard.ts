import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../../mark/enum/permission.enum';
import { User } from '../../mark/entities/user.entity';
import { REQUIRED_PERMISSION_KEY } from '../decorator/required.permission.decorator.ts';

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
