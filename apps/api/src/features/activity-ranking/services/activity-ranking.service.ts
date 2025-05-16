import type {
  ActivityRanking,
  Activity,
} from '@activity-weather-ranker/shared';
import { WeatherService } from './weather.service';
export class ActivityRankingService {
  private weatherService: WeatherService;

  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  async rankActivities(
    latitude: number,
    longitude: number
  ): Promise<ActivityRanking[]> {
    const forecast = await this.weatherService.getWeatherByCoordinates(
      latitude,
      longitude
    );
    const { daily } = forecast;
    const days = daily.time.length;

    return [];
  }
}
