import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/mark/enum/permission.enum';

export const REQUIRED_PERMISSION_KEY = 'permission';
export const RequiredPermission = (permission: Permission) =>
  SetMetadata(REQUIRED_PERMISSION_KEY, permission);
