import type { Core } from '@strapi/strapi';

export default ({ env }: Core.Config.Shared.ConfigParams) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', false),
    },
    pool: { min: 0, max: env.int('DATABASE_POOL_MAX', 10) },
    acquireConnectionTimeout: 60000,
  },
});
