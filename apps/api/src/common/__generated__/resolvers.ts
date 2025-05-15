import * as types from "@activity-weather-ranker/shared"
import { GraphQLResolveInfo } from 'graphql';
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => types.Maybe<TTypes> | Promise<types.Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<types.Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<types.Scalars['Float']['output']>;
  GeocodingResult: ResolverTypeWrapper<types.GeocodingResult>;
  Int: ResolverTypeWrapper<types.Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<types.Scalars['String']['output']>;
  WeatherForecast: ResolverTypeWrapper<types.WeatherForecast>;
  WeatherForecastDaily: ResolverTypeWrapper<types.WeatherForecastDaily>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: types.Scalars['Boolean']['output'];
  Float: types.Scalars['Float']['output'];
  GeocodingResult: types.GeocodingResult;
  Int: types.Scalars['Int']['output'];
  Query: {};
  String: types.Scalars['String']['output'];
  WeatherForecast: types.WeatherForecast;
  WeatherForecastDaily: types.WeatherForecastDaily;
}>;

export type GeocodingResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeocodingResult'] = ResolversParentTypes['GeocodingResult']> = ResolversObject<{
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getWeatherByCoordinates?: Resolver<types.Maybe<ResolversTypes['WeatherForecast']>, ParentType, ContextType, RequireFields<types.QueryGetWeatherByCoordinatesArgs, 'latitude' | 'longitude'>>;
  searchGeocoding?: Resolver<Array<ResolversTypes['GeocodingResult']>, ParentType, ContextType, RequireFields<types.QuerySearchGeocodingArgs, 'location'>>;
}>;

export type WeatherForecastResolvers<ContextType = any, ParentType extends ResolversParentTypes['WeatherForecast'] = ResolversParentTypes['WeatherForecast']> = ResolversObject<{
  daily?: Resolver<ResolversTypes['WeatherForecastDaily'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WeatherForecastDailyResolvers<ContextType = any, ParentType extends ResolversParentTypes['WeatherForecastDaily'] = ResolversParentTypes['WeatherForecastDaily']> = ResolversObject<{
  precipitation_sum?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  snow_depth_max?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  snowfall_sum?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  temperature_2m_max?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  temperature_2m_min?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  time?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  uv_index_max?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  wind_direction_10m_dominant?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  wind_speed_10m_max?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  GeocodingResult?: GeocodingResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  WeatherForecast?: WeatherForecastResolvers<ContextType>;
  WeatherForecastDaily?: WeatherForecastDailyResolvers<ContextType>;
}>;

