import { describe, it, expect } from 'vitest';
import { scoreSkiing } from './skiing-score.rules.js';
import type { WeatherForecastDaily } from '@activity-weather-ranker/shared';

const baseWeather: WeatherForecastDaily = {
  time: ['2024-06-01'], // neutral
  temperature_2m_max: [-5], // optimal max temp for skiing
  temperature_2m_min: [-5], // lowest reasonable min temp (lower is better)
  precipitation_sum: [0], // no rain (optimal)
  wind_speed_10m_max: [0], // no wind (optimal)
  wind_direction_10m_dominant: [0], // neutral
  uv_index_max: [0], // neutral
  snowfall_sum: [30], // high snowfall (optimal)
  snow_depth_max: [50], // high snow depth (optimal)
};

describe('scoreSkiing', () => {
  let optimalScore: number;

  beforeAll(() => {
    optimalScore = scoreSkiing(baseWeather, 0);
  });

  it('score decreases if temperature_2m_max is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [10],
    };
    // Act
    const score = scoreSkiing(weather, 0);
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
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if wind_speed_10m_max is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [10],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if snowfall_sum is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = { ...baseWeather, snowfall_sum: [0] };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('score decreases if snow_depth_max is non-optimal', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      snow_depth_max: [0],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('gives bonus for optimal max temperature (-5 to 2°C)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [-5],
      temperature_2m_min: [-10],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(143);
  });

  it('penalizes temperature_2m_max below -5°C', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [-10],
      temperature_2m_min: [-15], // min < max
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('penalizes temperature_2m_max above 2°C', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [5],
      temperature_2m_min: [0], // min < max
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('penalizes higher temperature_2m_min (lower is better)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [10], // max > min
      temperature_2m_min: [5],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBeLessThan(optimalScore);
  });

  it('rewards higher snowfall_sum (critical)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      snowfall_sum: [35],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(150.5);
  });

  it('rewards higher snow_depth_max (important)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      snow_depth_max: [55],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(148);
  });

  it('does not penalize precipitation if temperature_2m_max <= 2°C', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      precipitation_sum: [100],
      temperature_2m_max: [0],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(optimalScore);
  });

  it('penalizes precipitation if temperature_2m_max > 2°C', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      precipitation_sum: [100],
      temperature_2m_max: [3],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(-14);
  });

  it('ignores neutral factors (time, wind_direction_10m_dominant, uv_index_max)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      time: ['2024-06-01'],
      wind_direction_10m_dominant: [123],
      uv_index_max: [11],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(optimalScore);
  });
});
