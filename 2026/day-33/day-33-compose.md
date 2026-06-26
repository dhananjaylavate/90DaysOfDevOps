# Day 33 – Docker Compose: Multi-Container Basics

## Task
Today's goal is to **run multi-container applications with a single command**.

## Challenge Tasks

### Task 1: Install & Verify
1. Check if Docker Compose is available on your machine

````
PS C:\Users\Snehal\devops\90DaysOfDevOps> docker compose version
Docker Compose version v5.1.3

````

### Task 2: Your First Compose File
1. Create a folder `compose-basics`
2. Write a `docker-compose.yml` that runs a single **Nginx** container with port mapping
3. Start it with `docker compose up`
4. Access it in your browser
5. Stop it with `docker compose down`

- Docker compose file for task 2 : `docker-compose.yml`

````
services:

  nginxwebserver: 

    image: nginx:latest

    ports:
      - "8080:80"

````

- Running the docker containers using compose file which has one container in it.

````
PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-33\compose-basics> docker compose up -d
[+] up 1/1
 ✔ Container compose-basics-nginxwebserver-1 Running 

 ````
- Nginx Server is running in browser

 - `http://localhost:8081/` 

 -  Stop it with `docker compose down`

 ````
PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-33\compose-basics> docker compose down 
[+] down 2/2
 ✔ Container compose-basics-nginxwebserver-1 Removed                                                                                      1.0s
 ✔ Network compose-basics_default            Removed   

 ````

### Task 3: Two-Container Setup

Write a `docker-compose.yml` that runs:
- A **WordPress** container
- A **MySQL** container

- Created a docker compose file for containers built and ran using `docker compose up`
- Wordpress is working and running on the `http://localhost:8082/`

`docker-compose.yml`

````
services:

    db:
      image: mysql:8.0
      container_name: mysql_container
      restart: always                                 # restart if the containers is crashes
      
      environment:
        MYSQL_DATABASE: test                         # name of the database
        MYSQL_USER: mysqluser                        # sample is the name of user
        MYSQL_PASSWORD: password                     # password for sample user
        MYSQL_ROOT_PASSWORD: password                # password for root user

      ports:
        - '3306:3306'                                # host port 3306 is mapper to docker port 3306\
      
      expose:
       - '3306'
      volumes:
       - db:/var/lib/mysql


    wordpress:
      image: wordpress
      container_name: wordpress_container

      environment:
        WORDPRESS_DB_HOST: db
        WORDPRESS_DB_USER: mysqluser
        WORDPRESS_DB_PASSWORD: password
        WORDPRESS_DB_NAME: test

      ports: 
      - "8082:80"

      volumes:
        - wordpress:/var/www/html

volumes:
   db:
   wordpress:
````

### Task 5: Environment Variables

- Created .env file and stored the variable names and consumed those into docker-compose.yml using ${VARIABLE_NAME}


# Docker Compose Commands Cheat Sheet 🐳

This directory contains a curated reference guide for essential **Docker Compose** lifecycle commands. Docker Compose simplifies multi-container management by allowing you to control your entire application stack—containers, networks, volumes, and configurations—using unified, high-level CLI commands.

---

## 📋 Command Reference Matrix

| Action | Command | Functional Description |
| :--- | :--- | :--- |
| **🚀 Start Detached** | `docker compose up -d` | Builds, (re)creates, starts, and runs all containers defined in the configuration file in the background (detached mode). |
| **📊 List Services** | `docker compose ps` | Displays the current runtime status, port mappings, and states of all containers managed by the active compose file. |
| **🪵 All Service Logs** | `docker compose logs` | Aggregates and dumps historical log outputs from all running services simultaneously to stdout. |
| **👀 Follow All Logs** | `docker compose logs -f` | Continuous stream tracker. Tails and follows live log updates across all services concurrently. |
| **🎯 Specific Logs** | `docker compose logs <service_name>` | Filters log output exclusively for a single container stack (e.g., `docker compose logs db`). |
| **🛑 Stop Services** | `docker compose stop` | Halts execution of all running containers in the stack. State and underlying container structures are preserved. |
| **🧹 Remove Everything** | `docker compose down` | Gracefully stops execution, then completely purges containers, shared networks, and anonymous volumes created by `up`. |
| **🔄 Force Rebuild** | `docker compose up -d --build` | Instructs Docker to rebuild underlying images from local Dockerfiles before initializing and starting the containers. |

---

## 💡 Pro-Tips for Compose Lifecycle Management

### 1. The Power of `down` vs `stop`
* Use **`docker compose stop`** when you want to briefly pause your environment (e.g., saving CPU resources) but intend to pick up right where you left off.
* Use **`docker compose down`** when you want to completely tear down your local deployment stack to leave a clean slate. *Note: By default, named volumes are preserved during a `down` command unless you explicitly supply the `-v` flag (`docker compose down -v`).*

### 2. Validating Your Compose File Syntax
Before attempting to spin up containers on a production or testing machine, evaluate your environment variables and validate your syntax structure by executing:
```bash
docker compose config