import { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import { useRankActivitiesLazyQuery } from '~frontend/common';
import Header from '../components/Header';
import ActivityRankingsList from '../components/ActivityRankingsList';
import { useDebouncedGeocodingSearch } from '../hooks/useDebouncedGeocodingSearch';
import { CallbackFn, LocationOption } from '../types';

const debounceMs = 1000;

export const ActivityRanking = () => {
  const { debouncedFetchLocations, loading: geocodingLoading } =
    useDebouncedGeocodingSearch(debounceMs);

  const [
    fetchRankActivities,
    { loading: rankActivitiesLoading, data: rankActivitiesData },
  ] = useRankActivitiesLazyQuery();

  const rankActivities = useCallback(
    async ({ latitude, longitude }: LocationOption['value']) => {
      const result = await fetchRankActivities({
        variables: { latitude, longitude },
      });
      return result.data?.rankActivities;
    },
    [fetchRankActivities]
  );

  const loadOptions = (inputValue: string, callback: CallbackFn) =>
    debouncedFetchLocations(inputValue, callback);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <Header />
      <div className="w-full max-w-xl mb-10">
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions={false}
          isLoading={geocodingLoading}
          placeholder="Search for a location..."
          onChange={(selectedOption) =>
            selectedOption?.value && rankActivities(selectedOption.value)
          }
        />
      </div>
      {rankActivitiesData?.rankActivities && (
        <ActivityRankingsList
          rankings={rankActivitiesData.rankActivities}
          loading={rankActivitiesLoading}
        />
      )}
    </div>
  );
};
