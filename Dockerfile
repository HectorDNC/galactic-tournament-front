# ---- Build Stage ----
FROM node:22-alpine AS builder

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Build argument for API URL (override at build time with --build-arg)
ARG API_URL=http://localhost:8080

# Copy manifest files first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install

COPY . .

# Inject API_URL into Angular environment file before build
RUN sed -i "s|api_url: '.*'|api_url: '${API_URL}'|g" src/app/environments/environment.ts

RUN pnpm run build

# ---- Serve Stage ----
FROM nginx:1.27-alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app (outputPath: dist/ng-tailadmin/browser)
COPY --from=builder /app/dist/ng-tailadmin/browser /usr/share/nginx/html

# Set permissions and ownership
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
