import {
  WeatherForecastDaily,
  FactorConfig,
  FactorScorerArgs,
} from '@activity-weather-ranker/shared';
import { scoreByConfig, optimalRangeScorer } from './activity-scoring-utils';

const optimalTempRange = [20, 30];
const optimalWindSpeedRange = [5, 15];
const optimalUVIndexRange = [3, 8];

const surfingFactorConfig: Record<keyof WeatherForecastDaily, FactorConfig> = {
  time: { importance: 'neutral' },
  temperature_2m_max: {
    importance: 'important',
    scorer: optimalRangeScorer(optimalTempRange, 2),
  },
  temperature_2m_min: {
    importance: 'nice',
    scorer: ({ value, weight }: FactorScorerArgs) => (value > 15 ? weight : 0), // Bonus if warm nights
  },
  precipitation_sum: {
    importance: 'important',
    scorer: ({ value, weight }: FactorScorerArgs) => -value * weight, // Less rain is better
  },
  wind_speed_10m_max: {
    importance: 'critical',
    scorer: optimalRangeScorer(optimalWindSpeedRange, 2),
  },
  wind_direction_10m_dominant: { importance: 'neutral' },
  uv_index_max: {
    importance: 'nice',
    scorer: optimalRangeScorer(optimalUVIndexRange, 2),
  },
  snowfall_sum: {
    importance: 'critical',
    scorer: ({ value, weight }: FactorScorerArgs) => -value * weight, // No snow wanted
  },
  snow_depth_max: {
    importance: 'important',
    scorer: ({ value, weight }: FactorScorerArgs) => -value * weight, // No snow wanted
  },
};

export function scoreSurfing(
  weather: WeatherForecastDaily,
  day: number
): number {
  return scoreByConfig(surfingFactorConfig, weather, day);
}
