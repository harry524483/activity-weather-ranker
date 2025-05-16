import { describe, it, expect, beforeAll } from 'vitest';
import { scoreIndoorSightseeing } from './indoor-sightseeing-score.rules.js';
import type { WeatherForecastDaily } from '@activity-weather-ranker/shared';

const baseWeather: WeatherForecastDaily = {
  time: ['2024-06-01'], // neutral
  temperature_2m_max: [20], // comfortable
  temperature_2m_min: [15], // neutral
  precipitation_sum: [0], // no rain
  wind_speed_10m_max: [10], // neutral
  wind_direction_10m_dominant: [0], // neutral
  uv_index_max: [4], // neutral
  snowfall_sum: [0], // neutral
  snow_depth_max: [0], // neutral
};

describe('scoreIndoorSightseeing', () => {
  let optimalScore: number;

  beforeAll(() => {
    optimalScore = scoreIndoorSightseeing(baseWeather, 0);
  });

  it('score gives bonus for comfortable temperature_2m_max', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [22],
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeGreaterThanOrEqual(optimalScore);
  });

  it('score decreases if temperature_2m_max is too low', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [0],
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if temperature_2m_max is too high', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [35],
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score is unaffected by neutral temperature_2m_min', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_min: [5],
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBe(optimalScore);
  });

  it('score is unaffected by neutral wind_speed_10m_max', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [30],
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score is unaffected by neutral uv_index_max', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      uv_index_max: [10],
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBe(optimalScore);
  });

  it('score is unaffected by neutral snowfall_sum', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      snowfall_sum: [10],
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBe(optimalScore);
  });

  it('score is unaffected by neutral snow_depth_max', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      snow_depth_max: [10],
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBe(optimalScore);
  });

  it('score gives bonus for comfortable precipitation_sum (within range)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      precipitation_sum: [5], // within [0, 10]
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeGreaterThanOrEqual(optimalScore);
  });

  it('score decreases if precipitation_sum is above comfortable range', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      precipitation_sum: [25], // above 10
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if precipitation_sum is below comfortable range (should not happen, but test)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      precipitation_sum: [-5], // below 0
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score gives bonus for comfortable wind_speed_10m_max (within range)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [15], // within [0, 20]
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeGreaterThanOrEqual(optimalScore);
  });

  it('score decreases if wind_speed_10m_max is above comfortable range', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [30], // above 20
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if wind_speed_10m_max is below comfortable range (should not happen, but test)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [-5], // below 0
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('ignores neutral factors (time, wind_direction_10m_dominant)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      time: ['2024-06-01'],
      wind_direction_10m_dominant: [123],
    };
    // Act
    const score = scoreIndoorSightseeing(weather, 0);
    // Assert
    expect(score).toBe(optimalScore);
  });
});
