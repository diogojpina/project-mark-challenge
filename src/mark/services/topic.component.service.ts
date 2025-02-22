import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TopicComponent } from '../entities/components/topic.component';
import { TopicService } from './topic.service';
import { ResourceService } from './resource.service';

@Injectable()
export class TopicComponentService {
  constructor(
    private readonly topicService: TopicService,
    private readonly resourceService: ResourceService,
  ) {}
  async shortestTopicPath(
    fromId: string,
    toId: string,
  ): Promise<TopicComponent[]> {
    const topics = await this.topicService.list();
    const resources = await this.resourceService.list();

    const topicComponents = [...topics, ...resources];

    const from = topicComponents.find((t) => t.getIdentifier() === fromId);
    const to = topicComponents.find((t) => t.getIdentifier() === toId);

    if (!from)
      throw new HttpException('From not found!', HttpStatus.BAD_REQUEST);
    if (!to) throw new HttpException('To not found!', HttpStatus.BAD_REQUEST);

    return from.shortestPath(to, topicComponents);
  }
}
