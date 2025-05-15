import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import config from 'config';

const app = express();

const typeDefs = mergeTypeDefs(
  loadFilesSync(`libs/shared/src/models/**/*.graphql`)
);

const server = new ApolloServer({
  typeDefs,
});

await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server)
);

const PORT = config.get<number>('api.port');

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
