import axios from 'axios';
import { WeatherForecast } from '@activity-weather-ranker/shared';
import type { ApiConfig } from '~api/common';
import { NoDailyWeatherDataError } from '../exceptions/NoDailyWeatherDataError';

const dailyParams = [
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'wind_speed_10m_max',
  'wind_direction_10m_dominant',
  'uv_index_max',
  'snowfall_sum',
  'snow_depth_max',
];

export class WeatherService {
  private baseUrl: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl;
  }

  async getWeatherByCoordinates(
    latitude: number,
    longitude: number
  ): Promise<WeatherForecast> {
    const params = [
      `latitude=${latitude}`,
      `longitude=${longitude}`,
      `daily=${dailyParams.join(',')}`,
      'timezone=auto',
    ];
    const url = `${this.baseUrl}/forecast?${params.join('&')}`;
    const response = await axios.get(url);

    const data = response.data;
    if (!data || !data.daily) {
      throw new NoDailyWeatherDataError('No daily weather data available');
    }

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      daily: data.daily,
    };
  }
}
