import {
  WeatherForecastDaily,
  FactorConfig,
  FactorScorerArgs,
} from '@activity-weather-ranker/shared';
import { scoreByConfig, optimalRangeScorer } from './activity-scoring.utils';

const optimalTempRange = [15, 25];
const optimalTempMinRange = [10, 18];
const optimalUVIndexRange = [2, 6];
const optimalWindSpeedRange = [0, 15];

const outdoorSightseeingFactorConfig: Record<
  keyof WeatherForecastDaily,
  FactorConfig
> = {
  time: { importance: 'neutral' },
  temperature_2m_max: {
    importance: 'important',
    scorer: optimalRangeScorer(optimalTempRange, 2),
  },
  temperature_2m_min: {
    importance: 'nice',
    scorer: optimalRangeScorer(optimalTempMinRange, 2),
  },
  precipitation_sum: {
    importance: 'critical',
    scorer: ({ value, weight }: FactorScorerArgs) => -value * weight, // Less rain is much better
  },
  wind_speed_10m_max: {
    importance: 'important',
    scorer: optimalRangeScorer(optimalWindSpeedRange, 2),
  },
  wind_direction_10m_dominant: { importance: 'neutral' },
  uv_index_max: {
    importance: 'nice',
    scorer: optimalRangeScorer(optimalUVIndexRange, 2),
  },
  snowfall_sum: {
    importance: 'important',
    scorer: ({ value, weight }: FactorScorerArgs) => -value * weight, // No snow wanted
  },
  snow_depth_max: {
    importance: 'nice',
    scorer: ({ value, weight }: FactorScorerArgs) => -value * weight, // No snow wanted
  },
};

export function scoreOutdoorSightseeing(
  weather: WeatherForecastDaily,
  day: number
): number {
  return scoreByConfig(outdoorSightseeingFactorConfig, weather, day);
}
