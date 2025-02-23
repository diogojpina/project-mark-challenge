import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topic.entity';
import { Repository } from 'typeorm';
import { TopicDto } from '../dtos/user/topic.dto';
import { TopicVersion } from '../entities/topic.version.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async list(): Promise<Topic[]> {
    return await this.topicRepository.find({
      relations: {
        parent: true,
        children: true,
        resources: true,
        versions: true,
      },
    });
  }

  async get(id: number): Promise<Topic> {
    const topic = await this.topicRepository.findOne({
      where: { id },
      relations: {
        parent: true,
        children: true,
        resources: true,
        versions: true,
      },
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

  async versioning(id: number, dto: TopicDto): Promise<Topic> {
    const topic = await this.get(id);

    const topicVersion = new TopicVersion();
    topicVersion.name = dto.name;
    topicVersion.content = dto.content;

    topic.versions.push(topicVersion);

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

  async getRecursive(id: number): Promise<Topic> {
    const root = await this.get(id);
    const queue: Topic[] = [root];

    while (queue.length > 0) {
      const topic = queue.shift();

      if (!topic.children) continue;

      for (let i = 0; i < topic.children.length; i++) {
        const child = topic.children[i];
        queue.push(topic.children[i]);
        topic.children[i] = await this.get(child.id);
      }
    }
    return root;
  }
}
