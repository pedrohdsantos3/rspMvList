import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { AwardsController } from './presentation/controllers/awards.controller';
import { AwardsIntervalService } from './application/services/awards-interval.service';

@Module({
  imports: [PrismaModule],
  controllers: [AwardsController],
  providers: [AwardsIntervalService],
})
export class AppModule {}
