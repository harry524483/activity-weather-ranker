import axios from 'axios';
import { WeatherForecast } from '@activity-weather-ranker/shared';
import { ApiConfig } from '../types';

export class WeatherService {
  private baseUrl: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl;
  }

  async getWeatherByCoordinates(
    latitude: number,
    longitude: number
  ): Promise<WeatherForecast | null> {
    const params = [
      `latitude=${latitude}`,
      `longitude=${longitude}`,
      'daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max,snowfall_sum,snow_depth_max',
      'timezone=auto',
    ];
    const url = `${this.baseUrl}/forecast?${params.join('&')}`;
    const response = await axios.get(url);

    const data = response.data;
    if (!data.daily) return null;

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      daily: data.daily,
    };
  }
}
