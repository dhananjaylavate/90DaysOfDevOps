# Day 32 – Docker Volumes & Networking: Commands & Explanations

## Task 1: The Problem – Data Loss Without Volumes

**Objective:** Demonstrate that containers are ephemeral and data is lost when a container is removed without a volume.

### Commands:

1. **Run a Postgres container without any volume:**
   ```bash
   docker run --name postgres-demo -e POSTGRES_PASSWORD=rootpass -d postgres:latest
   ```
   **Explanation:** 
   - `--name postgres-demo` → Gives the container a readable name
   - `-e POSTGRES_PASSWORD=rootpass` → Sets the password environment variable
   - `-d` → Runs container in detached mode (background)
   - `postgres:15` → Uses PostgreSQL version 15 image

2. **Wait for Postgres to be ready (check logs):**
   ```bash
   docker logs postgres-demo
   ```
   **Explanation:** Check if Postgres initialization is complete. Wait for message like "database system is ready to accept connections".

3. **Create a database and add data:**

- ````docker exec -it postgres-demo````

- ````psql -U postgres```` 

- ````CREATE DATABASE testdb;````

- ````\c testdb;```` 

- ````CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));````

- ````INSERT INTO users (name) VALUES ('Alice'), ('Bob'), ('Charlie');````
   
   **Explanation:**
   - `docker exec -it` → Execute command inside running container interactively
   - `psql -U postgres` → Connect to Postgres as the postgres user
   - `-c` → Execute SQL command and exit
   - Creates database, table, and inserts 3 rows of data

4. **Verify data was created:**
   ```bash
   docker exec -it postgres-demo psql -U postgres -d testdb -c "SELECT * FROM users;"
   ```
   **Explanation:** Query the users table to confirm data exists.

5. **Stop the container:**
   ```bash
   docker stop postgres-demo
   ```
   **Explanation:** Gracefully stops the running container.

6. **Remove the container:**
   ```bash
   docker rm postgres-demo
   ```
   **Explanation:** Deletes the container completely (but not the image).

7. **Run a new Postgres container with the same name:**
   ```bash
   docker run --name postgres-demo -e POSTGRES_PASSWORD=rootpass -d postgres:latest
   ```
   **Explanation:** Starts a fresh container. This will create a brand new database with no data.

8. **Try to access the data we created:**
   ```bash
   docker exec -it postgres-demo psql -U postgres -d testdb -c "SELECT * FROM users;"
   ```
   **Explanation:** This will fail because the `testdb` database no longer exists.

9. **Verify the database is empty:**
   ```bash
   docker exec -it postgres-demo psql -U postgres -c "\l"
   ```
   **Explanation:** Shows only default Postgres databases (no testdb).

### Expected Result:
❌ **Data is LOST.** The new container has no trace of the database or data we created. This proves containers are ephemeral.

### Cleanup:
```bash
docker stop postgres-demo && docker rm postgres-demo
```

---

## Task 2: Named Volumes – Data Persistence

**Objective:** Use a named volume to persist data across container recreation.

### Commands:

1. **Create a named volume:**
   ```bash
   docker volume create postgres-data
   ```
   **Explanation:** Creates a volume named `postgres-data` that Docker manages on the host.

2. **Verify the volume was created:**
   ```bash
   docker volume ls
   ```
   **Explanation:** Lists all volumes on the system. Should show `postgres-data`.

3. **Inspect the volume details:**
   ```bash
   docker volume inspect postgres-data
   ```
   **Explanation:** Shows the volume's metadata, including its mount point on the host.

4. **Run Postgres container WITH the volume:**
   ```bash
   docker run --name postgres-persist -e POSTGRES_PASSWORD=rootpass -d -v postgres-data:/var/lib/postgresql postgres:latest
   ```
   **Explanation:**
   - `-v postgres-data:/var/lib/postgresql` → Mounts the named volume to Postgres's data directory
   - `/var/lib/postgresql/data` → This is where Postgres stores its databases
   - Everything Postgres writes goes to the volume on the host

5. **Wait for Postgres to be ready:**
   ```bash
   docker logs postgres-persist
   ```

6. **Create database and data again:**
   ```bash
   docker exec -it postgres-persist psql -U postgres -c "CREATE DATABASE testdb; \c testdb; CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100)); INSERT INTO users (name) VALUES ('Alice'), ('Bob'), ('Charlie');"
   ```

7. **Verify data was created:**
   ```bash
   docker exec -it postgres-persist psql -U postgres -d testdb -c "SELECT * FROM users;"
   ```
   **Expected Output:** Shows 3 rows (Alice, Bob, Charlie).

8. **Stop the container:**
   ```bash
   docker stop postgres-persist
   ```

9. **Remove the container:**
   ```bash
   docker rm postgres-persist
   ```

10. **Run a NEW container with the SAME volume:**
    ```bash
    docker run --name postgres-persist-new -e POSTGRES_PASSWORD=rootpass -d -v postgres-data:/var/lib/postgresql/data postgres:latest
    ```
    **Explanation:** New container, same volume. The data should be there!

11. **Wait for Postgres to be ready:**
    ```bash
    docker logs postgres-persist-new
    ```

12. **Query the data:**
    ```bash
    docker exec -it postgres-persist-new psql -U postgres -d testdb -c "SELECT * FROM users;"
    ```

### Expected Result:
✅ **Data PERSISTS.** The new container can access the data because it uses the same named volume.

### Cleanup:
```bash
docker stop postgres-persist-new && docker rm postgres-persist-new
docker volume rm postgres-data
```

---

## Task 3: Bind Mounts – Host to Container File Sharing

**Objective:** Mount a host directory into a container and demonstrate live editing.

### Commands:

1. **Create a host directory and index.html file:**
   ```bash
   mkdir -p C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-32\bind-mount-demo
   cd C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-32\bind-mount-demo
   ```
   **Explanation:** Creates a folder on the host machine (Windows).

2. **Create an index.html file:**
   ```bash
   echo '<html><body><h1>Welcome to Bind Mounts!</h1><p>This is served from the host machine.</p></body></html>' > index.html
   ```
   **Explanation:** Creates a simple HTML file in the host directory.

3. **Run Nginx container with bind mount:**
   ```bash
   docker run --name nginx-bind -d -p 8080:80 -v C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-32\bind-mount-demo:/usr/share/nginx/html nginx:alpine
   ```
   **Explanation:**
   - `-v C:\Users\Snehal\devops\90DaysOfDevOps\2026\day-32\bind-mount-demo:/usr/share/nginx/html` → Bind mounts host directory to Nginx web root
   - `-p 8080:80` → Maps port 8080 on host to port 80 in container
   - Any file changes on host are immediately visible in container

4. **Access the page in browser:**
   ```
   Open browser → http://localhost:8080
   ```
   **Expected:** Should see "Welcome to Bind Mounts!" and the message.

5. **Edit the HTML file on the host:**
   ```bash
   echo '<html><body><h1>Updated Content!</h1><p>Bind mounts are LIVE!</p></body></html>' > index.html
   ```
   **Explanation:** Modifies the HTML file on the host machine.

6. **Refresh the browser:**
   ```
   Press F5 or Refresh button
   ```
   **Expected:** Should see "Updated Content!" immediately without restarting the container.

7. **Verify inside the container:**
   ```bash
   docker exec -it nginx-bind cat /usr/share/nginx/html/index.html
   ```
   **Explanation:** Shows that changes on host are visible inside container.

### Expected Result:
✅ **Live editing works.** Changes on the host are immediately reflected in the container.

### Key Differences: Named Volumes vs Bind Mounts
| Aspect | Named Volume | Bind Mount |
|--------|--------------|-----------|
| **Location** | Managed by Docker (usually `/var/lib/docker/volumes`) | Any location on host |
| **Portability** | Portable across machines | Host-specific |
| **Use Case** | Persistent data (databases, applications) | Development (live editing) |
| **Performance** | Better on Windows with Docker Desktop | Direct host filesystem access |
| **Visibility** | Host path hidden from user | User manages the directory |

### One-line difference:
- Mount (bind) = your local folder
- Volume = Docker-managed storage

### Cleanup:
```bash
docker stop nginx-bind && docker rm nginx-bind
```

---

## Task 4: Docker Networking Basics – Default Bridge

**Objective:** Understand default bridge network limitations and how containers communicate by IP.

### Commands:

1. **List all Docker networks:**
   ```bash
   docker network ls
   ```
   **Explanation:** Shows all networks (bridge, host, none, and any custom networks).

2. **Inspect the default bridge network:**
   ```bash
   docker network inspect bridge
   ```
   **Explanation:** Shows detailed information about the default bridge network, including connected containers and their IPs.

3. **Run first container on default bridge:**
   ```bash
   docker run --name container1 -d --network bridge alpine sleep 1000
   ```
   **Explanation:**
   - `alpine` → Lightweight Linux image
   - `sleep 1000` → Keeps container running for 1000 seconds
   - `--network bridge` → Explicitly uses default bridge (default if not specified)

4. **Run second container on default bridge:**
   ```bash
   docker run --name container2 -d --network bridge alpine sleep 1000
   ```

5. **Get IP addresses of both containers:**
   ```bash
   docker network inspect bridge
   ```
   **Explanation:** Look for the "Containers" section to see IPs assigned (e.g., 172.17.0.2 and 172.17.0.3).

6. **Test ping by CONTAINER NAME (will fail):**
   ```bash
   docker exec -it container1 ping -c 2 container2
   ```
   **Expected Result:** ❌ **FAILS** - "unknown host" or similar error. Default bridge doesn't support DNS name resolution.

7. **Test ping by IP address (will succeed):**
   ```bash
   docker exec -it container1 ping -c 2 172.17.0.3
   ```
   **Expected Result:** ✅ **WORKS** - Containers can communicate by IP on default bridge.

### Expected Result:
- ❌ Container name-based communication: **FAILS**
- ✅ IP-based communication: **WORKS**

### Cleanup:
```bash
docker stop container1 container2
docker rm container1 container2
```

---

## Task 5: Custom Networks – Enable DNS Name Resolution

**Objective:** Create a custom bridge network with DNS support for container name resolution.

### Commands:

1. **Create a custom bridge network:**
   ```bash
   docker network create my-app-net
   ```
   **Explanation:** Creates a new bridge network named `my-app-net` with built-in DNS resolution.

2. **Verify the network was created:**
   ```bash
   docker network ls
   ```
   **Explanation:** Should show `my-app-net` in the list with driver "bridge".

3. **Inspect the custom network:**
   ```bash
   docker network inspect my-app-net
   ```
   **Explanation:** Shows details of the network (currently empty, no containers).

4. **Run first container on custom network:**
   ```bash
   docker run --name web-server -d --network my-app-net alpine sleep 1000
   ```
   **Explanation:**
   - `--network my-app-net` → Connects to custom network instead of default bridge
   - Custom networks automatically register container names with DNS

5. **Run second container on custom network:**
   ```bash
   docker run --name db-server -d --network my-app-net alpine sleep 1000
   ```

6. **Test ping by CONTAINER NAME (now works!):**
   ```bash
   docker exec -it web-server ping -c 2 db-server
   ```
   **Expected Result:** ✅ **WORKS** - Gets IP and sees responses. Custom network supports DNS name resolution!

7. **Test from the other direction:**
   ```bash
   docker exec -it db-server ping -c 2 web-server
   ```
   **Expected Result:** ✅ **WORKS** - Bidirectional name-based communication.

8. **Test by IP address (also works):**
   ```bash
   docker exec -it web-server ping -c 2 172.18.0.3
   ```
   **Expected Result:** ✅ **WORKS** - IP-based communication still works.

### Expected Result:
✅ **Container name-based communication: WORKS** on custom networks (unlike default bridge).

### Why Custom Networks Allow DNS Name Resolution:
- **Default bridge:** Uses old Docker daemon DNS that doesn't support container hostnames
- **Custom networks:** Use Docker's embedded DNS server (`127.0.0.11:53`) which registers each container name
- **Benefit:** Containers can discover each other by name, making apps easier to configure

### Cleanup:
```bash
docker stop web-server db-server
docker rm web-server db-server
docker network rm my-app-net
```

---

## Task 6: Put It Together – Database + App on Custom Network with Volume

**Objective:** Integrate volumes and networking by running a database and app container on the same custom network.

### Commands:

1. **Create a custom network:**
   ```bash
   docker network create app-network
   ```

2. **Create a named volume for database data:**
   ```bash
   docker volume create app-db-data
   ```
   **Explanation:** Ensures database data persists even if container is removed.

3. **Run Postgres database on custom network WITH volume:**
   ```bash
   docker run --name postgres-app -d --network app-network -e POSTGRES_PASSWORD=apppass -v app-db-data:/var/lib/postgresql/data postgres:latest
   ```
   **Explanation:**
   - `--network app-network` → Connects to custom network for DNS resolution
   - `-v app-db-data:/var/lib/postgresql/data` → Uses named volume for persistence
   - Container can be reached by name "postgres-app" from other containers on this network

4. **Wait for Postgres to initialize:**
   ```bash
   docker logs postgres-app
   ```

5. **Run a simple app container (we'll use alpine with psql to simulate an app):**
   ```bash
   docker run --name app-container -d --network app-network alpine sleep 3600
   ```
   **Explanation:** Runs a container on the same network. In a real scenario, this would be your application.

6. **Verify the app can reach the database BY NAME:**
   ```bash
   docker exec app-container wget -O- http://postgres-app:5432
   ```
   **Explanation:** 
   - This will fail with a connection message, but it proves DNS resolution works
   - Alternative test using exec bash:
   ```bash
   docker exec -it app-container sh -c "echo 'SELECT 1;' | nc postgres-app 5432"
   ```

7. **Better verification: Use psql client from app container:**
   ```bash
   docker exec app-container apk add --no-cache postgresql-client
   docker exec app-container psql -h postgres-app -U postgres -c "SELECT 1;"
   ```
   **Explanation:**
   - Installs PostgreSQL client in app container
   - `psql -h postgres-app -U postgres` → Connects to database using container name (DNS resolution)
   - If successful, returns "1" confirming connection works

8. **Create a test database from app container:**
   ```bash
   docker exec app-container psql -h postgres-app -U postgres -c "CREATE DATABASE appdata; \c appdata; CREATE TABLE logs (id SERIAL PRIMARY KEY, message VARCHAR(255)); INSERT INTO logs (message) VALUES ('Log entry from app');"
   ```

9. **Verify data persistence by stopping/restarting database:**
   ```bash
   docker stop postgres-app
   docker start postgres-app
   docker exec app-container psql -h postgres-app -U postgres -d appdata -c "SELECT * FROM logs;"
   ```
   **Expected Result:** ✅ Data still exists after container restart (volume persisted it).

10. **Clean up:**
    ```bash
    docker stop postgres-app app-container
    docker rm postgres-app app-container
    docker network rm app-network
    docker volume rm app-db-data
    ```

### Expected Result:
✅ **Full integration:** App container reaches database by name, data persists across container restarts.

### Key Takeaways:
- **Volumes:** Ensure data lives beyond container lifecycle
- **Custom Networks:** Enable service discovery by container name
- **Together:** Create production-like environments where microservices can communicate and share data

---

## Summary

| Task | Problem | Solution | Result |
|------|---------|----------|--------|
| **Task 1** | Data lost when container removed | No solution (demonstrates problem) | ❌ Data lost |
| **Task 2** | Data lost | Use named volumes | ✅ Data persists |
| **Task 3** | Live editing needed | Use bind mounts | ✅ Host directory synced |
| **Task 4** | Containers can't find each other by name | Use IP addresses on default bridge | ✅ IP works, names don't |
| **Task 5** | Need service discovery by name | Use custom bridge network | ✅ Names work! |
| **Task 6** | Real-world apps need persistence + networking | Volumes + custom network together | ✅ Production-ready! |

---

## Key Commands Reference

```bash
# Volumes
docker volume create <name>
docker volume ls
docker volume inspect <name>
docker volume rm <name>

# Bind Mounts
docker run -v /host/path:/container/path <image>

# Networks
docker network create <name>
docker network ls
docker network inspect <name>
docker run --network <name> <image>

# Container Execution
docker exec -it <container> <command>
docker logs <container>
docker stop <container>
docker rm <container>
```
