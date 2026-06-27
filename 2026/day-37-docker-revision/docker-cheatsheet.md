# Docker Cheat Sheet

## Container Commands

| Command | Description |
|---------|-------------|
| `docker run IMAGE` | Run a container |
| `docker run -it IMAGE` | Run interactively |
| `docker run -d IMAGE` | Run in detached mode |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker stop CONTAINER_ID` | Stop a container |
| `docker start CONTAINER_ID` | Start a stopped container |
| `docker restart CONTAINER_ID` | Restart a container |
| `docker rm CONTAINER_ID` | Remove a container |
| `docker exec -it CONTAINER_ID bash` | Open shell inside container |
| `docker logs CONTAINER_ID` | View container logs |
| `docker inspect CONTAINER_ID` | View container details |

---

## Image Commands

| Command | Description |
|---------|-------------|
| `docker images` | List images |
| `docker pull IMAGE` | Pull image from Docker Hub |
| `docker build -t IMAGE_NAME .` | Build image |
| `docker tag IMAGE USER/IMAGE:TAG` | Tag an image |
| `docker push USER/IMAGE:TAG` | Push image |
| `docker rmi IMAGE_ID` | Remove image |
| `docker history IMAGE` | Show image layers |

---

## Volume Commands

| Command | Description |
|---------|-------------|
| `docker volume create NAME` | Create volume |
| `docker volume ls` | List volumes |
| `docker volume inspect NAME` | Inspect volume |
| `docker volume rm NAME` | Remove volume |

---

## Network Commands

| Command | Description |
|---------|-------------|
| `docker network ls` | List networks |
| `docker network create NAME` | Create network |
| `docker network inspect NAME` | Inspect network |
| `docker network connect NETWORK CONTAINER` | Connect container to network |
| `docker network rm NAME` | Remove network |

---

## Docker Compose Commands

| Command | Description |
|---------|-------------|
| `docker compose up` | Start services |
| `docker compose up --build` | Build and start |
| `docker compose down` | Stop and remove services |
| `docker compose down -v` | Remove services + volumes |
| `docker compose ps` | List services |
| `docker compose logs` | View logs |
| `docker compose build` | Build services |
| `docker compose restart` | Restart services |

---

## Cleanup Commands

| Command | Description |
|---------|-------------|
| `docker system df` | Show Docker disk usage |
| `docker image prune` | Remove unused images |
| `docker container prune` | Remove stopped containers |
| `docker volume prune` | Remove unused volumes |
| `docker network prune` | Remove unused networks |
| `docker system prune -a` | Remove all unused resources |

---

## Dockerfile Instructions

| Instruction | Purpose |
|------------|---------|
| `FROM` | Base image |
| `WORKDIR` | Set working directory |
| `COPY` | Copy files |
| `ADD` | Copy + extract archives / remote URLs |
| `RUN` | Execute commands during build |
| `ENV` | Set environment variables |
| `EXPOSE` | Document container port |
| `CMD` | Default command |
| `ENTRYPOINT` | Fixed executable |
| `USER` | Run as non-root user |
| `VOLUME` | Declare mount point |

---

## Useful Docker Flags

| Flag | Meaning |
|------|---------|
| `-d` | Detached mode |
| `-it` | Interactive terminal |
| `-p HOST:CONTAINER` | Port mapping |
| `-v` | Volume mount |
| `--name` | Container name |
| `--rm` | Remove container after exit |
| `-e` | Environment variable |