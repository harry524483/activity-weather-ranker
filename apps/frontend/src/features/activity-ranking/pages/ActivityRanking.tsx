import { useCallback } from 'react';
import { useRankActivitiesLazyQuery } from '~frontend/common';
import Header from '../components/Header';
import ActivityRankingsList from '../components/ActivityRankingsList';
import { useDebouncedGeocodingSearch } from '../hooks/useDebouncedGeocodingSearch';
import { CallbackFn, LocationOption } from '../types';
import Search from '../components/Search';

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

  const handleSearchChange = (selectedOption: LocationOption | null) => {
    if (selectedOption?.value) {
      rankActivities(selectedOption.value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <Header />
      <Search
        loadOptions={loadOptions}
        loading={geocodingLoading}
        onChange={handleSearchChange}
      />
      {rankActivitiesData?.rankActivities && (
        <ActivityRankingsList
          rankings={rankActivitiesData.rankActivities}
          loading={rankActivitiesLoading}
        />
      )}
    </div>
  );
};
