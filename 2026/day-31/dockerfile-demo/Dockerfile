FROM ubuntu:24.04

RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY greeting.txt /app/greeting.txt

EXPOSE 8080

CMD ["cat", "/app/greeting.txt"]
