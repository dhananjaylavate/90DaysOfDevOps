# Day 31 – Dockerfile: Build Your Own Images

## Task
Today's goal is to **write Dockerfiles and build custom images**.

This is the skill that separates someone who uses Docker from someone who actually ships with Docker.

---

## Expected Output
- A markdown file: `day-31-dockerfile.md`
- All Dockerfiles you create

---

## Challenge Tasks

### Task 1: Your First Dockerfile
1. Create a folder called `my-first-image`
2. Inside it, create a `Dockerfile` that:
   - Uses `ubuntu` as the base image
   - Installs `curl`
   - Sets a default command to print `"Hello from my custom image!"`
3. Build the image and tag it `my-ubuntu:v1`

````

PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-31\my-first-image> docker build -t my-ubuntu:v1 .
[+] Building 29.5s (7/7) FINISHED                                                                                                                         docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                                                                      0.4s
 => => transferring dockerfile: 199B                                                                                                                                      0.2s
 => [internal] load metadata for docker.io/library/ubuntu:24.04                                                                                                           3.8s
 => [auth] library/ubuntu:pull token for registry-1.docker.io                                                                                                             0.0s
 => [internal] load .dockerignore                                                                                                                                         0.0s
 => => transferring context: 2B                                                                                                                                           0.0s
 => [1/2] FROM docker.io/library/ubuntu:24.04@sha256:786a8b558f7be160c6c8c4a54f9a57274f3b4fb1491cf65146521ae77ff1dc54                                                     4.9s
 => => resolve docker.io/library/ubuntu:24.04@sha256:786a8b558f7be160c6c8c4a54f9a57274f3b4fb1491cf65146521ae77ff1dc54                                                     0.1s
 => => sha256:cb259a83ac3dd9fea0b394df41df2b298adf0df938fef5999475af18a751c257 29.73MB / 29.73MB                                                                          3.8s
 => => extracting sha256:cb259a83ac3dd9fea0b394df41df2b298adf0df938fef5999475af18a751c257                                                                                 1.0s
 => [2/2] RUN apt-get update     && apt-get install -y curl     && rm -rf /var/lib/apt/lists/*                                                                           18.0s
 => exporting to image                                                                                                                                                    1.5s 
 => => exporting layers                                                                                                                                                   0.9s 
 => => exporting manifest sha256:154d5240a428ac91e3d7bd1b0485fdbd22a4904663cb97320f077c43a0d153a9                                                                         0.0s 
 => => exporting config sha256:3b35499f7fea03cfc3b53487b24372153292ce6ec34d146d117380f37ea6ce08                                                                           0.0s 
 => => exporting attestation manifest sha256:ba011a3687740db22aa3451a931562c15d9465c650a75af18a694f5a32d1fe77                                                             0.0s 
 => => exporting manifest list sha256:6c111630ed19709e7dc5557af535e60ff04df1f9753edc73875b7377dbae9625                                                                    0.0s 
 => => naming to docker.io/library/my-ubuntu:v1                                                                                                                           0.0s
 => => unpacking to docker.io/library/my-ubuntu:v1                                                                                                                        0.2s

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/wsg9ilz90kyxbswztz4g6u1td
PS C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-31\my-first-image> 

````
4. Run a container from your image

**Verify:** The message prints on `docker run`

---

### Task 2: Dockerfile Instructions
Create a new Dockerfile that uses **all** of these instructions:
- `FROM` — base image
- `RUN` — execute commands during build
- `COPY` — copy files from host to image
- `WORKDIR` — set working directory
- `EXPOSE` — document the port
- `CMD` — default command

Build and run it. Understand what each line does.

---

### Task 3: CMD vs ENTRYPOINT
1. Create an image with `CMD ["echo", "hello"]` — run it, then run it with a custom command. What happens?
2. Create an image with `ENTRYPOINT ["echo"]` — run it, then run it with additional arguments. What happens?
3. Write in your notes: When would you use CMD vs ENTRYPOINT?

---

### Task 4: Build a Simple Web App Image
1. Create a small static HTML file (`index.html`) with any content
2. Write a Dockerfile that:
   - Uses `nginx:alpine` as base
   - Copies your `index.html` to the Nginx web directory
3. Build and tag it `my-website:v1`
4. Run it with port mapping and access it in your browser

---

### Task 5: .dockerignore
1. Create a `.dockerignore` file in one of your project folders
2. Add entries for: `node_modules`, `.git`, `*.md`, `.env`
3. Build the image — verify that ignored files are not included

---

### Task 6: Build Optimization
1. Build an image, then change one line and rebuild — notice how Docker uses **cache**
2. Reorder your Dockerfile so that frequently changing lines come **last**
3. Write in your notes: Why does layer order matter for build speed?

---

## Hints
- Build: `docker build -t name:tag .`
- The `.` at the end is the build context
- `COPY . .` copies everything from host to container
- Nginx serves files from `/usr/share/nginx/html/`

---

## Submission
1. Add your Dockerfiles and `day-31-dockerfile.md` to `2026/day-31/`
2. Commit and push to your fork

---

## Learn in Public
Share your custom Docker image or Nginx screenshot on LinkedIn.

`#90DaysOfDevOps` `#DevOpsKaJosh` `#TrainWithShubham`

Happy Learning!
**TrainWithShubham**
