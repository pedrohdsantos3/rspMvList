import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadMoviesFromCsv } from './utils/csv-loader';
import { PrismaService } from './infrastructure/database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prisma = app.get(PrismaService);
  const movies = await loadMoviesFromCsv(
    'src/infrastructure/database/Movielist.csv',
  );
  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
  }

  await app.listen(3002);
}
bootstrap();
