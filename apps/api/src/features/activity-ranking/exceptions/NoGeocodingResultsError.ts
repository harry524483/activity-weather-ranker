export class NoGeocodingResultsError extends Error {
  public readonly code = 'NO_GEOCODING_RESULTS';

  constructor(message = 'No geocoding results found') {
    super(message);
    this.name = 'NoGeocodingResultsError';
  }
}
