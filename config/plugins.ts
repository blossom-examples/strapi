import type { Core } from '@strapi/strapi';

export default ({ env }: Core.Config.Shared.ConfigParams) => ({
  'users-permissions': {
    config: { jwtSecret: env('JWT_SECRET'), jwtManagement: 'refresh' },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('S3_ACCESS_KEY_ID'),
            secretAccessKey: env('S3_SECRET_ACCESS_KEY'),
          },
          region: env('S3_REGION', 'auto'),
          endpoint: env('S3_ENDPOINT'),
          forcePathStyle: true,
          params: {
            Bucket: env('S3_BUCKET'),
            ACL: 'private',
            signedUrlExpires: 900,
          },
        },
      },
      actionOptions: { upload: {}, uploadStream: {}, delete: {} },
    },
  },
});
