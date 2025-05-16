import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import config from 'config';
import {
  GeocodingService,
  WeatherService,
  resolvers as activityRankingResolvers,
} from '~api/activity-ranking';
import { isCustomApiError } from '~api/common';
import type { ApolloContext } from '~api/common';

const app = express();

const typeDefs = mergeTypeDefs(
  loadFilesSync(`libs/shared/src/models/**/*.graphql`)
);

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers: [activityRankingResolvers],
  formatError: (formattedError, error) => {
    const code =
      error instanceof GraphQLError && isCustomApiError(error.originalError)
        ? error.originalError.code
        : 'INTERNAL_SERVER_ERROR';

    return {
      ...formattedError,
      extensions: {
        ...formattedError.extensions,
        code,
      },
    };
  },
});

await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async () => ({
      geocodingService: new GeocodingService(config.get('api.geocodingApi')),
      weatherService: new WeatherService(config.get('api.weatherApi')),
    }),
  })
);

const PORT = config.get<number>('api.port');

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
