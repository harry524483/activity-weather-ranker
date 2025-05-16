import {
  importanceWeights,
  WeatherForecastDaily,
  FactorConfig,
  FactorScorerArgs,
} from '@activity-weather-ranker/shared';

const optimalTempRange = [20, 30];
const optimalWindSpeedRange = [5, 15];
const optimalUVIndexRange = [3, 8];

const surfingFactorConfig: Record<keyof WeatherForecastDaily, FactorConfig> = {
  time: { importance: 'neutral' },
  temperature_2m_max: {
    importance: 'important',
    scorer: ({ value, weight }: FactorScorerArgs) => {
      const [minTemp, maxTemp] = optimalTempRange;
      if (value < minTemp) return -(minTemp - value) * weight;
      if (value > maxTemp) return -(value - maxTemp) * weight;
      return weight * 2; // Bonus for optimal range
    },
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
    scorer: ({ value, weight }: FactorScorerArgs) => {
      const [minWind, maxWind] = optimalWindSpeedRange;
      if (value < minWind) return -(minWind - value) * weight;
      if (value > maxWind) return -(value - maxWind) * weight;
      return weight * 2; // Bonus for optimal wind
    },
  },
  wind_direction_10m_dominant: { importance: 'neutral' },
  uv_index_max: {
    importance: 'nice',
    scorer: ({ value, weight }: FactorScorerArgs) => {
      const [minUV, maxUV] = optimalUVIndexRange;
      if (value < minUV) return -(minUV - value) * weight;
      if (value > maxUV) return -(value - maxUV) * weight;
      return weight * 2; // Bonus for optimal UV
    },
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
  return Object.entries(surfingFactorConfig).reduce(
    (score, [factor, config]) => {
      if (config.importance === 'neutral' || !config.scorer) {
        return score;
      }

      const value = weather[factor as keyof WeatherForecastDaily][day];
      if (typeof value !== 'number') {
        return score;
      }

      const weight = importanceWeights[config.importance];
      return score + config.scorer({ value, weather, day, weight });
    },
    0
  );
}
