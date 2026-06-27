# Multi-Stage Dockerfile (React + Nginx)

```dockerfile
###############################
# Stage 1 - Build the React App
###############################

# Use Node.js only for building the application.
FROM node:20-alpine AS builder

# Create working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Generate optimized production build
RUN npm run build



##################################
# Stage 2 - Production Image
##################################

# Lightweight nginx image
FROM nginx:1.25-alpine

# Copy ONLY the production build
# The source code and node_modules are NOT copied.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

---

## Why Multi-stage?

### Builder Stage

Contains:

* Node.js
* npm
* node_modules
* Source code
* Build tools

These are needed only while building.

---

### Runtime Stage

Contains only:

```
dist/
```

served by nginx.

No source code.

No npm.

No node_modules.

Result:

* Smaller image
* Faster deployment
* Better security

---

## Build

```
docker build -t react-app .
```

Run

```
docker run -p 3000:80 react-app
```

Open

```
http://localhost:3000
```

---

## Benefits

✔ Smaller image

✔ Faster deployment

✔ More secure

✔ Industry standard
