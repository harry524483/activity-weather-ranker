import { describe, it, expect, beforeAll } from 'vitest';
import { scoreSurfing } from './surfing-score-rules.js';
import type { WeatherForecastDaily } from '@activity-weather-ranker/shared';

const baseWeather: WeatherForecastDaily = {
  time: ['2024-06-01'], // neutral
  temperature_2m_max: [25], // optimal max temp for surfing (warm, in optimal range)
  temperature_2m_min: [18], // optimal min temp for surfing (warm nights)
  precipitation_sum: [0], // no rain (optimal)
  wind_speed_10m_max: [10], // optimal wind for surfing (enough for waves, not too strong)
  wind_direction_10m_dominant: [0], // neutral
  uv_index_max: [5], // optimal UV index (moderate)
  snowfall_sum: [0], // no snow (optimal)
  snow_depth_max: [0], // no snow (optimal)
};

describe('scoreSurfing', () => {
  let optimalScore: number;

  beforeAll(() => {
    optimalScore = scoreSurfing(baseWeather, 0);
  });

  it('score decreases if temperature_2m_max is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [10],
    };
    // Act
    const score = scoreSurfing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if temperature_2m_min is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_min: [10],
    };
    // Act
    const score = scoreSurfing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if precipitation_sum is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      precipitation_sum: [20],
    };
    // Act
    const score = scoreSurfing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if wind_speed_10m_max is non-optimal (below optimal)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [2],
    };
    // Act
    const score = scoreSurfing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if wind_speed_10m_max is non-optimal (above optimal)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [20],
    };
    // Act
    const score = scoreSurfing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if uv_index_max is below optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = { ...baseWeather, uv_index_max: [1] };
    // Act
    const score = scoreSurfing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if uv_index_max is above optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      uv_index_max: [10],
    };
    // Act
    const score = scoreSurfing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if snowfall_sum is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = { ...baseWeather, snowfall_sum: [5] };
    // Act
    const score = scoreSurfing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if snow_depth_max is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      snow_depth_max: [10],
    };
    // Act
    const score = scoreSurfing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });
});
