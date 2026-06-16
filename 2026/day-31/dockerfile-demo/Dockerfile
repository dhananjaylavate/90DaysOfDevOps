#Step 1 - Get the base Image
FROM ubuntu:latest

#Step 2 -  Create Working Directory
WORKDIR /app

#Step 3 - Install dependencies required for the application
RUN apt-get update && apt-get install -y curl

#Step 4 - Copy the application files into the container working directory

COPY greeting.txt /app/greeting.txt

#Step 5 - Expose the port on which the application will run

EXPOSE 8080

#Step 6 - Set the detault command to run the application whent the container starts.

CMD ["cat", "/app/greeting.txt"]