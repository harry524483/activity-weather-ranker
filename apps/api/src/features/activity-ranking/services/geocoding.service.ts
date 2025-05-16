import axios from 'axios';
import { GeocodingResult } from '@activity-weather-ranker/shared';
import { ApiConfig } from '../types';
import { NoGeocodingResultsError } from '../exceptions/NoGeocodingResultsError';

export class GeocodingService {
  private baseUrl: string;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl;
  }

  async searchGeocoding(location: string): Promise<GeocodingResult[]> {
    const url = `${this.baseUrl}/search?name=${encodeURIComponent(location)}`;

    const response = await axios.get(url);
    const data = response.data;

    if (!data || !data.results) {
      throw new NoGeocodingResultsError('No geocoding results found');
    }

    return data.results.map((item: GeocodingResult) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      country: item.country,
    }));
  }
}
