import {
  importanceWeights,
  WeatherForecastDaily,
  FactorConfig,
  FactorScorerArgs,
} from '@activity-weather-ranker/shared';

const comfortableTempRange = [10, 28]; // Indoors is fine in a wide range

const indoorSightseeingFactorConfig: Record<
  keyof WeatherForecastDaily,
  FactorConfig
> = {
  time: { importance: 'neutral' },
  temperature_2m_max: {
    importance: 'nice',
    scorer: ({ value, weight }: FactorScorerArgs) => {
      const [minTemp, maxTemp] = comfortableTempRange;
      if (value < minTemp) return -(minTemp - value) * weight;
      if (value > maxTemp) return -(value - maxTemp) * weight;
      return weight; // Small bonus for being comfortable
    },
  },
  temperature_2m_min: { importance: 'neutral' },
  precipitation_sum: { importance: 'neutral' },
  wind_speed_10m_max: { importance: 'neutral' },
  wind_direction_10m_dominant: { importance: 'neutral' },
  uv_index_max: { importance: 'neutral' },
  snowfall_sum: { importance: 'neutral' },
  snow_depth_max: { importance: 'neutral' },
};

export function scoreIndoorSightseeing(
  weather: WeatherForecastDaily,
  day: number
): number {
  return Object.entries(indoorSightseeingFactorConfig).reduce(
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
