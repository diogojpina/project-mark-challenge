import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoleEnum } from 'src/mark/enum/user.role.enum';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
