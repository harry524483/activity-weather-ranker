import {
  importanceWeights,
  WeatherForecastDaily,
  FactorConfig,
  FactorScorerArgs,
} from '@activity-weather-ranker/shared';

export function scoreByConfig(
  config: Record<keyof WeatherForecastDaily, FactorConfig>,
  weather: WeatherForecastDaily,
  day: number
): number {
  return Object.entries(config).reduce((score, [factor, factorConfig]) => {
    if (factorConfig.importance === 'neutral' || !factorConfig.scorer) {
      return score;
    }

    const value = weather[factor as keyof WeatherForecastDaily][day];
    if (typeof value !== 'number') {
      return score;
    }

    const weight = importanceWeights[factorConfig.importance];
    return score + factorConfig.scorer({ value, weather, day, weight });
  }, 0);
}

export function optimalRangeScorer(
  [min, max]: Array<number>,
  bonus: number = 1
) {
  return ({ value, weight }: FactorScorerArgs) => {
    if (value < min) return -(min - value) * weight;
    if (value > max) return -(value - max) * weight;
    return weight * bonus;
  };
}
