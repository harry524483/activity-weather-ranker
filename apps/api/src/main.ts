import { ApolloServer } from '@apollo/server';
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

export type ApolloContext = {
  geocodingService: GeocodingService;
  weatherService: WeatherService;
};

const app = express();

const typeDefs = mergeTypeDefs(
  loadFilesSync(`libs/shared/src/models/**/*.graphql`)
);

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers: [activityRankingResolvers],
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
