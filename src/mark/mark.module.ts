import { Module } from '@nestjs/common';
import { TopicController } from './controllers/topic.controller';
import { ResourceController } from './controllers/resource.controller';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [TopicController, UserController, ResourceController],
})
export class MarkModule {}
