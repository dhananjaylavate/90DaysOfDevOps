# Day 37 – Docker Revision

# Quick Fire Answers

### 1. Difference between an Image and a Container?

- **Image:** Read-only template used to create containers.
- **Container:** Running instance of an image.

---

### 2. What happens to container data after removing the container?

Data stored inside the container filesystem is lost unless it is stored in a volume or bind mount.

---

### 3. How do two containers communicate on a custom network?

Using the container or service name as the hostname.

Example:

```bash
ping backend
```

---

### 4. Difference between `docker compose down` and `docker compose down -v`

- `docker compose down`
    - Removes containers and networks.

- `docker compose down -v`
    - Removes containers, networks, **and volumes**.

---

### 5. Why are multi-stage builds useful?

- Smaller production images
- Better security
- Faster deployments
- Build tools stay out of runtime image

---

### 6. Difference between COPY and ADD?

| COPY | ADD |
|------|-----|
| Copies local files | Copies local files + extracts archives + supports remote URLs |

Prefer **COPY** unless ADD features are required.

---

### 7. What does `-p 8080:80` mean?

Maps:

Host Port **8080**

↓

Container Port **80**

---

### 8. How do you check Docker disk usage?

```bash
docker system df
```

---

# Weak Topics to Revisit

- CMD vs ENTRYPOINT
- Healthchecks and depends_on

---

# Key Learnings

- Docker images are built in layers.
- Layer caching speeds up rebuilds.
- Multi-stage builds produce smaller production images.
- Docker Compose simplifies multi-container applications.
- Volumes persist data beyond the container lifecycle.
- Containers on the same custom network communicate using service names.

---

# Revision Completed

✅ Docker fundamentals

✅ Dockerfile

✅ Volumes

✅ Networks

✅ Docker Compose

✅ Multi-stage builds

✅ Docker Hub

Next Focus:
- Kubernetes
- CI/CD
- Docker Security