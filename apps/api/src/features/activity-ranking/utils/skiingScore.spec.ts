import { describe, it, expect } from 'vitest';
import { scoreSkiing } from './skiingScore.js';
import type { WeatherForecastDaily } from '@activity-weather-ranker/shared';

const baseWeather: WeatherForecastDaily = {
  time: ['2024-06-01'],
  temperature_2m_max: [0],
  temperature_2m_min: [0],
  precipitation_sum: [0],
  wind_speed_10m_max: [0],
  wind_direction_10m_dominant: [0],
  uv_index_max: [0],
  snowfall_sum: [0],
  snow_depth_max: [0],
};

describe('scoreSkiing', () => {
  it('returns correct score if all factors are neutral or zero', () => {
    // Arrange
    const weather: WeatherForecastDaily = { ...baseWeather };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(3);
  });

  it('gives bonus for optimal max temperature (-5 to 2°C)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [-5],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(3);
  });

  it('penalizes temperature_2m_max below -5°C', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [-10],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(-7.5);
  });

  it('penalizes temperature_2m_max above 2°C', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [5],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(-4.5);
  });

  it('penalizes higher temperature_2m_min (lower is better)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_min: [10],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(-2);
  });

  it('penalizes higher wind_speed_10m_max (lower is better)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      wind_speed_10m_max: [20],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(-7);
  });

  it('rewards higher snowfall_sum (critical)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      snowfall_sum: [30],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(63);
  });

  it('rewards higher snow_depth_max (important)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      snow_depth_max: [50],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(78);
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
    expect(score).toBe(3);
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
    expect(score).toBe(-151.5);
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
    expect(score).toBe(3);
  });

  it('returns 0 if value is not a number (edge case)', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      // @ts-expect-error purposely break type for test
      temperature_2m_max: [undefined],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(0);
  });

  it('returns correct score for a group of non-zero properties', () => {
    // Arrange
    const weather: WeatherForecastDaily = {
      ...baseWeather,
      temperature_2m_max: [1],
      temperature_2m_min: [5],
      precipitation_sum: [10],
      wind_speed_10m_max: [8],
      snowfall_sum: [12],
      snow_depth_max: [7],
    };
    // Act
    const score = scoreSkiing(weather, 0);
    // Assert
    expect(score).toBe(31);
  });
});
