"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const csv_loader_1 = require("./utils/csv-loader");
const prisma_service_1 = require("./infrastructure/database/prisma.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    const movies = await (0, csv_loader_1.loadMoviesFromCsv)('src/infrastructure/database/Movielist.csv');
    for (const movie of movies) {
        await prisma.movie.create({ data: movie });
    }
    await app.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map