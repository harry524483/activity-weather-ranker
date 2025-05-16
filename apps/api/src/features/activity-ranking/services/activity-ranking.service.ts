import {
  activityTypes,
  type ActivityRanking,
} from '@activity-weather-ranker/shared';
import { WeatherService } from './weather.service';
import { activityRules } from '../rules';
export class ActivityRankingService {
  private weatherService: WeatherService;
  private rules: typeof activityRules;

  constructor(weatherService: WeatherService, rules: typeof activityRules) {
    this.weatherService = weatherService;
    this.rules = rules;
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

    const rankings: ActivityRanking[] = [];

    for (let day = 0; day < days; day++) {
      for (const activity of activityTypes) {
        const score = this.rules[activity](daily, day);
        rankings.push({
          activity,
          date: daily.time[day],
          score: Math.round(score),
          reason: `Score for ${activity} on ${daily.time[day]} is ${Math.round(
            score
          )}`,
        });
      }
    }
    return rankings;
  }
}
