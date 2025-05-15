import type { Resolvers } from '~api/common';
import type { ApolloContext } from '~api';

export const resolvers: Resolvers<ApolloContext> = {
  Query: {
    searchGeocoding: async (_parent, args, context) => {
      return context.geocodingService.searchGeocoding(args.location);
    },
    getWeatherByCoordinates: async (_parent, args, context) => {
      return context.weatherService.getWeatherByCoordinates(
        args.latitude,
        args.longitude
      );
    },
  },
};
