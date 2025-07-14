"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwardsIntervalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let AwardsIntervalService = class AwardsIntervalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findIntervals() {
        const winners = await this.prisma.movie.findMany({
            where: { winner: true },
            orderBy: { year: 'asc' },
        });
        const producerWinsMap = {};
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
                }
                else {
                    const currentName = producerWinsMap[normalized].name;
                    if (currentName === currentName.toLowerCase() &&
                        producer !== producer.toLowerCase()) {
                        producerWinsMap[normalized].name = producer;
                    }
                }
                producerWinsMap[normalized].years.push(movie.year);
            }
        }
        const intervals = [];
        for (const { name, years } of Object.values(producerWinsMap)) {
            if (years.length < 2)
                continue;
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
};
exports.AwardsIntervalService = AwardsIntervalService;
exports.AwardsIntervalService = AwardsIntervalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AwardsIntervalService);
//# sourceMappingURL=awards-interval.service.js.map