import { Module } from '@nestjs/common';
import { TopicController } from './controllers/topic.controller';
import { UserController } from './user/user.controller';

@Module({
  controllers: [TopicController, UserController],
})
export class MarkModule {}
