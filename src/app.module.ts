import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkModule } from './mark/mark.module';

@Module({
  imports: [MarkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
