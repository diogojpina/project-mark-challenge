import { Module } from '@nestjs/common';
import { MarkModule } from './mark/mark.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/project-mark.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MarkModule,
    AuthModule,
  ],
})
export class AppModule {}
