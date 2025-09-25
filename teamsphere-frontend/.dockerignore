# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Use caching for deps
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
# Create a production build
RUN npm run build

# ---------- Runtime (Nginx) ----------
FROM nginx:1.27-alpine

# Copy custom nginx config (SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
