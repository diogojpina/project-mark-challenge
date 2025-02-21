import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkModule } from './mark/mark.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/project-mark.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
