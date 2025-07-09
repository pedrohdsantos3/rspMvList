import { Controller, Get } from '@nestjs/common';
import { AwardsIntervalService } from '../../application/services/awards-interval.service';
import { AwardIntervalResponse } from '../../core/types/award-interval.type';

@Controller('awards')
export class AwardsController {
  constructor(private readonly awardsService: AwardsIntervalService) {}

  @Get('intervals')
  async getIntervals(): Promise<AwardIntervalResponse> {
    return this.awardsService.findIntervals();
  }
}
