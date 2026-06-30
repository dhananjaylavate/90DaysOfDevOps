# Day 39 – CI/CD Concepts

# What is CI/CD?

CI/CD is a software development practice that automates building, testing, and deploying applications. It helps teams deliver software faster, more reliably, and with fewer human errors.

---

# Task 1: The Problem

## 1. What can go wrong?

When five developers work on the same project and manually deploy to production:

- Code conflicts can occur.
- One developer may overwrite another's changes.
- Bugs may reach production because testing is inconsistent.
- Deployments may be forgotten or done incorrectly.
- Different developers may use different environments.
- Rollbacks become difficult if something breaks.
- Human error increases with every manual deployment.

---

## 2. What does "It works on my machine" mean?

"It works on my machine" means the application runs correctly on a developer's computer but fails on another developer's machine or in production.

This happens because of differences in:

- Operating systems
- Installed software versions
- Environment variables
- Dependencies
- Configuration files

CI helps solve this by testing code in a clean, consistent environment.

---

## 3. How many times a day can a team safely deploy manually?

Manual deployments are slow and risky.

Most teams can safely perform only a few manual deployments each day because every deployment requires careful coordination and human effort.

With CI/CD automation, teams can deploy dozens or even hundreds of times per day.

---

# Task 2: CI vs CD

## Continuous Integration (CI)

Continuous Integration is the practice of automatically building and testing code whenever developers push changes to a shared repository.

It catches bugs, build failures, and integration issues early before they reach production.

**Example:**

A developer pushes code to GitHub, and GitHub Actions automatically runs unit tests and checks code formatting.

---

## Continuous Delivery (CD)

Continuous Delivery automatically prepares software for release after it passes all tests.

The application is always deployment-ready, but a human decides when to deploy it to production.

**Example:**

After passing tests, a Docker image is built and uploaded to a registry. A release manager clicks a button to deploy it.

---

## Continuous Deployment (CD)

Continuous Deployment goes one step further by automatically deploying every successful change to production without manual approval.

Only fully tested code reaches users.

**Example:**

A company like Netflix automatically deploys every successful build after all automated tests pass.

---

# Task 3: Pipeline Anatomy

## Trigger

An event that starts the pipeline.

Examples:
- Push
- Pull Request
- Tag
- Schedule
- Manual run

---

## Stage

A logical group of related jobs.

Common stages:

- Build
- Test
- Deploy

---

## Job

A collection of steps executed on the same runner.

Examples:

- Run unit tests
- Build Docker image
- Deploy application

---

## Step

A single command or action inside a job.

Examples:

- Checkout code
- Install dependencies
- Run tests
- Build Docker image

---

## Runner

The machine that executes pipeline jobs.

Examples:

- GitHub-hosted runner
- Self-hosted runner
- Jenkins agent

---

## Artifact

A file or package produced by a job that can be used later.

Examples:

- Docker image
- Compiled application
- ZIP package
- Test reports
- Coverage reports

---

# Task 4: Pipeline Diagram

```text
        Developer
            │
            │ Push Code
            ▼
      GitHub Repository
            │
            ▼
      Trigger Pipeline
            │
            ▼
+-------------------------+
| Stage 1 : Build         |
|-------------------------|
| Checkout Code           |
| Install Dependencies    |
| Build Application       |
+-------------------------+
            │
            ▼
+-------------------------+
| Stage 2 : Test          |
|-------------------------|
| Run Unit Tests          |
| Run Lint Checks         |
| Generate Reports        |
+-------------------------+
            │
            ▼
+-------------------------+
| Stage 3 : Package       |
|-------------------------|
| Build Docker Image      |
| Push Image to Registry  |
+-------------------------+
            │
            ▼
+-------------------------+
| Stage 4 : Deploy        |
|-------------------------|
| Deploy to Staging       |
| Health Check            |
+-------------------------+
            │
            ▼
     Staging Environment
```

---

# Task 5: Explore in the Wild

## Repository Chosen

**FastAPI**

Workflow folder:

```
.github/workflows/
```

Workflow inspected:

```
ci.yml
```

### What triggers it?

- Push events
- Pull requests

---

### How many jobs does it have?

It contains multiple jobs that run across different Python versions and operating systems.

---

### What does it do?

The workflow:

- Checks out the repository
- Installs Python
- Installs dependencies
- Runs formatting checks
- Runs linting
- Executes tests
- Verifies the project builds successfully

Its purpose is to ensure every code change is validated before being merged.

---

# Key Takeaways

- CI/CD is a development practice, not just a tool.
- CI automatically builds and tests every code change.
- Continuous Delivery keeps software ready for deployment.
- Continuous Deployment automatically releases successful changes.
- Pipelines reduce human error and improve software quality.
- A failed pipeline is useful because it prevents broken code from reaching users.