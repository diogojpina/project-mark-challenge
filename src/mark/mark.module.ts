import { Module } from '@nestjs/common';
import { TopicController } from './controllers/topic.controller';
import { ResourceController } from './controllers/resource.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Resource } from './entities/resource.entity';
import { User } from './entities/user.entity';
import { TopicService } from './services/topic.service';
import { ResourceService } from './services/resource.service';
import { TopicComponentService } from './services/topic.component.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Resource, User])],
  controllers: [TopicController, UserController, ResourceController],
  providers: [
    UserService,
    TopicService,
    ResourceService,
    TopicComponentService,
  ],
  exports: [UserService],
})
export class MarkModule {}
