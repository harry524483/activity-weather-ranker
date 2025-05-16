import { scoreSkiing } from './skiing-score-rules';
import { scoreSurfing } from './surfing-score-rules';
import { scoreOutdoorSightseeing } from './outdoor-sightseeing-score-rules';
import { scoreIndoorSightseeing } from './indoor-sightseeing-score-rules';
import type {
  Activity,
  WeatherForecastDaily,
} from '@activity-weather-ranker/shared';

export type ActivityRuleFn = (
  weather: WeatherForecastDaily,
  day: number
) => number;

export const activityRules: Record<Activity, ActivityRuleFn> = {
  skiing: scoreSkiing,
  surfing: scoreSurfing,
  outdoor_sightseeing: scoreOutdoorSightseeing,
  indoor_sightseeing: scoreIndoorSightseeing,
};
