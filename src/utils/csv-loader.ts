import * as fs from 'fs';
import * as csv from 'csv-parser';

export interface MovieCsvRow {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner?: string;
}

export interface Movie {
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

export async function loadMoviesFromCsv(path: string): Promise<Movie[]> {
  const movies: Movie[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(
        csv({
          separator: ';',
          mapHeaders: ({ header }) => header.trim().toLowerCase(),
        }),
      )
      .on('data', (row: MovieCsvRow) => {
        const year = parseInt(row.year, 10);
        const safeMovie: Movie = {
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
