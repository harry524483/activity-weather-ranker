export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type GeocodingResult = {
  __typename?: 'GeocodingResult';
  country: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getWeatherByCoordinates: Maybe<WeatherForecast>;
  searchGeocoding: Array<GeocodingResult>;
};


export type QueryGetWeatherByCoordinatesArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


export type QuerySearchGeocodingArgs = {
  location: Scalars['String']['input'];
};

export type WeatherForecast = {
  __typename?: 'WeatherForecast';
  daily: WeatherForecastDaily;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type WeatherForecastDaily = {
  __typename?: 'WeatherForecastDaily';
  precipitation_sum: Array<Scalars['Float']['output']>;
  snow_depth_max: Array<Scalars['Float']['output']>;
  snowfall_sum: Array<Scalars['Float']['output']>;
  temperature_2m_max: Array<Scalars['Float']['output']>;
  temperature_2m_min: Array<Scalars['Float']['output']>;
  time: Array<Scalars['String']['output']>;
  uv_index_max: Array<Scalars['Float']['output']>;
  wind_direction_10m_dominant: Array<Scalars['Int']['output']>;
  wind_speed_10m_max: Array<Scalars['Float']['output']>;
};
