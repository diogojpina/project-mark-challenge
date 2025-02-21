import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities/topic.entity';
import { Repository } from 'typeorm';
import { TopicDto } from '../dtos/user/topic.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async list(): Promise<Topic[]> {
    return await this.topicRepository.find();
  }

  async get(id: number): Promise<Topic> {
    const topic = await this.topicRepository.findOneBy({ id });
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
}
