### Created 3 apps for  practising the tasks from README.md

## Task 1: The Problem with Large Images

app-single-stage

- created a simple node js app and built it using Dockerfile node:20 image and verified the Image size

## Task 2: Multi-Stage Build

app-multi-stage

- created a simple node js app and built it using Dockerfile node:20 image and verified the image size, could not see much difference as I copying the whole ./app to my image destination, for this app which is not recommended, hence created an my-react-app

my-react-app

- create a simple react js app and built it using Docker multi-stage file. 
- In first stage build the app
- In 2nd stage just copied the builded output to nginx `COPY --from=builder /app/dist /usr/share/nginx/html`

## Task 3: Push to Docker Hub

- Created an account on docker hub
- At terminal `docker login` shows the username
    
   - `docker tag LOCAL_IMAGE_NAME DOCKERHUB_USERNAME/IMAGE_NAME:TAG`
    
   - `docker tag myreactapp:latest dhananjaylavate/myreactapp:v1`


## Task 5: Image Best Practices

- Run as non-root user (best practice)

    -  `RUN addgroup -S appgroup && adduser -S appuser -G appgroup`


    - `USER appuser`


