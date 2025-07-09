import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import {
  AwardInterval,
  AwardIntervalResponse,
} from '../../core/types/award-interval.type';

@Injectable()
export class AwardsIntervalService {
  constructor(private readonly prisma: PrismaService) {}

  async findIntervals(): Promise<AwardIntervalResponse> {
    const winners = await this.prisma.movie.findMany({
      where: { winner: true },
      orderBy: { year: 'asc' },
    });

    const producerWinsMap: Record<string, { name: string; years: number[] }> =
      {};

    for (const movie of winners) {
      const producers = movie.producers
        .split(/\s+and\s+|,/)
        .map((p) => p.trim())
        .filter(Boolean);

      for (const producer of producers) {
        const normalized = producer.toLowerCase();

        if (!producerWinsMap[normalized]) {
          producerWinsMap[normalized] = {
            name: producer,
            years: [],
          };
        } else {
          const currentName = producerWinsMap[normalized].name;
          if (
            currentName === currentName.toLowerCase() &&
            producer !== producer.toLowerCase()
          ) {
            producerWinsMap[normalized].name = producer;
          }
        }

        producerWinsMap[normalized].years.push(movie.year);
      }
    }

    const intervals: AwardInterval[] = [];

    for (const { name, years } of Object.values(producerWinsMap)) {
      if (years.length < 2) continue;

      const sortedYears = [...new Set(years)].sort((a, b) => a - b);
      for (let i = 1; i < sortedYears.length; i++) {
        intervals.push({
          producer: name,
          interval: sortedYears[i] - sortedYears[i - 1],
          previousWin: sortedYears[i - 1],
          followingWin: sortedYears[i],
        });
      }
    }

    if (!intervals.length) {
      return { min: [], max: [] };
    }

    const max = Math.max(...intervals.map((i) => i.interval));
    const min = Math.min(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === min),
      max: intervals.filter((i) => i.interval === max),
    };
  }
}
