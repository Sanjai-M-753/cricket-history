
export enum EraType {
  EARLY_PIONEERS = 'Early Pioneers (16th C - 1876)',
  GOLDEN_AGE = 'The Golden Age & Bodyline (1877 - 1945)',
  POST_WAR = 'Post-War & Professionalism (1946 - 1970)',
  ODI_REVOLUTION = 'The World Cup Era (1971 - 1999)',
  MODERN_T20 = 'Modern T20 & Franchise Era (2000 - Present)'
}

export interface PlayerStats {
  format: string;
  matches: number;
  runs?: number;
  wickets?: number;
  average: number;
  strikeRate?: number;
  economy?: number;
}

export interface CricketPlayer {
  fullName: string;
  nickname?: string;
  dateOfBirth: string;
  placeOfBirth: string;
  country: string;
  playingEra: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';
  battingStyle: string;
  bowlingStyle: string;
  formatsPlayed: string[];
  careerStatistics: PlayerStats[];
  eraRating: string;
  majorAchievements: string[];
  iconicMoments: string[];
  strengths: string;
  impact: string;
  interestingFacts: string[];
  legacySummary: string;
}

export interface EraInfo {
  id: string;
  name: EraType;
  description: string;
  keyEvolution: string;
  didYouKnow: string;
}
