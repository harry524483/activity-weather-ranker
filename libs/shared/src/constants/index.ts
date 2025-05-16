import { WeatherForecastDaily, Importance } from '../types/index.js';

export const importanceWeights = {
  critical: 2,
  important: 1.5,
  nice: 0.5,
  neutral: 0,
} as const;

export const activityTypes = [
  'skiing',
  'surfing',
  'outdoor_sightseeing',
  'indoor_sightseeing',
] as const;

export const skiingFactors: Record<keyof WeatherForecastDaily, Importance> = {
  time: 'neutral',
  temperature_2m_max: 'important',
  temperature_2m_min: 'nice',
  precipitation_sum: 'important',
  wind_speed_10m_max: 'nice',
  wind_direction_10m_dominant: 'neutral',
  uv_index_max: 'neutral',
  snowfall_sum: 'critical',
  snow_depth_max: 'important',
};
