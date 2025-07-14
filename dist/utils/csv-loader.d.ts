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
export declare function loadMoviesFromCsv(path: string): Promise<Movie[]>;
