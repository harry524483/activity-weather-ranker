import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'libs/models/src/**/*.graphql',
    generates: {
        'libs/models/src/schemas/__generated__/models.ts': {
            plugins: ['typescript'],
            config: {
                avoidOptionals: true,
            },
        },
    },
};
export default config;