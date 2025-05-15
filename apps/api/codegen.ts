import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'libs/shared/src/models/*.graphql',
    generates: {
        'apps/api/src/__generated__/resolvers.ts': {
            plugins: ['add', 'typescript-resolvers'],
            config: {
                useIndexSignature: true,
                content: 'import * as types from "@activity-weather-ranker/shared"',
                namespacedImportName: 'types',
            },
        },
    },
};
export default config;