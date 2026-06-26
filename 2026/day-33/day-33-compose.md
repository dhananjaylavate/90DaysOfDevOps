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

`````
Running the docker containers using compose file which has one container in it.
`````
PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-33\compose-basics> docker compose up -d
[+] up 1/1
 ✔ Container compose-basics-nginxwebserver-1 Running 

 ````
