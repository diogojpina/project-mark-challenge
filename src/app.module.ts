import { Module } from '@nestjs/common';
import { MarkModule } from './mark/mark.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configutation';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'sqlite',
          database: configService.get<string>('database.path'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    MarkModule,
    AuthModule,
  ],
})
export class AppModule {}
