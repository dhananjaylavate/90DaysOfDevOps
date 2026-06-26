# Day 34: Advanced Multi-Container Architecture 🚀

This repository contains a production-simulated, multi-tier web application built using **Node.js (Express)**, **Redis**, and **PostgreSQL**, orchestrated entirely via **Docker Compose**. 

This project demonstrates advanced containerization concepts including explicit networking, named volume persistence, healthchecks, and strict service initialization orders.

---

## 🏗 Architecture Overview

The application stack consists of three dedicated services:

1.  **Frontend/API (`web`)**: A custom Node.js/Express application. It serves HTTP requests, interacts with Redis to increment page views, and pings the PostgreSQL database to verify connectivity.
2.  **Cache (`cache`)**: A Redis container running in-memory data structures to handle high-speed, low-latency tasks (like hit counting).
3.  **Database (`db`)**: A PostgreSQL relational database with a persistent volume to ensure data survives container restarts.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your host machine:
* [Docker](https://docs.docker.com/get-docker/) (v20.10+)
* [Docker Compose](https://docs.docker.com/compose/install/) (v2.x.x)

---

## 📂 Project Structure

```text
.
├── docker-compose.yml       # Infrastructure-as-Code for the entire stack
├── README.md                # Project documentation
└── app/
    ├── Dockerfile           # Instructions to build the Node.js image
    ├── package.json         # Node.js dependencies
    └── app.js               # Application source code