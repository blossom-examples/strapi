# Strapi on Blossom

A small Strapi CMS project with an Article collection, managed PostgreSQL,
and private S3-compatible media storage. Run it on regular Blossom App Capacity.

## Deploy

Ask your agent:

> Deploy this Strapi project on Blossom with managed PostgreSQL and R2 uploads.

Build with the included production Dockerfile. Link a managed PostgreSQL
database as `DATABASE_URL`; keep the application secrets stable between builds
and deployments. Supply the variables listed in `.env.example` privately.
Generate fresh keys and salts for your deployment. Never commit credentials.

Use an HTTP readiness check at `/_health` on port 1337. Set `PUBLIC_URL` to the
final HTTPS address and keep initial setup behind Blossom Account access.
Create the owner in `/admin`, publish an Article, and create a restricted API
token. Public Content API permissions remain disabled unless you enable them.

## Media

Install/configure Strapi's official AWS S3 upload provider, already included
here. Create your own private bucket and bucket-restricted credential. The
example supports Cloudflare R2 with path-style requests and signed media
previews in the Content Manager.

Private media URLs in the Content API are not automatically signed. Your
frontend needs authorized file delivery or its own signing service. For public
website images, use a separate bucket and explicitly configure public delivery.
Do not expose private documents by changing the bucket's access policy.

## Change the content model

The Article schema lives in `src/api/article/content-types/article/schema.json`.
Edit models in source or use Strapi's development Content-Type Builder, then
commit and rebuild. Production Containers do not need a local source-code
Volume. Content records live in PostgreSQL and media bytes live in the bucket.

## Local development

    npm ci
    cp .env.example .env
    # Fill private settings for a disposable PostgreSQL database and bucket.
    npm run develop

## References

- [Strapi](https://strapi.io/)
- [Source](https://github.com/strapi/strapi)
- [Production Docker builds](https://docs.strapi.io/cms/installation/docker)
- [Media providers](https://docs.strapi.io/cms/configurations/media-library-providers)

This example uses Strapi's community features. Review upstream licenses and
edition requirements before adding paid features or offering a hosted product.
