import { describe, it, expect, beforeAll } from 'vitest';
import { scoreOutdoorSightseeing } from './outdoor-sightseeing-score.rules.js';
import type { WeatherForecastDaily } from '@activity-weather-ranker/shared';

const baseWeather: WeatherForecastDaily = {
  time: ['2024-06-01'], // neutral
  temperature_2m_max: [20], // optimal max temp for sightseeing
  temperature_2m_min: [15], // optimal min temp for sightseeing
  precipitation_sum: [0], // no rain (optimal)
  wind_speed_10m_max: [10], // mild wind (optimal)
  wind_direction_10m_dominant: [0], // neutral
  uv_index_max: [4], // optimal UV index (moderate)
  snowfall_sum: [0], // no snow (optimal)
  snow_depth_max: [0], // no snow (optimal)
};

describe('scoreOutdoorSightseeing', () => {
  let optimalScore: number;

  beforeAll(() => {
    optimalScore = scoreOutdoorSightseeing(baseWeather, 0);
  });

  it('score decreases if temperature_2m_max is non-optimal (too low)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [5],
    };
    // Act
    const score = scoreOutdoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if temperature_2m_max is non-optimal (too high)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [30],
    };
    // Act
    const score = scoreOutdoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score gives bonus for optimal temperature_2m_min', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_min: [12],
    };
    // Act
    const score = scoreOutdoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeGreaterThanOrEqual(optimalScore);
  });

  it('score decreases if temperature_2m_min is below optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_min: [5],
    };
    // Act
    const score = scoreOutdoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if temperature_2m_min is above optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_min: [20],
    };
    // Act
    const score = scoreOutdoorSightseeing(weather, 0);
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
    const score = scoreOutdoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score gives bonus for optimal wind_speed_10m_max', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [5],
    };
    // Act
    const score = scoreOutdoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeGreaterThanOrEqual(optimalScore);
  });

  it('score decreases if wind_speed_10m_max is too high', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [30],
    };
    // Act
    const score = scoreOutdoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if uv_index_max is below optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = { ...baseWeather, uv_index_max: [0] };
    // Act
    const score = scoreOutdoorSightseeing(weather, 0);
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
    const score = scoreOutdoorSightseeing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if snowfall_sum is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = { ...baseWeather, snowfall_sum: [5] };
    // Act
    const score = scoreOutdoorSightseeing(weather, 0);
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
    const score = scoreOutdoorSightseeing(weather, 0);
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
    const score = scoreOutdoorSightseeing(weather, 0);
    // Assert
    expect(score).toBe(optimalScore);
  });
});
