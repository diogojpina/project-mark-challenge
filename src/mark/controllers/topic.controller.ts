import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TopicService } from '../services/topic.service';
import { Topic } from '../entities/topic.entity';
import { TopicDto } from '../dtos/user/topic.dto';

@ApiTags('Topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async list(): Promise<Topic[]> {
    return await this.topicService.list();
  }

  @Get()
  async get(@Param('id') id: number): Promise<Topic> {
    return await this.topicService.get(id);
  }

  @Post()
  async create(@Body() dto: TopicDto): Promise<Topic> {
    return await this.topicService.create(dto);
  }

  @Put()
  async uodate(@Param('id') id: number, @Body() dto: TopicDto): Promise<Topic> {
    return await this.topicService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.topicService.delete(id);
  }
}
