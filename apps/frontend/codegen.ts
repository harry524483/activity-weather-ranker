import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'libs/shared/src/models/*.graphql',
  documents: ['apps/frontend/src/common/graphql/**/*.graphql'],
  generates: {
    'apps/frontend/src/common/graphql/__generated__/operations.ts': {
      plugins: ['add', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        useIndexSignature: true,
        content: 'import * as types from "@activity-weather-ranker/shared"',
        namespacedImportName: 'types',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
