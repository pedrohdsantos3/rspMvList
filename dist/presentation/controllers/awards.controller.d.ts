import { AwardsIntervalService } from '../../application/services/awards-interval.service';
import { AwardIntervalResponse } from '../../core/types/award-interval.type';
export declare class AwardsController {
    private readonly awardsService;
    constructor(awardsService: AwardsIntervalService);
    getIntervals(): Promise<AwardIntervalResponse>;
}
