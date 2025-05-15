import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'libs/models/src/schema.graphql',
    generates: {
        'apps/api/src/__generated__/resolvers.ts': {
            plugins: ['add', 'typescript-resolvers'],
            config: {
                useIndexSignature: true,
                content: 'import * as types from "@activity-weather-ranker/models"',
                namespacedImportName: 'types',
            },
        },
    },
};
export default config;