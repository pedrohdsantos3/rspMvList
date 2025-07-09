export interface AwardInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface AwardIntervalResponse {
  min: AwardInterval[];
  max: AwardInterval[];
}
