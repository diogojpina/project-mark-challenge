import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MarkModule } from 'src/mark/mark.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationRoleGuard } from './guards/authorization.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'jwt-secret',
      signOptions: { expiresIn: '7d' },
    }),
    forwardRef(() => MarkModule),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationRoleGuard,
    },
    AuthService,
  ],
})
export class AuthModule {}
