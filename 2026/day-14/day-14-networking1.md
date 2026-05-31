# Day 14 - Networking Basics and OSI Layer

# 🌐 1. What a Network Actually Is

A network is simply:

> 🧠 A group of devices connected so they can talk to each other.

---

## 📌 Examples:

- Your laptop ↔ router  
- Your phone ↔ Wi-Fi  
- Servers ↔ other servers  
- Your device ↔ Google  

---

## 🔗 They can be connected using:

- 🔌 Cables (Ethernet)  
- 📶 Wi-Fi (wireless signals)  
- ☁️ Virtual links (cloud networks like AWS)  

---

## 2. The OSI Model (Open Systems Interconnection Model)

**The OSI Model (Open Systems Interconnection Model) is a conceptual framework used to understand how data travels from one computer to another over a network**

**It breaks the entire networking process into 7 separate layers, where each layer has a specific job.**

- Application
- Presentation
- Session
- Transport
- Network
- Data Link
- Physical

# 🌐 What Happens When You Open Google (OSI Model Real-World Example)

This document explains what happens behind the scenes when you type `www.google.com` in your browser and press Enter, mapped to the **OSI Model (7 Layers)**.

---

# 🧠 Scenario Overview

When you open Google, your computer performs multiple networking steps in milliseconds to fetch and display the webpage.

---

# 🌐 Step-by-Step OSI Model Breakdown

---

## 7. Application Layer (Layer 7)

You interact with the browser (Chrome, Edge, Firefox).

- You type: `www.google.com`
- Browser understands user request
- Creates an HTTP/HTTPS request

👉 Meaning:
You are requesting a webpage.

---

## 6. Presentation Layer (Layer 6)

Data is prepared for secure transmission.

- Data formatting happens
- Encryption is applied using **HTTPS (TLS/SSL)**

👉 Meaning:
Data is encrypted so no one can read it during transmission.

---

## 5. Session Layer (Layer 5)

A communication session is established.

- Connection between your computer and server is created
- Session is maintained while browsing

👉 Meaning:
Keeps communication active until you close the browser/tab.

---

## 4. Transport Layer (Layer 4)

Ensures reliable data delivery.

- Data is broken into segments
- TCP protocol is used (reliable delivery)
- Lost packets are retransmitted

👉 Meaning:
Ensures all data arrives correctly and in order.

---

## 3. Network Layer (Layer 3)

Handles routing and IP addressing.

- DNS converts `google.com` → IP address (e.g., 142.250.x.x)
- Routers decide best path for data packets

👉 Meaning:
Finds the correct destination across the internet.

---

## 2. Data Link Layer (Layer 2)

Handles local network communication.

- Data is framed
- MAC addresses are used
- Communication between device and router

👉 Meaning:
Delivers data within your local network (Wi-Fi/Ethernet).

---

## 1. Physical Layer (Layer 1)

Actual transmission of data happens.

- Data becomes electrical signals / radio waves / light signals
- Sent via cables, fiber optics, or Wi-Fi

👉 Meaning:
Raw 0s and 1s travel through physical medium.

---

# 🌍 Server Side (Google)

The request reaches Google servers  
(operated by :contentReference[oaicite:0]{index=0})

- Server processes your request
- Generates response (HTML, CSS, JS)
- Sends data back through the same layers in reverse

---

# 🔁 Reverse Process (Receiving Data)

When response comes back:

1. Physical signals → bits
2. Data Link → frames processed
3. Network → routing removed
4. Transport → segments reassembled (TCP)
5. Session → connection maintained
6. Presentation → decrypted (HTTPS)
7. Application → browser renders page

---

# 📦 Final Output

Your browser displays:

👉 Google homepage

---

# 🧩 Simple Summary

Opening Google involves:

- Request creation (Application Layer)
- Encryption (Presentation Layer)
- Session establishment (Session Layer)
- Reliable transfer via TCP (Transport Layer)
- Routing via IP (Network Layer)
- Local delivery via MAC/Wi-Fi (Data Link Layer)
- Physical transmission via signals (Physical Layer)

---

# 💡 One-Line Understanding

> Opening Google is your computer sending a structured, encrypted request through 7 networking layers, and receiving a response that is rebuilt into a webpage.

---

# 🚀 Key Takeaway

The OSI model helps us understand:

- How data travels across networks
- How different devices communicate
- How complex networking is broken into simple layers

---


---

# 💡 Key Insight

> `curl https://www.google.com` is not “just a command” — it is a full OSI stack in action, from Application layer down to Physical transmission and back up again.

---