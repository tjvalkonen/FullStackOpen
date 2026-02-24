/*
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
*/
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

// Jos tarvitset arvoja esim. validointiin tai valikkoon:
export const WeatherValues = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const;
export const VisibilityValues = ['great', 'good', 'ok', 'poor'] as const;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;