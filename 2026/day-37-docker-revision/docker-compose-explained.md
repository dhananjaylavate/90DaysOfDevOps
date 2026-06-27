# Docker Compose Explained

Project structure

```
project/
│
├── frontend/
│   └── Dockerfile
│
├── backend/
│   └── Dockerfile
│
└── docker-compose.yml
```

---

## docker-compose.yml

```yaml
# Compose file version
version: "3.9"

services:

  # Backend Service
  backend:

    # Build using backend/Dockerfile
    build: ./backend

    # Container name
    container_name: backend

    # Map host port 5000 -> container port 5000
    ports:
      - "5000:5000"

    # Automatically restart if container crashes
    restart: unless-stopped

    # Environment variables
    environment:
      NODE_ENV: production

    # Connect to custom bridge network
    networks:
      - app-network


  # Frontend Service
  frontend:

    build: ./frontend

    container_name: frontend

    ports:
      - "3000:80"

    # Start frontend after backend starts.
    # Note: depends_on controls startup order only.
    depends_on:
      - backend

    networks:
      - app-network


# Custom network
networks:

  app-network:

    driver: bridge
```

---

## Important Sections

### services

Defines every container in the application.

Example:

```
frontend
backend
database
redis
```

---

### build

Tells Compose where the Dockerfile is.

```
build: ./frontend
```

means

```
frontend/Dockerfile
```

---

### ports

```
HOST:CONTAINER
```

Example

```
3000:80
```

Host browser

↓

Container nginx

---

### depends_on

Starts backend before frontend.

It **does not** wait until the backend is healthy.

For readiness checks, use a `healthcheck` and make dependent services wait for it if your Compose setup supports that behavior.

---

### networks

Containers on the same network communicate using service names.

Frontend can call:

```
http://backend:5000
```

No IP address needed.

---

### environment

Environment variables passed into the container.

Example

```
NODE_ENV=production
```

---

## Useful Commands

Build

```
docker compose build
```

Start

```
docker compose up
```

Detached mode

```
docker compose up -d
```

View running services

```
docker compose ps
```

View logs

```
docker compose logs
```

Stop

```
docker compose down
```

Remove volumes too

```
docker compose down -v
```

Rebuild

```
docker compose up --build
```

---

## Why Docker Compose?

Without Compose

```
docker run ...
docker run ...
docker network create ...
docker volume create ...
```

Many manual commands.

With Compose

```
docker compose up
```

Everything starts together with one command.

This is why Docker Compose is commonly used for local development and small multi-container deployments.
