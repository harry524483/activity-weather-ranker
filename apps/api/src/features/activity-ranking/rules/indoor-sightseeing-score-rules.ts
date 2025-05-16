import {
  WeatherForecastDaily,
  FactorConfig,
} from '@activity-weather-ranker/shared';
import { scoreByConfig, optimalRangeScorer } from './activity-scoring-utils';

const comfortableTempRange = [10, 28]; // Indoors is fine in a wide range
const comfortablePrecipitationRange = [0, 10]; // 0-10mm is fine for indoor
const comfortableWindRange = [0, 20]; // 0-20 m/s is fine for indoor

const indoorSightseeingFactorConfig: Record<
  keyof WeatherForecastDaily,
  FactorConfig
> = {
  time: { importance: 'neutral' },
  temperature_2m_max: {
    importance: 'nice',
    scorer: optimalRangeScorer(comfortableTempRange, 1),
  },
  temperature_2m_min: { importance: 'neutral' },
  precipitation_sum: {
    importance: 'nice',
    scorer: optimalRangeScorer(comfortablePrecipitationRange, 1),
  },
  wind_speed_10m_max: {
    importance: 'nice',
    scorer: optimalRangeScorer(comfortableWindRange, 1),
  },
  wind_direction_10m_dominant: { importance: 'neutral' },
  uv_index_max: { importance: 'neutral' },
  snowfall_sum: { importance: 'neutral' },
  snow_depth_max: { importance: 'neutral' },
};

export function scoreIndoorSightseeing(
  weather: WeatherForecastDaily,
  day: number
): number {
  return scoreByConfig(indoorSightseeingFactorConfig, weather, day);
}
