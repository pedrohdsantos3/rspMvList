"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMoviesFromCsv = loadMoviesFromCsv;
const fs = require("fs");
const csv = require("csv-parser");
async function loadMoviesFromCsv(path) {
    const movies = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .pipe(csv({
            separator: ';',
            mapHeaders: ({ header }) => header.trim().toLowerCase(),
        }))
            .on('data', (row) => {
            const year = parseInt(row.year, 10);
            const safeMovie = {
                year: isNaN(year) ? 0 : year,
                title: row.title?.trim() || '',
                studios: row.studios?.trim() || '',
                producers: row.producers?.trim() || '',
                winner: row.winner?.toLowerCase() === 'yes',
            };
            movies.push(safeMovie);
        })
            .on('end', () => resolve(movies))
            .on('error', reject);
    });
}
//# sourceMappingURL=csv-loader.js.map