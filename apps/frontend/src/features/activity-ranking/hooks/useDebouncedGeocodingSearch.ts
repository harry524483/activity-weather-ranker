import { useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useSearchGeocodingLazyQuery } from '~frontend/common';

export function useDebouncedGeocodingSearch(debounceMs = 1000) {
  const [fetchGeocoding, { loading }] = useSearchGeocodingLazyQuery();

  const fetchLocations = useCallback(
    async (inputValue: string) => {
      const result = await fetchGeocoding({
        variables: { location: inputValue },
      });
      return (
        result.data?.searchGeocoding?.map((item: any) => ({
          value: { latitude: item.latitude, longitude: item.longitude },
          label: `${item.name} - ${item.country}`,
        })) || []
      );
    },
    [fetchGeocoding]
  );

  const debouncedFetchLocations = useMemo(
    () =>
      debounce((inputValue: string, callback: (options: any[]) => void) => {
        fetchLocations(inputValue).then((locations) => {
          callback(locations || []);
        });
      }, debounceMs),
    [fetchLocations, debounceMs]
  );

  return { debouncedFetchLocations, loading };
}
