import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MarkModule } from 'src/mark/mark.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

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
      useClass: AuthGuard,
    },
    AuthService,
  ],
})
export class AuthModule {}
