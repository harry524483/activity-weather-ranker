import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'libs/shared/src/models/*.graphql',
  generates: {
    'libs/shared/src/models/__generated__/models.ts': {
      plugins: ['typescript'],
      config: {
        avoidOptionals: true,
      },
    },
  },
};
export default config;
