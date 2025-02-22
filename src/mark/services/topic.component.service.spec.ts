import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Topic } from '../entities/topic.entity';
import { TopicComponentService } from './topic.component.service';
import { TopicService } from './topic.service';
import { ResourceService } from './resource.service';
import { Resource } from '../entities/resource.entity';

const moduleMocker = new ModuleMocker(global);

const resource111 = new Resource();
resource111.id = 111;

const topic111 = new Topic();
topic111.id = 111;
topic111.children = [];
topic111.resources = [resource111];
topic111.content = 'Topic 111';
topic111.content = '111';

resource111.topic = topic111;

const topic11 = new Topic();
topic11.id = 11;
topic11.children = [topic111];
topic11.resources = [];
topic11.content = 'Topic 11';
topic11.content = '11';

topic111.parent = topic11;

const topic1 = new Topic();
topic1.id = 1;
topic1.parent = null;
topic1.children = [topic11];
topic1.resources = [];
topic1.content = 'Topic 1';
topic1.content = '1';

topic11.parent = topic1;

const topic2 = new Topic();
topic2.id = 2;
topic2.parent = null;
topic2.children = [];
topic2.resources = [];
topic2.content = 'Topic 2';
topic2.content = '2';

const topics = [topic1, topic2, topic11, topic111];
const resources = [resource111];

describe('Topic Component Service', () => {
  let service: TopicComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicComponentService],
    })
      .useMocker((token) => {
        if (token === TopicService) {
          return {
            list: jest.fn().mockResolvedValue(Promise.resolve(topics)),
          };
        }

        if (token === ResourceService) {
          return {
            list: jest.fn().mockResolvedValue(Promise.resolve(resources)),
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

    service = module.get<TopicComponentService>(TopicComponentService);
  });

  describe('shortest path', () => {
    it('same origin and destination', async () => {
      const path = await service.shortestPath('topic-1', 'topic-1');
      expect(path.length).toBe(1);
    });

    it('no topic path', async () => {
      const path = await service.shortestPath('topic-1', 'topic-2');
      expect(path.length).toBe(0);
    });

    it('3 levels', async () => {
      const path = await service.shortestPath('topic-1', 'topic-111');
      expect(path.length).toBe(3);
    });

    it('topic to resource', async () => {
      const path = await service.shortestPath('topic-1', 'resource-111');
      expect(path.length).toBe(4);
    });

    it('no topic to resource path', async () => {
      const path = await service.shortestPath('topic-2', 'resource-111');
      expect(path.length).toBe(0);
    });
  });
});
