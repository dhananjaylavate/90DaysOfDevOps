# Day 14 - Networking Basics and OSI Layer

## 1. What a Network Actually Is?

- A network is just:
- Two or more devices
- Connected via cables, Wi-Fi, or virtual links
- Exchanging data in packets

- That data is broken into small chunks called packets, which travel independently and get reassembled at the destination.

---

## 2. The OSI Model (Open Systems Interconnection Model)

- The OSI Model (Open Systems Interconnection Model) is a conceptual framework used to understand how data travels from one computer to another over a network. 
- It breaks the entire networking process into 7 separate layers, where each layer has a specific job.

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

# 🚀 Hands-on Checklist

# 1. Identity 

**Command1**

```bash
hostname -I
```

**Output**

```text
ubuntu@Kartik:~/LinuxForDevOps/day14$ hostname -I
172.27.145.12
```

**Observation**
- System IP address identified successfully.
- Used to verify local network configuration.

**Command2**

```bash
ip addr show

```
**Output**
```text

ubuntu@Kartik:~/LinuxForDevOps/day14$ ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet 10.255.255.254/32 brd 10.255.255.254 scope global lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 00:15:5d:dc:64:25 brd ff:ff:ff:ff:ff:ff
    inet 172.27.145.12/20 brd 172.27.159.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::215:5dff:fedc:6425/64 scope link
       valid_lft forever preferred_lft forever
```

**Observation**

- This command shows: **All network interfaces + their IP addresses on your machine**

1. Loopback Interface (lo) : ```1: lo: <LOOPBACK,UP,LOWER_UP>```

2. Ethernet / Network Interface (eth0) : ```2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>``` This is your real network connection 

```ip addr show``` reveals how your machine identifies itself locally and on the network — including loopback (self), private IP (network), and MAC address (hardware identity).


# 2. Reachability

**Command**

```bash
ping -c 4 google.com
```

**Output**

```text
ubuntu@Kartik:~/LinuxForDevOps/day14$ ping -c 4 google.com
PING google.com (142.251.30.139) 56(84) bytes of data.
64 bytes from sv-in-f139.1e100.net (142.251.30.139): icmp_seq=1 ttl=111 time=74.6 ms
64 bytes from sv-in-f139.1e100.net (142.251.30.139): icmp_seq=2 ttl=111 time=17.8 ms
64 bytes from sv-in-f139.1e100.net (142.251.30.139): icmp_seq=3 ttl=111 time=20.8 ms
64 bytes from sv-in-f139.1e100.net (142.251.30.139): icmp_seq=4 ttl=111 time=22.4 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3018ms
rtt min/avg/max/mdev = 17.764/33.900/74.587/23.550 ms
```

**Observation**
- You sent 4 packets & You received all 4 back
- 0% packet loss
- Avg Latency : 33.900 
- Average round-trip time is ~34 ms
- So network is stable (no loss)


# 3. Path Analysis

**Command**

```bash
traceroute google.com
```

**Output**

```text
ubuntu@Kartik:~/LinuxForDevOps/day14$ traceroute google.com
traceroute to google.com (142.250.151.101), 30 hops max, 60 byte packets
 1  Kartik.mshome.net (172.27.144.1)  0.727 ms  0.733 ms  0.724 ms
 2  192.168.0.1 (192.168.0.1)  3.416 ms  3.355 ms  3.312 ms
 3  * * *
 4  80.255.198.222 (80.255.198.222)  16.828 ms  17.035 ms  16.994 ms
 5  * * *
 6  80.255.204.85 (80.255.204.85)  27.721 ms  15.202 ms  22.795 ms
 7  host-213-104-85.174.not-set-yet.virginmedia.net (213.104.85.174)  18.128 ms  17.153 ms  25.102 ms
 8  * * *
 9  216.239.41.240 (216.239.41.240)  26.259 ms 108.170.234.220 (108.170.234.220)  25.727 ms 209.85.252.180 (209.85.252.180)  26.840 ms
10  172.253.73.196 (172.253.73.196)  19.778 ms 172.253.64.176 (172.253.64.176)  24.029 ms 172.253.74.128 (172.253.74.128)  16.429 ms
11  * * *
12  * * *
13  * * *
14  * * *
15  * * *
16  * * *
17  * * st-in-f101.1e100.net (142.250.151.101)  21.054 ms
```

**Observation**
- All the hops (routers) your packet passes through to reach Google.
- Each line = one router in the path.

```
[You]
   ↓
172.27.144.1 (VM/Host) -- Your Machine
   ↓
192.168.0.1 (Router) -- Your Network IP(Virgin media wifi ip)
   ↓
ISP Backbone (Virgin Media)
   ↓
Internet Routers (hidden hops)
   ↓
Google Backbone
   ↓
Google Server ✅

```
**Why * * * happens**

**Routers may ignore traceroute because:**

- Firewall blocks ICMP replies
- Security hardening
- Rate limiting
- Cloud provider protection
👉 It does NOT mean failure

**Key Takeaway**

```traceroute``` shows the internet path, not just the destination — revealing how your request travels through routers, ISPs, and cloud backbone networks before reaching Google.