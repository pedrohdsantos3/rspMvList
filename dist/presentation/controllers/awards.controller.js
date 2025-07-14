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
exports.AwardsController = void 0;
const common_1 = require("@nestjs/common");
const awards_interval_service_1 = require("../../application/services/awards-interval.service");
let AwardsController = class AwardsController {
    awardsService;
    constructor(awardsService) {
        this.awardsService = awardsService;
    }
    async getIntervals() {
        return this.awardsService.findIntervals();
    }
};
exports.AwardsController = AwardsController;
__decorate([
    (0, common_1.Get)('intervals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AwardsController.prototype, "getIntervals", null);
exports.AwardsController = AwardsController = __decorate([
    (0, common_1.Controller)('awards'),
    __metadata("design:paramtypes", [awards_interval_service_1.AwardsIntervalService])
], AwardsController);
//# sourceMappingURL=awards.controller.js.map