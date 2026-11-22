FROM node:24-bookworm-slim@sha256:dc26ae92c9fb15cf6b1d63e20f0944b2efe0f115b20e00be48fb23fceb061c54 AS build
WORKDIR /opt/app
ENV STRAPI_TELEMETRY_DISABLED=true
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build && npm prune --omit=dev --no-audit --no-fund

FROM node:24-bookworm-slim@sha256:dc26ae92c9fb15cf6b1d63e20f0944b2efe0f115b20e00be48fb23fceb061c54
WORKDIR /opt/app
ENV NODE_ENV=production STRAPI_TELEMETRY_DISABLED=true HOST=0.0.0.0 PORT=1337
COPY --from=build --chown=node:node /opt/app ./
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
