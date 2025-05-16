import {
  ActivityRankingService,
  GeocodingService,
  NoDailyWeatherDataError,
  NoGeocodingResultsError,
} from '~api/activity-ranking';

export type CustomApiError = NoDailyWeatherDataError | NoGeocodingResultsError;

export type ApolloContext = {
  geocodingService: GeocodingService;
  activityRankingService: ActivityRankingService;
};

export type ApiConfig = {
  baseUrl: string;
};
