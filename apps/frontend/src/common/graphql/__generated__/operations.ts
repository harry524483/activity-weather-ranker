import * as types from "@activity-weather-ranker/shared"
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchGeocodingQueryVariables = types.Exact<{
  location: types.Scalars['String']['input'];
}>;


export type SearchGeocodingQuery = { __typename?: 'Query', searchGeocoding: Array<{ __typename?: 'GeocodingResult', id: number, name: string, latitude: number, longitude: number, country: string }> };

export type RankActivitiesQueryVariables = types.Exact<{
  latitude: types.Scalars['Float']['input'];
  longitude: types.Scalars['Float']['input'];
}>;


export type RankActivitiesQuery = { __typename?: 'Query', rankActivities: Array<{ __typename?: 'ActivityRanking', date: string, activity: string, score: number, reason: string }> };


export const SearchGeocodingDocument = gql`
    query SearchGeocoding($location: String!) {
  searchGeocoding(location: $location) {
    id
    name
    latitude
    longitude
    country
  }
}
    `;

/**
 * __useSearchGeocodingQuery__
 *
 * To run a query within a React component, call `useSearchGeocodingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchGeocodingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchGeocodingQuery({
 *   variables: {
 *      location: // value for 'location'
 *   },
 * });
 */
export function useSearchGeocodingQuery(baseOptions: Apollo.QueryHookOptions<SearchGeocodingQuery, SearchGeocodingQueryVariables> & ({ variables: SearchGeocodingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchGeocodingQuery, SearchGeocodingQueryVariables>(SearchGeocodingDocument, options);
      }
export function useSearchGeocodingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchGeocodingQuery, SearchGeocodingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchGeocodingQuery, SearchGeocodingQueryVariables>(SearchGeocodingDocument, options);
        }
export function useSearchGeocodingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchGeocodingQuery, SearchGeocodingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchGeocodingQuery, SearchGeocodingQueryVariables>(SearchGeocodingDocument, options);
        }
export type SearchGeocodingQueryHookResult = ReturnType<typeof useSearchGeocodingQuery>;
export type SearchGeocodingLazyQueryHookResult = ReturnType<typeof useSearchGeocodingLazyQuery>;
export type SearchGeocodingSuspenseQueryHookResult = ReturnType<typeof useSearchGeocodingSuspenseQuery>;
export type SearchGeocodingQueryResult = Apollo.QueryResult<SearchGeocodingQuery, SearchGeocodingQueryVariables>;
export const RankActivitiesDocument = gql`
    query RankActivities($latitude: Float!, $longitude: Float!) {
  rankActivities(latitude: $latitude, longitude: $longitude) {
    date
    activity
    score
    reason
  }
}
    `;

/**
 * __useRankActivitiesQuery__
 *
 * To run a query within a React component, call `useRankActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRankActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRankActivitiesQuery({
 *   variables: {
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useRankActivitiesQuery(baseOptions: Apollo.QueryHookOptions<RankActivitiesQuery, RankActivitiesQueryVariables> & ({ variables: RankActivitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RankActivitiesQuery, RankActivitiesQueryVariables>(RankActivitiesDocument, options);
      }
export function useRankActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RankActivitiesQuery, RankActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RankActivitiesQuery, RankActivitiesQueryVariables>(RankActivitiesDocument, options);
        }
export function useRankActivitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RankActivitiesQuery, RankActivitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RankActivitiesQuery, RankActivitiesQueryVariables>(RankActivitiesDocument, options);
        }
export type RankActivitiesQueryHookResult = ReturnType<typeof useRankActivitiesQuery>;
export type RankActivitiesLazyQueryHookResult = ReturnType<typeof useRankActivitiesLazyQuery>;
export type RankActivitiesSuspenseQueryHookResult = ReturnType<typeof useRankActivitiesSuspenseQuery>;
export type RankActivitiesQueryResult = Apollo.QueryResult<RankActivitiesQuery, RankActivitiesQueryVariables>;