import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Topic } from '../entities/topic.entity';
import { TopicService } from './topic.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user/create.user.dto';
import { TopicDto } from '../dtos/user/topic.dto';

const moduleMocker = new ModuleMocker(global);

const topic1 = new Topic();
topic1.id = 1;
topic1.parent = null;
topic1.children = [];
topic1.resources = [];
topic1.content = 'Topic 1';
topic1.content = '1';

const topics = [topic1];

describe('Topic Service', () => {
  let service: TopicService;
  let topicRepository: Repository<Topic>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicService],
    })
      .useMocker((token) => {
        if (token === 'TopicRepository') {
          return {
            find: jest.fn().mockResolvedValue(Promise.resolve(topics)),
            findOne: jest.fn().mockResolvedValue(Promise.resolve(topics[0])),
            save: jest.fn().mockResolvedValue(Promise.resolve(topics[0])),
            delete: jest.fn().mockResolvedValue(Promise.resolve(true)),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const mock = moduleMocker.generateFromMetadata(mockMetadata);
          return mock;
        }
      })
      .compile();

    service = module.get<TopicService>(TopicService);
    topicRepository = module.get('TopicRepository');
  });

  describe('list', () => {
    it('should return an array of topics', async () => {
      expect(await service.list()).toBe(topics);
    });
  });

  describe('get', () => {
    it('should return a topic', async () => {
      jest
        .spyOn(topicRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(topics[0]));

      expect(await service.get(1)).toBe(topics[0]);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(topicRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      expect(service.get(42)).rejects.toThrow(/not found/);
    });
  });

  describe('create', () => {
    it('should create and return a topic', async () => {
      const dto: TopicDto = {
        name: 'Topic 1',
        content: '1',
      };
      expect(await service.create(dto)).toBe(topics[0]);
    });
  });

  describe('update', () => {
    it('should update and return a topic', async () => {
      const dto: TopicDto = {
        name: 'Topic 1',
        content: '1',
      };
      expect(await service.update(1, dto)).toBe(topics[0]);
    });
  });

  describe('delete', () => {
    it('should delete a topic and return true', async () => {
      expect(await service.delete(1)).toBe(true);
    });
  });
});
