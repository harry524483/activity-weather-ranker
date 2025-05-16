import type { Resolvers, ApolloContext } from '~api/common';

export const resolvers: Resolvers<ApolloContext> = {
  Query: {
    searchGeocoding: async (_parent, args, context) => {
      return context.geocodingService.searchGeocoding(args.location);
    },
    rankActivities: async (_parent, args, context) => {
      return context.activityRankingService.rankActivities(
        args.latitude,
        args.longitude
      );
    },
  },
};
