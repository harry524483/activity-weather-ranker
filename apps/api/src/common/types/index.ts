import {
  GeocodingService,
  NoDailyWeatherDataError,
  NoGeocodingResultsError,
  WeatherService,
} from '~api/activity-ranking';

export type CustomApiError = NoDailyWeatherDataError | NoGeocodingResultsError;

export type ApolloContext = {
  geocodingService: GeocodingService;
  weatherService: WeatherService;
};

export type ApiConfig = {
  baseUrl: string;
};
