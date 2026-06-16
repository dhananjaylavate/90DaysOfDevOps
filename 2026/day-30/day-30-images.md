# Day 30 – Docker Images & Container Lifecycle

## Goal
Understand how Docker images and containers work, learn the relationship between images and containers, inspect image layers, and practice the full container lifecycle.

## Task 1: Docker Images

- Pulled images:
  - `docker pull nginx`
  - `docker pull ubuntu`
  - `docker pull alpine`

- List of images on machine:
````
PS C:\Users\Snehal> docker images
                                                                                                                                                     i Info →   U  In Use
IMAGE           ID             DISK USAGE   CONTENT SIZE   EXTRA
alpine:latest   f5064d3e5f88         13MB         3.93MB
nginx:latest    608a100c7165        241MB           66MB
ubuntu:latest   f3d28607ddd7        160MB         45.3MB    U 
PS C:\Users\Snehal>

````



  - plus any intermediate or cached images created by Docker

- Size comparison:
  - `ubuntu` is much larger than `alpine` because Ubuntu includes a full userland and many utilities.
  - `alpine` is intentionally minimal, built around a tiny base and using `musl` libc instead of `glibc`.
  - Smaller images reduce download time and attack surface.

- Image inspection:
  - Used `docker inspect nginx` to view metadata such as `Id`, `RepoTags`, `RepoDigests`, and `Created` timestamp.
  - The config section shows `ExposedPorts` (`80/tcp`), environment variables, `Entrypoint` (`/docker-entrypoint.sh`), `Cmd` (`nginx -g daemon off;`), labels, and `StopSignal` (`SIGQUIT`).
  - Additional metadata includes `Architecture` (`amd64`), `Os` (`linux`), and image `Size` (`63125971` bytes).
  - The `RootFS` section confirms the image is stored as layered filesystem diffs and lists the layer digests.

- Removed an image no longer needed:
  - Removed one of the pulled images with `docker rmi <image>` to free local disk space.

## Task 2: Image Layers

- Command: `docker image history nginx`

````
PS C:\Users\Snehal> docker image history nginx
IMAGE          CREATED      CREATED BY                                      SIZE      COMMENT
608a100c7165   5 days ago   CMD ["nginx" "-g" "daemon off;"]                0B        buildkit.dockerfile.v0
<missing>      5 days ago   STOPSIGNAL SIGQUIT                              0B        buildkit.dockerfile.v0
<missing>      5 days ago   EXPOSE map[80/tcp:{}]                           0B        buildkit.dockerfile.v0
<missing>      5 days ago   ENTRYPOINT ["/docker-entrypoint.sh"]            0B        buildkit.dockerfile.v0
<missing>      5 days ago   COPY 30-tune-worker-processes.sh /docker-ent…   16.4kB    buildkit.dockerfile.v0
<missing>      5 days ago   COPY 20-envsubst-on-templates.sh /docker-ent…   12.3kB    buildkit.dockerfile.v0
<missing>      5 days ago   COPY 15-local-resolvers.envsh /docker-entryp…   12.3kB    buildkit.dockerfile.v0
<missing>      5 days ago   COPY 10-listen-on-ipv6-by-default.sh /docker…   12.3kB    buildkit.dockerfile.v0
<missing>      5 days ago   COPY docker-entrypoint.sh / # buildkit          8.19kB    buildkit.dockerfile.v0
<missing>      5 days ago   RUN /bin/sh -c set -x     && groupadd --syst…   87.1MB    buildkit.dockerfile.v0
<missing>      5 days ago   ENV DYNPKG_RELEASE=1~trixie                     0B        buildkit.dockerfile.v0
<missing>      5 days ago   ENV PKG_RELEASE=1~trixie                        0B        buildkit.dockerfile.v0
<missing>      5 days ago   ENV ACME_VERSION=0.4.1                          0B        buildkit.dockerfile.v0
<missing>      5 days ago   ENV NJS_RELEASE=1~trixie                        0B        buildkit.dockerfile.v0
<missing>      5 days ago   ENV NJS_VERSION=0.9.9                           0B        buildkit.dockerfile.v0
<missing>      5 days ago   ENV NGINX_VERSION=1.31.1                        0B        buildkit.dockerfile.v0
<missing>      5 days ago   LABEL maintainer=NGINX Docker Maintainers <d…   0B        buildkit.dockerfile.v0
<missing>      6 days ago   # debian.sh --arch 'amd64' out/ 'trixie' '@1…   87.4MB    debuerreotype 0.17
PS C:\Users\Snehal>

````

- Actual output summary:
  - The top layer is the `CMD ["nginx" "-g" "daemon off;"]` instruction and shows `0B`.
  - Several metadata layers such as `STOPSIGNAL SIGQUIT`, `EXPOSE 80`, `ENTRYPOINT`, and environment variable `ENV` lines also show `0B`.
  - The `COPY` steps for Nginx entrypoint scripts show small sizes like `16.4kB`, `12.3kB`, and `8.19kB`.
  - A large `RUN` step shows `87.1MB`, which includes package installation and system setup.
  - The base Debian layer from `debuerreotype` shows `87.4MB`.

- Observations:
  - Each line in the output represents a layer built on top of the previous layer.
  - Layers with `0B` mean the instruction did not add new files to the filesystem; they represent metadata, configuration, or commands that do not change contents.
  - Layers with non-zero size correspond to actual filesystem changes like copied files or installed packages.

- What are layers and why Docker uses them?
  - Layers are filesystem diffs that store only the changes made by each Dockerfile instruction.
  - Docker uses layers for caching and reuse; if a layer is already available locally, Docker can skip rebuilding that layer.
  - Layers make builds faster, images smaller, and enable efficient distribution by sharing identical layers across images.

## Task 3: Container Lifecycle

Practiced the container lifecycle with a single container:

1. Created a container without starting it using `docker create nginx`.
   - Container ID: `02d1bd48d7ce73eb5570a7ee764085ae8ef4ce8f90a76b6e587b4eb64aad27e7`
2. Docker Start: `docker start 02d1bd48d7ce73eb5570a7ee764085ae8ef4ce8f90a76b6e587b4eb64aad27e7`.
3. Verified the container was running with `docker ps`.
4. Paused it with `docker pause 02d1bd48d7ce73`.
5. Confirmed the paused status with `docker ps` showing `Up ... (Paused)`.
6. Stopped it using `docker stop 02d1bd48d7ce73`.
7. Restarted it with `docker restart 02d1bd48d7ce73`.
8. Killed it with `docker kill 02d1bd48d7ce73`.
9. Removed it with `docker rm 02d1bd48d7ce73`.

- Observed `docker ps` and `docker ps -a` after each step to see status changes.
- `docker ps -a` showed the container state as `Created`, then `Up`, then `Paused`, then `Exited (137)` after kill, and finally the container disappeared after `docker rm`.
- Noted that `docker ps -a` also lists many other historical containers, which is useful for cleanup and tracking previous runs.

## Task 4: Working with Running Containers

- Ran Nginx in detached mode with `docker run -d --name nginx-demo -p 8080:80 nginx`
- Checked logs:
  - `docker logs nginx-demo`
- Followed real-time logs:
  - `docker logs -f nginx-demo`
- Executed into the container:
  - `docker exec -it nginx-demo /bin/sh`
- Ran a single command without entering:
  - `docker exec nginx-demo ls /usr/share/nginx/html`
- Inspected the container:
  - `docker inspect nginx-demo`
  - Found the container's IP address, port mappings, and mount information in the inspection output.

## Task 5: Cleanup

- Stopped all running containers in one command:
  - `docker stop $(docker ps -q)`
- Removed all stopped containers in one command:
  - `docker rm $(docker ps -aq)`
- Removed unused images:
  - `docker image prune -a`
  - Confirmed prompt and removed dangling images
  - Reclaimed `65.98MB` of disk space
- Checked Docker disk usage:
  - `docker system df`

![Docker bulk cleanup commands(Docker-Bulk-Cleanup-Commands.png)]

## Key Learnings

- Images are the read-only templates; containers are running instances created from images.
- Layers provide build caching and efficient storage, so repeated builds reuse unchanged parts.
- Container lifecycle states are visible with `docker ps -a`, which helps track `Created`, `Running`, `Paused`, `Exited`, and `Dead` states.
- Detached containers are useful for background services, while `docker exec` allows inspecting the filesystem and running commands inside.
- Regular cleanup prevents Docker from using too much disk space from old images and stopped containers.

## Notes

- `ubuntu` vs `alpine`: choose `alpine` for small, lightweight images and `ubuntu` for compatibility when you need a fuller userland.
- `docker inspect` is a powerful tool for diagnosing networking, mounts, and runtime configuration.
- `docker image history` is useful to understand how image layers are composed.

---

## Screenshot Notes

Take screenshots for the following commands:
- `docker pull nginx`
- `docker pull ubuntu`
- `docker pull alpine`
- `docker images`
- `docker image history nginx`
- `docker create nginx`
- `docker ps -a`
- `docker run -d --name nginx-demo -p 8080:80 nginx`
- `docker logs -f nginx-demo`
- `docker inspect nginx-demo`
- `docker system df`

![docker pull images(docker-pull-images.png)]
