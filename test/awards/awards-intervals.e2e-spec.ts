import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infrastructure/database/prisma.service';
import { moviesFixture } from './fixtures/movies.fixtures';

describe('Awards Interval Integration (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prisma.movie.deleteMany();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.movie.deleteMany();
    await prisma.movie.createMany({ data: moviesFixture });
  });

  it('GET /awards/intervals should return correct min and max intervals', async () => {
    const response = await request(app.getHttpServer()).get(
      '/awards/intervals',
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    });
  });
});
