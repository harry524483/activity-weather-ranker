import {
  WeatherForecastDaily,
  FactorConfig,
  FactorScorerArgs,
} from '@activity-weather-ranker/shared';
import { scoreByConfig, optimalRangeScorer } from './activity-scoring-utils';

const optimalTempRange = [-5, 2];

const skiingFactorConfig: Record<keyof WeatherForecastDaily, FactorConfig> = {
  time: { importance: 'neutral' },
  temperature_2m_max: {
    importance: 'important',
    scorer: optimalRangeScorer(optimalTempRange, 2),
  },
  temperature_2m_min: {
    importance: 'nice',
    scorer: ({ value, weight }: FactorScorerArgs) => -value * weight, // Lower is better
  },
  precipitation_sum: {
    importance: 'important',
    scorer: ({ value, weather, day, weight }: FactorScorerArgs) =>
      weather.temperature_2m_max[day] > 2 ? -value * weight : 0, // Penalize rain only if temp > 2°C
  },
  wind_speed_10m_max: {
    importance: 'nice',
    scorer: ({ value, weight }: FactorScorerArgs) => -value * weight, // Lower is better
  },
  wind_direction_10m_dominant: { importance: 'neutral' },
  uv_index_max: { importance: 'neutral' },
  snowfall_sum: {
    importance: 'critical',
    scorer: ({ value, weight }: FactorScorerArgs) => value * weight, // Higher is better
  },
  snow_depth_max: {
    importance: 'important',
    scorer: ({ value, weight }: FactorScorerArgs) => value * weight, // Higher is better
  },
};

export function scoreSkiing(
  weather: WeatherForecastDaily,
  day: number
): number {
  return scoreByConfig(skiingFactorConfig, weather, day);
}
