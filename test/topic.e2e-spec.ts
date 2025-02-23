import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestUtil } from './util/test.util';
import { TopicDto } from '../src/mark/dtos/user/topic.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let testUtil: TestUtil;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestUtil],
    }).compile();

    app = moduleFixture.createNestApplication();
    testUtil = moduleFixture.get<TestUtil>(TestUtil);
    await testUtil.realodDb();
    await app.init();
  });

  it('/topic (GET)', async () => {
    const jwtToken = await testUtil.createAdminToken();
    return request(app.getHttpServer())
      .get('/topic')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(200);
  });

  it('/topic (GET) - unauthorized', () => {
    return request(app.getHttpServer()).get('/topic').expect(401);
  });

  it('/topic (CREATE)', async () => {
    const jwtToken = await testUtil.createAdminToken();
    const dto: TopicDto = new TopicDto();
    dto.name = 'Topic 1';
    dto.content = '1';
    return request(app.getHttpServer())
      .post('/topic')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(dto)
      .expect(201);
  });

  it('/topic/:id (UPDATE))', async () => {
    const jwtToken = await testUtil.createAdminToken();
    const dto: TopicDto = new TopicDto();
    dto.name = 'Topic 1';
    dto.content = '1';
    return request(app.getHttpServer())
      .put('/topic/1')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(dto)
      .expect(200);
  });

  it('/topic/:id (UPDATE))', async () => {
    const jwtToken = await testUtil.createAdminToken();
    return request(app.getHttpServer())
      .delete('/topic/42')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(200);
  });

  it('/topic/shortestPath (SHORTEST_PATH)', async () => {
    const jwtToken = await testUtil.createAdminToken();

    return request(app.getHttpServer())
      .get('/topic/shortestPath/topic-1/topic-11')
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(200);
  });
});
