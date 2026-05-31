## Day 15 - Understand how DNS resolves names to IPs

The Domain Name System (**DNS**) is the "phonebook of the Internet". 
It translates human-readable domain names (e.g., `google.com`) into machine-readable IP addresses `(e.g., 192.0.2.1)`. 

Computers connect to each other using numbers, so DNS makes browsing the web user-friendly.

## Task 1. How DNS Resolves Names to IPs

When you type a web address into your browser, a highly structured sequence of events takes place to locate the correct server.

**The Short DNS Flow**

- 📥 Request: You type a URL `google.com`
- 🔍 Cache: Your device checks local memory first.
- 🔄 Resolver: If missing, your ISP server takes over.
- 🌐 Root: The resolver asks Root where the TLD is.
- 🏷️ TLD: The resolver asks .com (or similar) where the domain lives.
- 🔑 Authoritative: The domain's nameserver gives the final IP.
- 🖥️ Connect: The resolver hands the IP to your browser.
- 🌐 Load: The website opens.

## DNS Record Types

### A Record
Maps a domain name to an IPv4 address.

### AAAA Record
Maps a domain name to an IPv6 address.

### CNAME Record
Creates an alias from one domain name to another domain name.

### MX Record
Specifies the mail servers responsible for receiving emails for a domain.

### NS Record
Identifies the authoritative name servers for a domain.

## `dig` Command

### Command

```bash
dig google.com
```

### Sample Output (Relevant Section)

```text
;; ANSWER SECTION:
google.com.    300    IN    A    142.250.187.14
```

### Identify the A Record

- A Record: `142.250.187.14`

### Identify the TTL

- TTL: `300` seconds

### Understanding the Output

```text
google.com.    300    IN    A    142.250.187.14
│              │           │
│              │           └── IPv4 Address (A Record)
│              └────────────── TTL (seconds)
└───────────────────────────── Domain Name
```

---

## Note

The exact IP address and TTL may vary depending on your location, DNS resolver, and the time the query is executed. 

Run the command below on your machine and record the actual values from the ANSWER SECTION:

```bash
dig google.com
```
---

## Task 2.  IP addressing (IPv4, public vs private)

An IP address (Internet Protocol address) is a unique label assigned to every device connected to a network. 

It ensures that data packets find the correct destination, similar to a physical mailing address

**IPv4 Structure**

- IPv4 uses a 32-bit format, which creates roughly 4.3 billion unique addresses.
- The Format: Written in "dotted-decimal" notation `(e.g., 192.168.1.1)`.
- The Blocks: Divided into four 8-bit numbers called octets.
- The Range: Each octet ranges from 0 to 255 `(e.g., 0.0.0.0 to 255.255.255.255)`.
- The Parts: Contains a Network ID (identifies the specific network) and a Host ID (identifies the specific device on that network).

**Public vs. Private IP Addresses**

| Feature | Private IP Address | Public IP Address |
|----------|-------------------|------------------|
| Scope | Internal (local network only) | External (global internet) |
| Visibility | Hidden from the internet | Visible to the entire world |
| Uniqueness | Unique only within your local network | Unique across the entire internet |
| Cost | Completely free to use | Usually assigned/leased by an ISP |
| Routing | Cannot be routed over the public internet | Fully routable across global routers |

## Private IP Ranges

These ranges are reserved for internal networks:

- `10.0.0.0` → `10.255.255.255`
- `172.16.0.0` → `172.31.255.255`
- `192.168.0.0` → `192.168.255.255`


## Identify Your IP Addresses (From `ip addr show`)

### Observed Output
From the `eth0` interface:

```
inet 172.27.145.12/20
```

From the `lo` (loopback) interface:

```
inet 127.0.0.1/8
inet 10.255.255.254/32
```
## Analysis

### Primary Private IP (eth0)
- **IP Address:** `172.27.145.12`
- This is your machine’s main network IP
- It is used for communication within your private network

### Loopback Interface (lo)
- `127.0.0.1` → Standard loopback address (your own machine)
- `10.255.255.254` → Also a private IP assigned to loopback in your environment (virtual routing/internal setup)

## Are these Private IPs?

Yes — all of the following are private/internal:

- `172.27.145.12` → Private IP (belongs to 172.16.0.0 – 172.31.255.255 range)
- `10.255.255.254` → Private IP (10.0.0.0 – 10.255.255.255 range)
- `127.0.0.1` → Loopback (special internal testing address)

## Key Observation

Your system is running in a **virtualized or cloud-like environment**, which is why:

- Your main IP is in the **172.27.x.x range**
- This is common in:
  - WSL (Windows Subsystem for Linux)
  - Docker networks
  - Cloud VMs (AWS/Azure internal networking)

## Final Summary

- Your active interface: `eth0`
- Your working private IP: `172.27.145.12`
- Loopback is used for internal self-communication
- All observed IPs are non-public (private/internal)

---

# Task 3: CIDR & Subnetting
    
## What does `/24` mean in `192.168.1.0/24`?

`/24` means that the first **24 bits are fixed as the network portion**, and the remaining **8 bits are available for host addresses**.

- IPv4 address = 32 bits total
- `/24` → 24 bits network + 8 bits host
- This defines a subnet with **256** total IP addresses
# Usable Hosts in Different Subnets (with IP Ranges)

---

## /24 Subnet

- Example Network: `192.168.1.0/24`
- Subnet Mask: `255.255.255.0`

### IP Range
- Network Address: `192.168.1.0`
- Usable Hosts: `192.168.1.1 – 192.168.1.254`
- Broadcast Address: `192.168.1.255`

### Summary
- Total IPs: 256  
- Usable Hosts: 254  

---

## /16 Subnet

- Example Network: `10.0.0.0/16`
- Subnet Mask: `255.255.0.0`

### IP Range
- Network Address: `10.0.0.0`
- Usable Hosts: `10.0.0.1 – 10.0.255.254`
- Broadcast Address: `10.0.255.255`

### Summary
- Total IPs: 65,536  
- Usable Hosts: 65,534  

---

## /28 Subnet

- Example Network: `192.168.1.0/28`
- Subnet Mask: `255.255.255.240`

### IP Range
- Network Address: `192.168.1.0`
- Usable Hosts: `192.168.1.1 – 192.168.1.14`
- Broadcast Address: `192.168.1.15`

### Summary
- Total IPs: 16  
- Usable Hosts: 14  

## Why Do We Subnet?

Subnetting is used to divide a large network into smaller, manageable networks.

### Key reasons:

- **Efficient IP usage** → avoid wasting IP addresses
- **Better security** → isolate network segments
- **Improved performance** → smaller broadcast domains
- **Easier management** → organize networks by teams/services
- **Scalability** → easier to grow infrastructure

---

## Quick CIDR Table

| CIDR | Subnet Mask         | Total IPs | Usable Hosts |
|------|---------------------|------------|--------------|
| /24  | 255.255.255.0       | 256        | 254          |
| /16  | 255.255.0.0         | 65,536     | 65,534       |
| /28  | 255.255.255.240     | 16         | 14           |

## Key Formula

```
Total IPs = 2^(32 - CIDR)
Usable Hosts = Total IPs - 2
```
## Example Breakdown

### /28 example:
- 32 - 28 = 4 host bits
- 2^4 = 16 total IPs
- 16 - 2 = 14 usable hosts

---

# Task 4: Ports – The Doors to Services

## What is a Port?

A **port** is a logical communication endpoint used by operating systems to identify specific services running on a machine.

### Why do we need ports?

- A single machine can run multiple services
- IP address identifies the machine
- Port number identifies the specific service on that machine

👉 Think of it like:
- IP Address = Building address
- Port = Apartment number inside the building

## Common Ports and Services

| Port  | Service        |
|------|----------------|
| 22   | SSH (Secure Shell) |
| 80   | HTTP (Web traffic) |
| 443  | HTTPS (Secure web traffic) |
| 53   | DNS (Domain Name System) |
| 3306 | MySQL Database |
| 6379 | Redis Cache |
| 27017 | MongoDB Database |

## Checking Listening Ports

### Command:
```bash
ss -tulpn
```
## Understanding Output

Example output snippet:
```text
LISTEN 0 128 0.0.0.0:22
LISTEN 0 511 0.0.0.0:80
```
## Match Ports to Services (Example Interpretation)

From a typical Linux system:

- **Port 22**
  - Service: SSH
  - Used for remote server login

- **Port 80**
  - Service: HTTP
  - Used for serving web pages

---

## How to Identify Services in Your Output

Look for lines like:

```text
LISTEN 0 128 0.0.0.0:22 users:(("sshd",pid=1234))
```

Interpretation:
- `22` → Port number
- `sshd` → Service name (SSH daemon)

## Key Takeaway

- Ports allow multiple services on one machine
- Without ports, only one service could run per IP
- DevOps engineers use `ss -tulpn` daily to debug services

## Quick Mental Model

- IP = machine
- Port = service inside machine
- Process = actual program using that port

---

# Task 5: Putting It Together

---

## 1. You run `curl http://myapp.com:8080` — what networking concepts are involved?

This request involves **DNS resolution** to convert `myapp.com` into an IP address. Then a **TCP connection** is established to port `8080` on the server. Finally, the **HTTP protocol (Application layer)** is used to send the request and receive a response.

---

## 2. Your app can't reach a database at `10.0.1.50:3306` — what would you check first?

First, I would check **network connectivity** using `ping 10.0.1.50` and verify if the host is reachable. Then I would check if the **MySQL service is running and listening on port 3306** using `ss -tulpn`. Finally, I would inspect **firewall rules and security groups** that might be blocking access to that port.

---

## Key Thinking Approach

When troubleshooting:
- Start with **network reachability (IP layer)**
- Then check **port/service availability (Transport layer)**
- Finally verify **application/service health (Application layer)**

---

# IPv4 vs IPv6

## IPv4
- 32-bit addressing system
- Written in decimal format (e.g. `192.168.1.10`)
- Supports ~4.3 billion addresses
- Most widely used in current networks

## IPv6
- 128-bit addressing system
- Written in hexadecimal format (e.g. `2001:db8::1`)
- Supports a massive number of addresses
- Designed to replace IPv4
- Mostly used in IOT, CDNs, AWS, Google

## Why IPv6 Was Introduced

# IPv4 addresses are running out due to:

- Growth of the internet
- Mobile devices
- Cloud infrastructure
- IoT devices

**IPv6 solves this by providing a massive address space.**

# Examples

- inet `172.27.145.12`  -- **(IPv4)**
- inet6 `fe80::215:5dff` -- **(IPv6)**

## Key Difference
IPv4 has limited addresses and uses NAT to cope, while IPv6 was introduced to solve address exhaustion with a much larger address space.