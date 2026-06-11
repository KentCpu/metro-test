# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.32.1 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
ARG VITE_BASE_PATH=/
ARG VITE_ENABLE_MSW=false
ENV VITE_BASE_PATH=$VITE_BASE_PATH
ENV VITE_ENABLE_MSW=$VITE_ENABLE_MSW
COPY . .
RUN pnpm build

FROM scratch AS export
COPY --from=build /app/dist /

FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
