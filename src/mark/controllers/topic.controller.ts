import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TopicService } from '../services/topic.service';
import { Topic } from '../entities/topic.entity';
import { TopicDto } from '../dtos/user/topic.dto';
import { TopicComponentService } from '../services/topic.component.service';
import { TopicComponent } from '../entities/components/topic.component';
import { Private } from '../../auth/decorator/private.decorator';
import { RequiredPermission } from '../../auth/decorator/required.permission.decorator.ts';
import { CurrentUser } from '../../auth/decorator/current.access.decorator';
import { User } from '../entities/user.entity';
import { Permission } from '../enum/permission.enum';

@ApiTags('Topic')
@Private()
@ApiBearerAuth()
@Controller('topic')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly topicComponentService: TopicComponentService,
  ) {}

  @RequiredPermission(Permission.TOPIC_LIST)
  @Get()
  async list(@CurrentUser() cUser: User): Promise<Topic[]> {
    cUser.getRole().hasPermission('topic_list');

    return await this.topicService.list();
  }

  @RequiredPermission(Permission.TOPIC_READ)
  @Get('/:id')
  async get(@Param('id') id: number): Promise<Topic> {
    return await this.topicService.get(id);
  }

  @RequiredPermission(Permission.TOPIC_CREATE)
  @Post()
  async create(@Body() dto: TopicDto): Promise<Topic> {
    return await this.topicService.create(dto);
  }

  @RequiredPermission(Permission.TOPIC_UPDATE)
  @Put()
  async uodate(@Param('id') id: number, @Body() dto: TopicDto): Promise<Topic> {
    return await this.topicService.update(id, dto);
  }

  @RequiredPermission(Permission.TOPIC_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.topicService.delete(id);
  }

  @Get('/shortestTopicPath/:fromId/:toId')
  async shortestPath(
    @Param('fromId') fromId: string,
    @Param('toId') toId: string,
  ): Promise<TopicComponent[]> {
    return this.topicComponentService.shortestTopicPath(fromId, toId);
  }
}
