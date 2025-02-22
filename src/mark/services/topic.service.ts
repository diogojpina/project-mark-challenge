import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topic.entity';
import { Repository } from 'typeorm';
import { TopicDto } from '../dtos/user/topic.dto';
import { DirectionGraph } from '../graph/directional.graph';
import { TopicComponent } from '../entities/interface/topic.component.interface';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async list(): Promise<Topic[]> {
    return await this.topicRepository.find({
      relations: { parent: true, children: true, resources: true },
    });
  }

  async get(id: number): Promise<Topic> {
    const topic = await this.topicRepository.findOne({
      where: { id },
      relations: { parent: true, children: true, resources: true },
    });
    if (!topic)
      throw new HttpException('Topic not found!', HttpStatus.BAD_REQUEST);
    return topic;
  }

  async create(dto: TopicDto): Promise<Topic> {
    const topic = new Topic();
    await this.fill(topic, dto);
    return await this.topicRepository.save(topic);
  }

  async update(id: number, dto: TopicDto): Promise<Topic> {
    const topic = await this.get(id);
    await this.fill(topic, dto);
    return await this.topicRepository.save(topic);
  }

  async delete(id: number): Promise<boolean> {
    await this.topicRepository.delete(id);
    return true;
  }

  private async fill(topic: Topic, dto: TopicDto): Promise<void> {
    topic.parent = dto.parentId ? await this.get(dto.parentId) : null;

    delete dto.parentId;
    Object.assign(topic, dto);
  }

  async shortestTopicPath(
    fromId: number,
    toId: number,
  ): Promise<TopicComponent[]> {
    const topics = await this.topicRepository.find({
      relations: { children: true },
    });

    const from = topics.find((t) => t.id === fromId);
    const to = topics.find((t) => t.id === toId);

    if (!from)
      throw new HttpException('From not found!', HttpStatus.BAD_REQUEST);
    if (!to) throw new HttpException('To not found!', HttpStatus.BAD_REQUEST);

    const path = DirectionGraph.shortestPath(topics, from, to);
    return path;
  }
}
