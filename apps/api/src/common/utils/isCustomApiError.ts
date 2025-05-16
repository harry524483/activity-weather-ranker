import {
  NoDailyWeatherDataError,
  NoGeocodingResultsError,
} from '~api/features/activity-ranking';
import type { CustomApiError } from '../types';

export function isCustomApiError(error: unknown): error is CustomApiError {
  return (
    error instanceof NoDailyWeatherDataError ||
    error instanceof NoGeocodingResultsError
  );
}
