import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infrastructure/database/prisma.service';

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

    await prisma.movie.deleteMany();

    await prisma.movie.createMany({
      data: [
        {
          year: 2002,
          title: 'Movie A',
          studios: 'Studio A',
          producers: 'Matthew Vaughn',
          winner: true,
        },
        {
          year: 2015,
          title: 'Movie B',
          studios: 'Studio B',
          producers: 'Matthew Vaughn',
          winner: true,
        },
        {
          year: 1990,
          title: 'Movie C',
          studios: 'Studio C',
          producers: 'Joel Silver',
          winner: true,
        },
        {
          year: 1991,
          title: 'Movie D',
          studios: 'Studio D',
          producers: 'Joel Silver',
          winner: true,
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.movie.deleteMany();
    await app.close();
  });

  it('/awards/intervals (GET) should return correct min and max intervals', async () => {
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
