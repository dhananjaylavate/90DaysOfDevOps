# -------------------------
# Stage 1: Build React app
# -------------------------

# Use specific slim version (NOT latest)
FROM node:20-alpine AS builder

WORKDIR /app

# Combine commands to reduce layers
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# -------------------------
# Stage 2: Serve with Nginx
# -------------------------


# Final production image (even smaller)
FROM nginx:1.25-alpine

# Copy only build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Run as non-root user (best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]