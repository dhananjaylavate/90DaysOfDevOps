# Day 25 Notes — Git Reset vs Revert & Branching Strategies - Date : 6th - June - 2026

## ✅ Overview
Master **undoing mistakes safely** and understand **branching strategies** used by engineering teams at scale.

---

## 🔙 Task 1: Git Reset — Understanding the Three Modes

### What is `git reset`?
`git reset` moves the `HEAD` pointer to a previous commit, optionally discarding or preserving changes.

---

### Mode 1: `git reset --soft`

**What happens:**
- `HEAD` moves to the target commit
- Staging area is updated to match that commit
- **Working directory is NOT changed** — your modified files remain

**Use case:** You want to undo commits but keep changes staged, ready to recommit differently.

```bash
git reset --soft HEAD~1
```

**Example:**
```bash
# After reset --soft
# Your changes are still there, staged and ready to recommit
git status
# On branch main
# Changes to be committed:
#   modified: file.txt
```

---

### Mode 2: `git reset --mixed` (Default)

**What happens:**
- `HEAD` moves to the target commit
- Staging area is updated to match that commit
- **Working directory is NOT changed** — modified files remain, but are **unstaged**

**Use case:** You want to undo commits and unstage changes so you can selectively re-add them.

```bash
git reset --mixed HEAD~1
# or simply:
git reset HEAD~1
```

**Example:**
```bash
# After reset --mixed
# Your changes are still there, but unstaged
git status
# On branch main
# Changes not staged for commit:
#   modified: file.txt
```

---

### Mode 3: `git reset --hard` ⚠️ DESTRUCTIVE

**What happens:**
- `HEAD` moves to the target commit
- Staging area is updated to match that commit
- **Working directory IS changed** — all uncommitted changes are **discarded**

**Use case:** You want to completely undo commits and lose all local changes (dangerous!).

```bash
git reset --hard HEAD~1
```

**Example:**
```bash
# After reset --hard
# Your uncommitted changes are gone forever!
git status
# On branch main
# nothing to commit, working tree clean
```

---

### 🎯 Key Differences: Soft vs Mixed vs Hard

| Mode | HEAD | Staging Area | Working Directory | Safe? |
|------|------|--------------|-------------------|-------|
| `--soft` | Moves | Updated | Unchanged | ✅ Yes |
| `--mixed` | Moves | Updated | Unchanged | ✅ Yes |
| `--hard` | Moves | Updated | **Discarded** | ⚠️ No |

---

### ⚠️ Which is Destructive and Why?

**`git reset --hard` is destructive** because it permanently deletes uncommitted changes in your working directory. You cannot recover them unless they were previously committed.

---

### 📋 When to Use Each

- **`--soft`:** Redo your last commit with different changes (keep everything staged)
- **`--mixed`:** Undo commits and pick-and-choose what to re-stage
- **`--hard`:** Completely discard all changes and go back to a clean state (use with caution!)

---

### ⚡ Should You Use `git reset` on Pushed Commits?

**Short answer: NO, never on shared branches.**

**Why:**
- `git reset` rewrites history
- Others who pulled those commits will have conflicts
- Their local history won't match the remote

**Safe alternative:** Use `git revert` for shared branches (see Task 2).

**When reset is OK:**
- On local-only branches (not yet pushed)
- On your personal fork before pushing

---

## 🔄 Task 2: Git Revert — The Safe Way to Undo

### What is `git revert`?

`git revert` creates a **new commit** that undoes the changes from a previous commit. It **does NOT rewrite history**.

```bash
git revert <commit-hash>
```

---

### How it Works

1. You specify a commit to revert
2. Git creates a **new commit** that reverses those changes
3. The original commit **stays in history**
4. The new commit is added to the top

**Example:**

```bash
# Current history:
# commit C (HEAD)
# commit B
# commit A

git revert B
# Result:
# commit C' (new, with B's changes reversed)
# commit C
# commit B
# commit A
```

---

### ✅ Is Commit Y Still in History?

**Yes!** When you revert commit Y, commit Y remains in the history. A **new commit** is created that reverses Y's changes.

```bash
git log --oneline
# c9f3e2c Revert commit Y
# 4b2a1d1 commit Z
# 7e5f8c0 commit Y
# 9a3d2f1 commit X
```

---

### 🤝 Why Revert is Safer for Shared Branches

- `git revert` **preserves history** — no rewrites, no surprises
- Everyone who pulled the original commit can still see it
- Safe to use on branches others depend on
- Can be easily reverted again if needed

---

### 🔀 When to Use Revert vs Reset

- **Use `reset`:** On local-only branches, before pushing
- **Use `revert`:** On shared/pushed branches, in production code

---

## 📊 Task 3: Reset vs Revert Comparison

| | `git reset` | `git revert` |
|---|---|---|
| **What it does** | Moves `HEAD` to previous commit | Creates new commit that undoes changes |
| **Removes commit from history?** | Yes — history is rewritten | No — original commit stays |
| **Safe for shared/pushed branches?** | ❌ No (rewrites history) | ✅ Yes (preserves history) |
| **When to use** | Local branches before push | Shared/production branches |
| **Undoing the undo** | Difficult (`git reflog` helps) | Easy (`git revert <commit>`) |
| **Performance** | Fast | Slightly slower (creates commit) |

---

## 🌳 Task 4: Branching Strategies

### Strategy 1: GitFlow

**Overview:**
GitFlow uses multiple long-lived branches for different purposes. It's structured and suitable for scheduled releases.

**Branches:**
- `main` — production-ready code (stable)
- `develop` — integration branch (pre-release)
- `feature/*` — new features (from `develop`)
- `release/*` — release preparation (from `develop`)
- `hotfix/*` — urgent production fixes (from `main`)

**Flow Diagram:**
```
        main (v1.0)
         ↑    ↑
         |    |
      hotfix  release/1.0
         |    ↓
    -----+----+-----develop
         |         /  |  \
       feature/A  /   |   \  feature/B
                 /    |    \
```

**When used:**
- Large teams with formal release cycles
- Enterprise applications
- Examples: Git, Android OS, large open-source projects

**Pros:**
- ✅ Clear separation of concerns
- ✅ Easy to manage multiple versions in parallel
- ✅ Hotfixes isolated from ongoing development

**Cons:**
- ❌ Complex (many branch types)
- ❌ Slower release cycle
- ❌ Overhead for small teams

---

### Strategy 2: GitHub Flow

**Overview:**
GitHub Flow is simple and continuous. One main branch, short-lived feature branches, and pull requests.

**Branches:**
- `main` — always deployable
- `feature/<name>` — short-lived feature branches (from `main`)
- Pull Request → Code Review → Merge → Deploy

**Flow Diagram:**
```
        main (always ready to deploy)
         ↑       ↑       ↑
         |       |       |
      PR3     PR2      PR1
       |       |        |
    feature-C feature-B feature-A
```

**When used:**
- Startups and fast-moving teams
- Continuous deployment environments
- Examples: GitHub itself, many modern SaaS products

**Pros:**
- ✅ Simple to understand and implement
- ✅ Fast feedback loop
- ✅ Continuous deployment friendly

**Cons:**
- ❌ Requires discipline (main must always be deployable)
- ❌ No long-term support for older versions
- ❌ Hard to manage multiple active releases

---

### Strategy 3: Trunk-Based Development

**Overview:**
Everyone commits directly to the main trunk (`main` or `trunk`). Feature branches are extremely short-lived (hours, not days).

**Branches:**
- `main` — single source of truth
- `feature/<name>` — short-lived (1-2 days max)
- Feature flags control new code visibility

**Flow Diagram:**
```
main ●─●─●─●─●─●─●─●─●─●─●─●
      ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
   (rapid commits)
```

**When used:**
- High-velocity teams (Google, Netflix, Facebook)
- CI/CD-heavy workflows
- Large-scale distributed development

**Pros:**
- ✅ Minimal merge conflicts
- ✅ Forces small, reviewable commits
- ✅ Continuous integration friendly

**Cons:**
- ❌ Requires excellent test coverage
- ❌ High discipline required
- ❌ Hard for inexperienced teams

---

### 🎯 Answering the Strategy Questions

**Q: Which strategy for a startup shipping fast?**
- **Answer:** GitHub Flow — simple, fast, continuous deployment.

**Q: Which strategy for a large team with scheduled releases?**
- **Answer:** GitFlow — structured, supports multiple versions.

**Q: Which does your favorite open-source use?**
- **Examples:**
  - React, Vue: GitHub Flow (rapid releases)
  - Linux Kernel: Trunk-based with release branches
  - Many enterprises: GitFlow (stable, versioned)

Check by looking at the repo's branch structure on GitHub.

---

## 🛠️ Task 5: Git Commands Reference Update

### Complete Git Command Reference (Days 22–25)

#### Setup & Config
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --list
```

#### Basic Workflow
```bash
git init                    # Initialize a new repo
git add <file>             # Stage a file
git add .                  # Stage all changes
git status                 # View staged/unstaged changes
git commit -m "message"    # Create a commit
git log --oneline          # Show commit history
git log --graph --decorate --oneline  # Visual history
git diff                   # Show unstaged changes
git diff --staged          # Show staged changes
```

#### Branching
```bash
git branch                 # List local branches
git branch -a              # List all branches (local + remote)
git branch <name>          # Create a branch
git switch <branch>        # Switch to a branch (modern)
git checkout <branch>      # Switch to a branch (legacy)
git switch -c <branch>     # Create and switch in one command
git branch -d <branch>     # Delete a branch (safe)
git branch -D <branch>     # Force delete a branch
```

#### Remote & Sync
```bash
git remote add origin <url>        # Add remote
git remote -v                      # View remotes
git push -u origin <branch>        # Push branch and set upstream
git push                           # Push current branch
git pull                           # Fetch and merge
git fetch                          # Download changes (no merge)
git clone <url>                    # Clone a repository
git clone --depth 1 <url>          # Shallow clone
```

#### Merging & Rebasing
```bash
git merge <branch>                 # Merge branch into current
git rebase <branch>                # Rebase current onto branch
git cherry-pick <commit>           # Apply specific commit
```

#### Stash
```bash
git stash                          # Save work temporarily
git stash list                     # View stashed changes
git stash pop                      # Apply and remove stash
git stash apply                    # Apply stash without removing
git stash drop                     # Delete a stash
```

#### Reset & Revert
```bash
git reset --soft HEAD~1            # Undo commit, keep staged
git reset --mixed HEAD~1           # Undo commit, unstage changes
git reset --hard HEAD~1            # Undo commit, discard changes
git revert <commit>                # Create commit that undoes changes
git reflog                         # View all Git operations (safety net)
```

#### Viewing History
```bash
git log                            # View commit history
git log --oneline -n 5             # Last 5 commits
git log --author="name"            # Filter by author
git log -p                         # Show detailed changes
git show <commit>                  # Show specific commit
```

---

## 🎓 Summary & Key Takeaways

✅ **Git Reset:** Use for local branches to rewrite history (destructive)
✅ **Git Revert:** Use for shared branches to safely undo changes
✅ **GitFlow:** Best for scheduled releases, large teams
✅ **GitHub Flow:** Best for startups, continuous deployment
✅ **Trunk-Based:** Best for high-velocity, experienced teams
✅ **`git reflog`:** Your safety net after dangerous operations

---

## 📝 Submission Checklist

- [ ] Create `day-25-notes.md` (this file)
- [ ] Update `git-commands.md` with all commands from Days 22–25
- [ ] Commit and push to your fork
- [ ] Share learning on LinkedIn

Happy learning! 🚀
