import {
  importanceWeights,
  WeatherForecastDaily,
  FactorConfig,
  FactorScorerArgs,
} from '@activity-weather-ranker/shared';

const optimalTempRange = [-5, 2];

const skiingFactorConfig: Record<keyof WeatherForecastDaily, FactorConfig> = {
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
  return Object.entries(skiingFactorConfig).reduce(
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
