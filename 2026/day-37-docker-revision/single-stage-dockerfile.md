# Single Stage Dockerfile (Node.js)

```dockerfile
# Use the official Node.js image as the base image.
# This image already contains Node.js and npm.
FROM node:20

# Set the working directory inside the container.
# If /app doesn't exist, Docker creates it automatically.
WORKDIR /app

# Copy package.json and package-lock.json first.
# This improves Docker layer caching because dependencies
# don't need to be reinstalled unless these files change.
COPY package*.json ./

# Install project dependencies.
# npm ci is recommended for production because it installs
# exactly what's in package-lock.json.
RUN npm ci

# Copy the remaining application files.
COPY . .

# Inform Docker that the application listens on port 3000.
# EXPOSE is documentation only; it doesn't publish the port.
EXPOSE 3000

# Default command executed when the container starts.
CMD ["npm", "start"]
```

---

## Build the Image

```bash
docker build -t my-node-app .
```

**Explanation**

* `docker build` → Build an image
* `-t` → Tag the image
* `my-node-app` → Image name
* `.` → Current directory is the build context

---

## Run the Container

```bash
docker run -d -p 3000:3000 --name node-app my-node-app
```

Explanation:

* `-d` → Detached mode
* `-p 3000:3000` → Map host port 3000 to container port 3000
* `--name` → Assign container name

---

## Verify

```
docker ps
docker logs node-app
```

---

## Pros

* Simple
* Easy to understand
* Good for learning

## Cons

* Larger image
* Build tools remain in production image
* Dev dependencies may also be included
