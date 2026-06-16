# Day 31 – Dockerfile: Build Your Own Images

## Goal
Write Dockerfiles, build custom images, and understand how Docker layers and build cache work.

## Task 1: Your First Dockerfile

- Created folder: `my-first-image` using `mkdir my-first-image` 
- Created `Dockerfile` using `ubuntu` as base, installed `curl`, and set a default `CMD`.

````
FROM ubuntu:24.04

RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*

CMD ["echo", "Hello from my custom image!"]

````

- Built the image:
  - `docker build -t my-ubuntu:v1 .`

````
PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-31\my-first-image> docker build -t my-ubuntu:v1 .
[+] Building 1.6s (7/7) FINISHED                                                                                  docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                              0.0s
 => => transferring dockerfile: 237B                                                                                              0.0s
 => [internal] load metadata for docker.io/library/ubuntu:24.04                                                                   0.8s
 => [auth] library/ubuntu:pull token for registry-1.docker.io                                                                     0.0s
 => [internal] load .dockerignore                                                                                                 0.0s
 => => transferring context: 2B                                                                                                   0.0s
 => [1/2] FROM docker.io/library/ubuntu:24.04@sha256:786a8b558f7be160c6c8c4a54f9a57274f3b4fb1491cf65146521ae77ff1dc54             0.0s
 => => resolve docker.io/library/ubuntu:24.04@sha256:786a8b558f7be160c6c8c4a54f9a57274f3b4fb1491cf65146521ae77ff1dc54             0.0s
 => CACHED [2/2] RUN apt-get update && apt-get install -y curl                                                                    0.0s
 => exporting to image                                                                                                            0.6s
 => => exporting layers                                                                                                           0.0s
 => => exporting manifest sha256:7bcc4cababee03e3043400e73bd3d1f5e110da5db03a246053e6da268bf4ecb2                                 0.0s
 => => exporting config sha256:e8692c21bd80bbb2a502d573742b6cb2a1a9ee67d277585f748c7c719559d342                                   0.0s
 => => exporting attestation manifest sha256:bd86b7337d05f38c3d99aa1deee9b213fc2f3b81ad04e09c262408b26285b7d9                     0.0s
 => => exporting manifest list sha256:e5062c1e23fee796af54dc24066c2377dbac3ae787359fa4741be13b57be0126                            0.0s
 => => naming to docker.io/library/my-ubuntu:v1                                                                                   0.0s
 => => unpacking to docker.io/library/my-ubuntu:v1                                                                                0.6s

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/90ob5perjp1gxlifdgf643ri4

````
- Ran the image to verify the message prints:
  - `docker run --rm my-ubuntu:v1`

````
PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-31\my-first-image> docker run --rm my-ubuntu:v1  
Hello from my custom image!
PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-31\my-first-image> 

PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-31\my-first-image> docker run my-ubuntu:v1       
Hello from my custom image!
PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-31\my-first-image> 

````

## Task 2: Dockerfile Instructions

- Created folder: `dockerfile-demo`
- Dockerfile uses:
  - `FROM ubuntu:24.04`
  - `RUN` to install dependencies and create a file
  - `WORKDIR /app`
  - `COPY` to copy a local file into the image
  - `EXPOSE 8080` to document a port
  - `CMD` to print the copied file contents
- Built the image:
  - `docker build -t dockerfile-demo:v1 .`
- Ran it:
  - `docker run --rm dockerfile-demo:v1`

## Task 3: CMD vs ENTRYPOINT

- Created folder: `cmd-entrypoint`
- `Dockerfile` with `CMD ["echo", "hello"]`:
  - Running `docker run --rm cmd-cmd:v1` prints `hello`.
  - Running `docker run --rm cmd-cmd:v1 world` prints `world` because custom arguments override `CMD`.
- `Dockerfile` with `ENTRYPOINT ["echo"]`:
  - Running `docker run --rm cmd-entrypoint:v1` prints nothing or just a blank line.
  - Running `docker run --rm cmd-entrypoint:v1 hello world` prints `hello world` because extra arguments are passed to `ENTRYPOINT`.
- Notes:
  - Use `CMD` for a default command that can be replaced by the user.
  - Use `ENTRYPOINT` when you want the container to behave like a specific executable and accept additional arguments.

## Task 4: Build a Simple Web App Image

- Created folder: `my-website`
- Created `index.html` with simple static content.
- Created `Dockerfile` using `nginx:alpine` and copied `index.html` to `/usr/share/nginx/html/index.html`.
- Built the image:
  - `docker build -t my-website:v1 .`
- Ran the container with port mapping:
  - `docker run -d --name my-website -p 8080:80 my-website:v1`
- Verified in browser at `http://localhost:8080`.

## Task 5: .dockerignore

- Added `.dockerignore` to `my-website` with entries:
  - `node_modules`
  - `.git`
  - `*.md`
  - `.env`
- Built the image and verified ignored files were not included in build context.

## Task 6: Build Optimization

- Built an image and changed one line, then rebuilt to observe Docker cache usage.
- Reordered the Dockerfile so frequently changing lines appear later in the file.
- Notes:
  - Docker caches each layer. If a layer does not change, Docker reuses it.
  - Layer order matters because a change invalidates that layer and all layers after it.
  - Put stable setup steps earlier and frequently changing content later for faster rebuilds.

## Files created

- `my-first-image/Dockerfile`
- `dockerfile-demo/Dockerfile`
- `cmd-entrypoint/Dockerfile`
- `my-website/Dockerfile`
- `my-website/index.html`
- `my-website/.dockerignore`

## Commands Reference

- Build first image:
  - `cd 2026/day-31/my-first-image`
  - `docker build -t my-ubuntu:v1 .`
- Run first image:
  - `docker run --rm my-ubuntu:v1`
- Build web app image:
  - `cd 2026/day-31/my-website`
  - `docker build -t my-website:v1 .`
- Run web app:
  - `docker run -d --name my-website -p 8080:80 my-website:v1`
- Remove container:
  - `docker rm -f my-website`

## Learnings

- Dockerfiles declare how an image is built in layers.
- `CMD` is a default command; `ENTRYPOINT` defines the main executable.
- `.dockerignore` keeps build context small by excluding unneeded files.
- Good layer order speeds up rebuilds by preserving cache.
