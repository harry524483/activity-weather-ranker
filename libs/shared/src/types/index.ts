export type Activity =
  | 'skiing'
  | 'surfing'
  | 'outdoor_sightseeing'
  | 'indoor_sightseeing';

export type WeatherForecastDaily = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
  wind_direction_10m_dominant: number[];
  uv_index_max: number[];
  snowfall_sum: number[];
  snow_depth_max: number[];
};

export type WeatherForecast = {
  latitude: number;
  longitude: number;
  daily: WeatherForecastDaily;
};

export type Importance = 'critical' | 'important' | 'nice' | 'neutral';

export type FactorScorerArgs = {
  value: number;
  weather: WeatherForecastDaily;
  day: number;
  weight: number;
};

export type FactorScorer = (args: FactorScorerArgs) => number;

export type FactorConfig = {
  importance: Importance;
  scorer?: FactorScorer;
};
