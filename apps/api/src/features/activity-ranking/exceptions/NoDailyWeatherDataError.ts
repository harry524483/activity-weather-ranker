export class NoDailyWeatherDataError extends Error {
  public readonly code = 'NO_DAILY_WEATHER_DATA';

  constructor(message = 'No daily weather data available') {
    super(message);
    this.name = 'NoDailyWeatherDataError';
  }
}
