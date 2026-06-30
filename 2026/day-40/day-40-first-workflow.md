# Day 40 – First GitHub Actions Workflow

## 🚀 Objective
Today I created my first GitHub Actions workflow and learned how CI/CD runs code automatically in the cloud whenever I push changes to GitHub.

This helped me understand how automation replaces manual execution in modern DevOps workflows.

---

## 📄 Workflow File

### `.github/workflows/hello.yml`

```yaml
name: Hello Workflow

on:
  push:

jobs:
  greet:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Print Hello from GitHub Actions
        run: echo "Hello from GitHub Actions!"

      - name: Print current date and time
        run: date

      - name: Print formatted date and time
        run: date +"%Y-%m-%d %H:%M:%S"

      - name: Print branch name
        run: echo "Branch: ${{ github.ref_name }}"

      - name: List files in repo
        run: ls -a

      - name: Print runner operating system
        run: echo "Runner OS: ${{ runner.os }}"

```

🧠 Explanation of Workflow
🔹 What is GitHub Actions?

GitHub Actions is a CI/CD tool that runs workflows automatically when certain events happen (like push, pull request, etc.).

🔹 on:
on:
  push:

👉 This defines the trigger for the workflow.
It means: Run this workflow every time code is pushed to the repository.

🔹 jobs:
jobs:
  greet:

👉 A job is a group of steps that run together on the same machine.
Here we have one job named greet.

🔹 runs-on:
runs-on: ubuntu-latest

👉 This tells GitHub which operating system to use for running the job.
Here we are using a Linux machine (Ubuntu).

🔹 steps:

👉 Steps are individual tasks executed one by one inside a job.

🔹 uses:
uses: actions/checkout@v4

👉 This downloads your repository code into the runner machine so that workflows can access it.

🔹 run:
run: echo "Hello from GitHub Actions!"

👉 This executes shell commands directly on the runner.

🔹 name:

👉 This gives a readable label to each step so it is easy to understand in GitHub Actions logs.

🧪 What I learned from this workflow

- How automation runs in GitHub Actions
- How workflows are triggered automatically on push
- How jobs and steps work together
- How to run shell commands in CI/CD pipelines
- How to use GitHub built-in variables like:
- ${{ github.ref_name }} → shows branch name
- ${{ runner.os }} → shows operating system
- How code runs in a cloud-based Linux machine



