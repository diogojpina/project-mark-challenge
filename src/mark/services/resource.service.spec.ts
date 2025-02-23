import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
import { ResourceType } from '../enum/resource.type.enum';
import { ResourceService } from './resource.service';
import { ResourceDto } from '../dtos/user/resource.dto';

const moduleMocker = new ModuleMocker(global);

const resource1 = new Resource();
resource1.id = 1;
resource1.url = 'http://www.test.com';
resource1.type = ResourceType.PDF;

const resources = [resource1];

describe('Resource Service', () => {
  let service: ResourceService;
  let resourceRepository: Repository<Resource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceService],
    })
      .useMocker((token) => {
        if (token === 'ResourceRepository') {
          return {
            find: jest.fn().mockResolvedValue(Promise.resolve(resources)),
            findOne: jest.fn().mockResolvedValue(Promise.resolve(resources[0])),
            save: jest.fn().mockResolvedValue(Promise.resolve(resources[0])),
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

    service = module.get<ResourceService>(ResourceService);
    resourceRepository = module.get('ResourceRepository');
  });

  describe('list', () => {
    it('should return an array of resources', async () => {
      expect(await service.list()).toBe(resources);
    });
  });

  describe('get', () => {
    it('should return a resource', async () => {
      jest
        .spyOn(resourceRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(resources[0]));

      expect(await service.get(1)).toBe(resources[0]);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(resourceRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      expect(service.get(42)).rejects.toThrow(/not found/);
    });
  });

  describe('create', () => {
    it('should create and return a resource', async () => {
      const dto: ResourceDto = {
        topicId: 1,
        url: 'http://www.test.com',
        description: '',
        type: ResourceType.PDF,
      };
      expect(await service.create(dto)).toBe(resources[0]);
    });
  });

  describe('update', () => {
    it('should update and return a resource', async () => {
      const dto: ResourceDto = {
        topicId: 1,
        url: 'http://www.test.com',
        description: '',
        type: ResourceType.PDF,
      };
      expect(await service.update(1, dto)).toBe(resources[0]);
    });
  });

  describe('delete', () => {
    it('should delete a resource and return true', async () => {
      expect(await service.delete(1)).toBe(true);
    });
  });
});
