# GitHub Actions `uses:` Cheat Sheet
## Top 25 Most Common GitHub Actions

The `uses:` keyword tells GitHub Actions to use an existing action created by GitHub or the community.

Syntax:

```yaml
steps:
  - uses: owner/repository@version
```

Example:

```yaml
- uses: actions/checkout@v4
```

---

# 1. Checkout Repository

### Action
```yaml
uses: actions/checkout@v4
```

### Purpose
Downloads (checks out) your repository code into the runner.

Without this action, your workflow cannot access your project files.

Typical Use:
- Build
- Test
- Docker
- Terraform
- Kubernetes
- Node.js
- Java
- Python

---

# 2. Setup Node.js

### Action
```yaml
uses: actions/setup-node@v4
```

### Purpose
Installs Node.js on the runner.

Example:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
```

Used for:
- React
- Angular
- Vue
- Express
- Next.js

---

# 3. Setup Python

### Action
```yaml
uses: actions/setup-python@v5
```

### Purpose
Installs Python.

Example

```yaml
with:
  python-version: "3.12"
```

---

# 4. Setup Java

### Action
```yaml
uses: actions/setup-java@v4
```

### Purpose
Installs Java (JDK).

Supports:
- Maven
- Gradle
- Spring Boot

---

# 5. Setup .NET

### Action
```yaml
uses: actions/setup-dotnet@v4
```

### Purpose
Installs .NET SDK.

---

# 6. Setup Go

### Action
```yaml
uses: actions/setup-go@v5
```

### Purpose
Installs Go language.

---

# 7. Setup Ruby

### Action
```yaml
uses: ruby/setup-ruby@v1
```

### Purpose
Installs Ruby.

Mostly used for:
- Rails
- Fastlane

---

# 8. Setup PHP

### Action
```yaml
uses: shivammathur/setup-php@v2
```

### Purpose
Installs PHP.

Popular for:
- Laravel
- WordPress

---

# 9. Setup Terraform

### Action
```yaml
uses: hashicorp/setup-terraform@v3
```

### Purpose
Installs Terraform CLI.

Common commands:

```bash
terraform init
terraform plan
terraform apply
```

---

# 10. Configure AWS Credentials

### Action
```yaml
uses: aws-actions/configure-aws-credentials@v4
```

### Purpose
Authenticates GitHub Actions to AWS.

Example

```yaml
with:
  aws-region: us-east-1
```

---

# 11. Login to Amazon ECR

### Action
```yaml
uses: aws-actions/amazon-ecr-login@v2
```

### Purpose
Logs Docker into Amazon ECR.

---

# 12. Login to Azure

### Action
```yaml
uses: azure/login@v2
```

### Purpose
Authenticates GitHub Actions with Azure.

---

# 13. Login to Google Cloud

### Action
```yaml
uses: google-github-actions/auth@v2
```

### Purpose
Authenticates with Google Cloud.

---

# 14. Setup Docker Buildx

### Action
```yaml
uses: docker/setup-buildx-action@v3
```

### Purpose
Creates an advanced Docker builder.

Needed for:
- Multi-platform builds
- Faster caching

---

# 15. Login to Docker Hub

### Action
```yaml
uses: docker/login-action@v3
```

### Purpose
Logs into Docker Hub.

---

# 16. Build and Push Docker Image

### Action
```yaml
uses: docker/build-push-action@v6
```

### Purpose
Builds Docker images and pushes them to a registry.

---

# 17. Cache Dependencies

### Action
```yaml
uses: actions/cache@v4
```

### Purpose
Caches dependencies.

Examples:
- npm
- Maven
- Gradle
- pip
- Terraform plugins

Makes workflows much faster.

---

# 18. Upload Artifact

### Action
```yaml
uses: actions/upload-artifact@v4
```

### Purpose
Uploads files from the workflow.

Examples:
- Reports
- Logs
- Build outputs
- Test results

---

# 19. Download Artifact

### Action
```yaml
uses: actions/download-artifact@v4
```

### Purpose
Downloads artifacts uploaded by previous jobs.

---

# 20. GitHub Script

### Action
```yaml
uses: actions/github-script@v7
```

### Purpose
Runs JavaScript with GitHub API access.

Useful for:
- Creating issues
- Commenting on PRs
- Managing releases

---

# 21. Setup Kubectl

### Action
```yaml
uses: azure/setup-kubectl@v4
```

### Purpose
Installs kubectl.

Useful for deploying to Kubernetes.

---

# 22. Setup Helm

### Action
```yaml
uses: azure/setup-helm@v4
```

### Purpose
Installs Helm package manager.

Used for Kubernetes deployments.

---

# 23. Slack Notification

### Action
```yaml
uses: slackapi/slack-github-action@v2
```

### Purpose
Sends workflow notifications to Slack.

Examples:
- Build Success
- Build Failed
- Deployment Complete

---

# 24. SonarQube Scan

### Action
```yaml
uses: sonarsource/sonarqube-scan-action@v5
```

### Purpose
Runs SonarQube code quality analysis.

Checks:
- Bugs
- Security issues
- Code smells
- Coverage

---

# 25. CodeQL Analysis

### Action
```yaml
uses: github/codeql-action/analyze@v3
```

### Purpose
Runs GitHub CodeQL security scanning.

Finds:
- Vulnerabilities
- Security issues
- Unsafe code

---

# Quick Reference Table

| Action | Purpose |
|---------|---------|
| actions/checkout | Download repository |
| actions/setup-node | Install Node.js |
| actions/setup-python | Install Python |
| actions/setup-java | Install Java |
| actions/setup-dotnet | Install .NET |
| actions/setup-go | Install Go |
| ruby/setup-ruby | Install Ruby |
| shivammathur/setup-php | Install PHP |
| hashicorp/setup-terraform | Install Terraform |
| aws-actions/configure-aws-credentials | AWS Login |
| aws-actions/amazon-ecr-login | Login to ECR |
| azure/login | Azure Login |
| google-github-actions/auth | GCP Login |
| docker/setup-buildx-action | Docker Buildx |
| docker/login-action | Docker Login |
| docker/build-push-action | Build & Push Docker |
| actions/cache | Cache dependencies |
| actions/upload-artifact | Upload files |
| actions/download-artifact | Download files |
| actions/github-script | Run GitHub API scripts |
| azure/setup-kubectl | Install kubectl |
| azure/setup-helm | Install Helm |
| slackapi/slack-github-action | Slack notifications |
| sonarsource/sonarqube-scan-action | SonarQube Scan |
| github/codeql-action/analyze | Security Scan |

---

# Memory Trick

Think of `uses:` actions in these categories:

- 📦 Repository
  - checkout

- 💻 Programming Languages
  - Node
  - Python
  - Java
  - Go
  - .NET
  - PHP
  - Ruby

- ☁️ Cloud
  - AWS
  - Azure
  - GCP

- 🐳 Docker
  - Buildx
  - Login
  - Build & Push

- ☸ Kubernetes
  - kubectl
  - Helm

- ⚡ Performance
  - Cache

- 📁 Files
  - Upload Artifact
  - Download Artifact

- 🔒 Security
  - CodeQL
  - SonarQube

- 📢 Notifications
  - Slack

- 🤖 Automation
  - GitHub Script