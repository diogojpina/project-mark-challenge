import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
import { ResourceDto } from '../dtos/user/resource.dto';
import { TopicService } from './topic.service';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    private readonly topicService: TopicService,
  ) {}

  async list(): Promise<Resource[]> {
    return await this.resourceRepository.find();
  }

  async get(id: number): Promise<Resource> {
    const topic = await this.resourceRepository.findOneBy({ id });
    if (!topic)
      throw new HttpException('Topic not found!', HttpStatus.BAD_REQUEST);
    return topic;
  }

  async create(dto: ResourceDto): Promise<Resource> {
    const resource = new Resource();
    await this.fill(resource, dto);
    return await this.resourceRepository.save(resource);
  }

  async update(id: number, dto: ResourceDto): Promise<Resource> {
    const resource = await this.get(id);
    await this.fill(resource, dto);
    return await this.resourceRepository.save(resource);
  }

  async delete(id: number): Promise<boolean> {
    await this.resourceRepository.delete(id);
    return true;
  }

  private async fill(resource: Resource, dto: ResourceDto): Promise<void> {
    resource.topic = dto.topicId
      ? await this.topicService.get(dto.topicId)
      : null;

    delete dto.topicId;
    Object.assign(resource, dto);
  }
}
