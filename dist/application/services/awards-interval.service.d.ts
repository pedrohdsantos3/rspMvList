import { PrismaService } from '../../infrastructure/database/prisma.service';
import { AwardIntervalResponse } from '../../core/types/award-interval.type';
export declare class AwardsIntervalService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findIntervals(): Promise<AwardIntervalResponse>;
}
