# Day 29 — Introduction to Docker

## Task Overview
Today's goal is to **understand what Docker is and run your first container**. You will learn container fundamentals, install Docker, and practice running real-world containers.

---

## What is Docker?

**Docker** is an open-source software platform that packages applications and all their dependencies into standardized, isolated units called **containers**. Because the container holds everything needed to run the software (code, runtime, libraries, and settings), it ensures the application behaves exactly the same way on any computer.

### Why is Docker Used?

Docker solves a fundamental problem in software: **"It works on my machine, but breaks in production."** Here's why developers and businesses use it:

- **Consistent Environments:** Docker eliminates the "it depends on my system" headache. Whether a developer is on a Mac, Windows, or Linux, a Docker container guarantees the app will run exactly as intended. No more surprises when deploying to production.

- **Absolute Isolation:** Containers keep applications and their dependencies separate. If one app crashes or needs a specific software update, it will not interfere with other apps running on the same machine.

- **Resource Efficiency:** Unlike Virtual Machines (VMs), which require a heavy operating system for each application, Docker containers share the host machine's operating system kernel. This makes them incredibly lightweight, allowing you to run many more apps on the same hardware.

- **Easy Scaling and Portability:** Need to move your application to the cloud? You can package your Docker container and deploy it to any cloud provider (like AWS) or on-premises server in seconds, making scaling incredibly fast.

### Core Concepts

To use Docker effectively, you'll work with three main building blocks:

1. **Dockerfile:** A simple text file that contains the step-by-step instructions for building your application environment. Think of it as a recipe.

2. **Docker Image:** The packaged result of your Dockerfile. It is a read-only template (blueprint) used to create actual running containers.

3. **Containers:** The running instance of an Image. It is the active, isolated "box" where your application is executing.

**Analogy**: A Dockerfile is the recipe, a Docker Image is the packaged meal, and a Container is the meal you're actually eating.

---

## Task 1: What is Docker? (Deep Dive)

### What is a Container and Why Do We Need Them?

**Definition**: A container is a lightweight, standalone executable package that includes an application and all its dependencies (libraries, runtime, configuration files).


### Containers vs Virtual Machines — The Key Differences

| Aspect | Container | Virtual Machine |
|--------|-----------|-----------------|
| **OS** | Shares host OS kernel | Full OS inside | 
| **Startup time** | Milliseconds | Minutes |
| **Size** | ~100 MB | ~10 GB |
| **Resource use** | Minimal overhead | Significant overhead |
| **Density** | Run 100s of containers | Run few VMs |
| **Isolation** | Process-level | Full OS isolation |

**Visual comparison**:
```
VMs:
┌─────────────┐
│   OS (Guest)│  
│   OS (Guest)│  
│  Hypervisor │
└─────────────┘
    Host OS

Containers:
┌──────┐ ┌──────┐
│ App1 │ │ App2 │
│ Libs │ │ Libs │
├──────┴─┴──────┤
│  Docker Engine │
│   Host OS      │
└────────────────┘
```

### Docker Architecture

Docker follows a **client-server architecture** with these key components:

1. **Docker Daemon (`dockerd`)** — The server running on the host, manages containers, images, networks, and storage
2. **Docker Client** — CLI tool you use; sends commands to the daemon
3. **Docker Images** — Read-only templates (blueprints) for containers
4. **Containers** — Running instances of images (like processes)
5. **Docker Registry** — Remote repository of images (Docker Hub, private registries)

**Architecture diagram**:
```
┌─────────────┐
│ Docker CLI  │  (docker run, docker ps, etc.)
│  (Client)   │
└──────┬──────┘
       │ (REST API)
       ▼
┌─────────────────────┐
│  Docker Daemon      │
│  (dockerd)          │
│                     │
│  ┌───────────────┐  │
│  │   Containers  │  │  Running instances
│  ├───────────────┤  │
│  │   Images      │  │  Container templates
│  ├───────────────┤  │
│  │   Volumes     │  │  Data persistence
│  ├───────────────┤  │
│  │   Networks    │  │  Container networking
│  └───────────────┘  │
└─────────────────────┘
       │
       ▼
┌──────────────────┐
│  Docker Hub      │  (Official registry)
│  (Registry)      │  Other registries
└──────────────────┘
```

**How it works**:
1. You run `docker run nginx` in the terminal
2. The Docker client sends the command to the daemon via REST API
3. The daemon checks if the `nginx` image exists locally
4. If not, it pulls the image from Docker Hub
5. The daemon creates a container from the image
6. The container starts running

---

## Task 2: Install Docker

### Step 1: Install Docker

**On Windows (using WSL2):**
```bash
# Install Docker Desktop for Windows
# Download: https://www.docker.com/products/docker-desktop
# Or via winget:
winget install Docker.DockerDesktop
```

**On Linux (Ubuntu/Debian):**
```bash
# Install Docker Engine
sudo apt-get update
sudo apt-get install docker.io -y
sudo usermod -aG docker $USER
# Restart or log in again for group membership to take effect
```

**On macOS:**
```bash
# Install Docker Desktop
# Download: https://www.docker.com/products/docker-desktop
# Or via Homebrew:
brew install docker
```

### Step 2: Verify Installation

```bash
docker --version
docker run hello-world
```

**Expected output:**
```
Docker version 24.0.0, build abcdef1

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete
Digest: sha256:abc...
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub
 3. The daemon created a new container from that image
 4. The daemon streamed that output to the Docker client
...
```

**What just happened:**
- Docker pulled the `hello-world` image from Docker Hub
- Created a container from that image
- Ran the container
- The container printed a message and exited
- The container was stopped (but not deleted)

### Verify with Additional Commands

```bash
# Check Docker daemon status
docker info

# List images
docker images

# List all containers (including stopped)
docker ps -a
```

---

## Task 3: Run Real Containers

### 3.1 Run an Nginx Container

```bash
# Run Nginx in detached mode on port 8080
docker run -d --name my-nginx -p 8080:80 nginx

# Verify it's running
docker ps
```

**Expected output:**
```
CONTAINER ID   IMAGE     COMMAND                  CREATED        STATUS        PORTS                  NAMES
a1b2c3d4e5f6   nginx     "/docker-entrypoint.…"   2 seconds ago   Up 1 second   0.0.0.0:8080->80/tcp   my-nginx
```

**Access in browser:**
```
http://localhost:8080
```

You should see the default Nginx welcome page.

### 3.2 Run an Ubuntu Container Interactively

```bash
# Run Ubuntu in interactive mode with a terminal
docker run -it --name my-ubuntu ubuntu /bin/bash

# Inside the container, you can run Linux commands:
root@a1b2c3d4e5f6:/# ls
root@a1b2c3d4e5f6:/# whoami
root@a1b2c3d4e5f6:/# uname -a
root@a1b2c3d4e5f6:/# exit
```

**What the flags mean:**
- `-i` — Interactive (keep STDIN open even if not attached)
- `-t` — Allocate a terminal (TTY)
- `--name` — Custom name for the container

### 3.3 List All Running Containers

```bash
docker ps
```

**Output example:**
```
CONTAINER ID   IMAGE     COMMAND                  CREATED       STATUS       PORTS                  NAMES
a1b2c3d4e5f6   nginx     "/docker-entrypoint.…"  2 minutes ago  Up 2 min     0.0.0.0:8080->80/tcp   my-nginx
```

### 3.4 List All Containers (Including Stopped)

```bash
docker ps -a
```

**Output example:**
```
CONTAINER ID   IMAGE           COMMAND                  CREATED        STATUS                    PORTS                  NAMES
a1b2c3d4e5f6   nginx           "/docker-entrypoint.…"  5 minutes ago  Up 5 minutes              0.0.0.0:8080->80/tcp   my-nginx
b2c3d4e5f6g7   ubuntu          "/bin/bash"              3 minutes ago  Exited (0) 1 minute ago                          my-ubuntu
9z8y7x6w5v4u   hello-world     "/hello"                 8 minutes ago  Exited (0) 8 minutes ago                         unruly_einstein
```

### 3.5 Stop a Container

```bash
# Stop the Nginx container gracefully (waits 10s)
docker stop my-nginx

# Verify it stopped
docker ps

# Check with -a flag
docker ps -a  # Status shows "Exited"
```

### 3.6 Remove a Container

```bash
# Remove a stopped container
docker rm my-nginx

# Verify it's gone
docker ps -a  # my-nginx no longer appears
```

---

## Task 4: Explore Docker Features

### 4.1 Detached Mode (`-d`)

```bash
# Run a container in detached mode (background)
docker run -d --name detached-nginx -p 8081:80 nginx

# Container runs in the background
# You get immediate access to the terminal
echo "Container is running in the background"

# Check it's running
docker ps
```

**Difference from interactive mode:**
- Interactive (`-it`): Attaches you to the container's terminal
- Detached (`-d`): Runs in the background, returns immediately

### 4.2 Custom Container Names

```bash
# Instead of random names (cranky_babbage), use custom names
docker run -d --name web-server -p 8082:80 nginx
docker run -d --name app-backend -p 5000:5000 python:3.9

docker ps
# Shows: web-server, app-backend (instead of random names)
```

### 4.3 Port Mapping (`-p`)

```bash
# Syntax: docker run -p host_port:container_port image

# Map port 8080 on host to 80 in container
docker run -d --name webserver -p 8080:80 nginx

# Map multiple ports
docker run -d --name app -p 3000:3000 -p 5432:5432 myapp

# Map to a random host port
docker run -d --name app2 -p 80 nginx
# Check which port was assigned
docker ps
```

**Output example:**
```
CONTAINER ID   IMAGE   COMMAND                  CREATED       STATUS       PORTS                      NAMES
c1d2e3f4g5h6   nginx   "/docker-entrypoint.…"  1 minute ago  Up 1 minute  0.0.0.0:8080->80/tcp       webserver
d2e3f4g5h6i7   nginx   "/docker-entrypoint.…"  30 seconds ago Up 29 sec   0.0.0.0:32768->80/tcp      app2
```

### 4.4 View Container Logs

```bash
# View logs of a running container
docker logs my-nginx

# Follow logs in real-time (like tail -f)
docker logs -f my-nginx

# View last 10 lines
docker logs --tail 10 my-nginx

# View logs with timestamps
docker logs -t my-nginx
```

**Sample output:**
```
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to launch docker-entrypoint.d/*.sh scripts
...
2026-06-13T10:15:23.123456789Z [notice] 1#1: signal process started
...
```

### 4.5 Execute Commands Inside a Running Container

```bash
# Run a command inside a container
docker exec my-nginx ls /usr/share/nginx/html

# Run an interactive shell inside the container
docker exec -it my-nginx /bin/bash

# Inside the container:
root@a1b2c3d4e5f6:/# cat /etc/nginx/nginx.conf
root@a1b2c3d4e5f6:/# exit
```

**Difference from `docker run`:**
- `docker run` — Creates a new container and runs a command
- `docker exec` — Runs a command in an already-running container

---

## Quick Reference: Common Docker Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `docker run` | Create and run a container | `docker run -d -p 8080:80 nginx` |
| `docker ps` | List running containers | `docker ps` |
| `docker ps -a` | List all containers | `docker ps -a` |
| `docker stop` | Stop a running container | `docker stop my-nginx` |
| `docker start` | Start a stopped container | `docker start my-nginx` |
| `docker rm` | Delete a container | `docker rm my-nginx` |
| `docker logs` | View container logs | `docker logs -f my-nginx` |
| `docker exec` | Run command in container | `docker exec -it my-nginx bash` |
| `docker images` | List local images | `docker images` |
| `docker pull` | Download an image | `docker pull ubuntu:22.04` |
| `docker inspect` | View container details | `docker inspect my-nginx` |
| `docker stats` | Real-time resource usage | `docker stats` |

---

## Sample Workflow: Complete Example

```bash
# 1. Run Nginx in the background
docker run -d --name web-app -p 8080:80 nginx

# 2. Check it's running
docker ps

# 3. View logs
docker logs web-app

# 4. Check default Nginx page (open browser or curl)
curl http://localhost:8080

# 5. Execute command inside container
docker exec web-app cat /etc/nginx/nginx.conf

# 6. Open interactive shell
docker exec -it web-app /bin/bash
# Inside: ls, pwd, cat files, then exit

# 7. Stop the container
docker stop web-app

# 8. Verify it stopped
docker ps -a

# 9. Remove the container
docker rm web-app

# 10. Verify removal
docker ps -a
```

---

## Why This Matters for DevOps

Docker is foundational for modern software delivery:

- **CI/CD Pipelines**: Build once, run everywhere
- **Kubernetes**: Orchestrates Docker containers at scale
- **Microservices**: Each service runs in its own container
- **Infrastructure as Code**: Dockerfile = reproducible environments
- **Development**: Local environment matches production exactly

---

## Key Takeaways

1. **Containers** are lightweight, portable, isolated execution environments
2. **Docker** simplifies container management with a user-friendly CLI
3. **Images** are blueprints; **containers** are running instances
4. Common flags: `-d` (detached), `-it` (interactive), `-p` (port), `--name` (naming)
5. Use `docker ps`, `docker logs`, `docker exec` to manage running containers

---

## Next Steps
- Explore Docker Hub (hub.docker.com) for more images
- Try running containers from different technologies (Python, Node, MySQL, PostgreSQL)
- Learn about Dockerfile (write your own custom images)
- Experiment with environment variables (`-e` flag)
- Study Docker networking and volumes

---

## Resources
- Official Docker Docs: https://docs.docker.com/
- Docker Hub: https://hub.docker.com/
- Interactive Docker Tutorial: https://www.docker.com/101-tutorial/

---

**Generated for Day 29: Introduction to Docker**  
#90DaysOfDevOps #DevOpsKaJosh #TrainWithShubham
