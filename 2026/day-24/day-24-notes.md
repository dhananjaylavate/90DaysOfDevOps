# Day 24 Notes — Advanced Git: Merge, Rebase, Stash & Cherry Pick

## ✅ Overview
Master integrating branches back into `main`, managing work-in-progress, and applying selective commits. These skills separate confident Git practitioners from beginners.

---

## 🔀 Task 1: Git Merge — Combining Branches

### What is Git Merge?

`git merge` combines the changes from one branch into another. There are two types: **fast-forward** and **merge commit**.

---

### Type 1: Fast-Forward Merge

**When it happens:**
- `main` has not moved since the feature branch was created
- Git can simply move `main` pointer to the feature branch's head
- No new commit is created

**Example:**
```bash
git switch -c feature-login
# (add commits on feature-login)
git switch main
git merge feature-login
# Result: fast-forward merge (no merge commit)
```

**History:**
```
Before: main ●─────  feature-login ●─●
After:  main ●─●─●
```

---

### Type 2: Merge Commit

**When it happens:**
- Both `main` and the feature branch have new commits since they diverged
- Git creates a **new merge commit** that ties both histories together

**Example:**
```bash
git switch -c feature-signup
# (add commits on feature-signup)
git switch main
# (add a commit on main)
git merge feature-signup
# Result: merge commit created
```

**History:**
```
Before:         main ●─● 
                     ╱
           feature-signup ●─●

After:         main ●─●─●─╲
                     ╱       ╲ (merge commit)
           feature-signup ●─●─╱
```

---

### What is a Merge Conflict?

A merge conflict occurs when **the same lines** in the **same file** are changed differently on both branches.

**Example:**
```bash
# On main, line 1: "Hello World"
# On feature-fix, line 1: "Hello Universe"
git merge feature-fix
# Conflict! Git cannot auto-merge
```

**Git marks the conflict:**
```
<<<<<<< HEAD
Hello World
=======
Hello Universe
>>>>>>> feature-fix
```

**To resolve:**
1. Edit the file and choose which version to keep
2. `git add <file>`
3. `git commit` to complete the merge

---

### Commands

```bash
git merge <branch>                    # Merge branch into current branch
git merge --no-ff <branch>            # Force merge commit (no fast-forward)
git merge --squash <branch>           # Squash and merge (see Task 3)
git merge --abort                     # Cancel merge if conflicts exist
```

---

## 📐 Task 2: Git Rebase — Rewriting History

### What is Git Rebase?

`git rebase` moves your commits on top of another branch. It **rewrites history** to create a linear, cleaner commit history.

---

### How Rebase Works

```bash
git switch -c feature-dashboard
# (add commits A, B, C)
git switch main
# (add commit D)
git switch feature-dashboard
git rebase main
```

**Before rebase:**
```
main ●─●─D
     ╱
feature-dashboard A─B─C
```

**After rebase:**
```
main ●─●─D
         ╱
         A'─B'─C' (feature-dashboard)
```

Git **replays** commits A, B, C on top of D (creating new commits A', B', C').

---

### Rebase vs Merge: History Comparison

**Merge approach:**
```bash
git merge feature-dashboard
```

```
●─●─D─╲
       ╲ (merge commit)
A─B─C─╱
```

**Rebase approach:**
```bash
git rebase main
git switch main && git merge feature-dashboard
```

```
●─●─D─A'─B'─C'
```

Rebase creates a **linear** history; merge creates a **branching** history.

---

### ⚠️ Never Rebase Shared Commits

**Why:**
- Rebase rewrites history
- Others who have the original commits will have diverged history
- Causes conflicts and confusion for the team
- Results in duplicate commits

**Safe rule:**
```bash
# ✅ Safe: rebase before pushing (local only)
git rebase main
git push -u origin feature-dashboard

# ❌ Unsafe: rebasing already pushed commits
git push origin feature-dashboard
git rebase main  # DON'T DO THIS
git push -f origin feature-dashboard  # Force push breaks for teammates
```

---

### When to Use Rebase vs Merge

| Scenario | Use |
|---|---|
| Before pushing a feature | ✅ Rebase (clean history) |
| Integrating into shared branch | ✅ Merge (preserves history) |
| Local-only branch cleanup | ✅ Rebase |
| Already pushed to team | ✅ Merge |
| Want linear history | ✅ Rebase |
| Want to preserve all history | ✅ Merge |

---

### Commands

```bash
git rebase <branch>                   # Rebase current branch onto <branch>
git rebase main --interactive         # Interactive rebase (edit commits)
git rebase --continue                 # After resolving conflicts
git rebase --abort                    # Cancel rebase
```

---

## 🔄 Task 3: Squash Commits vs Merge Commit

### What is Squash Merging?

`git merge --squash` combines all commits from a branch into **one single commit** before merging.

---

### Squash Merge Example

```bash
git switch -c feature-profile
# Commit 1: Add profile form
# Commit 2: Fix typo in form
# Commit 3: Add profile styling
# Commit 4: Fix mobile responsive

git switch main
git merge --squash feature-profile
git commit -m "Add user profile feature"
```

**Result:**
```
main ●─●─● (single squashed commit)
     └─────┘ (replaces 4 commits)
```

---

### Regular Merge Example

```bash
git switch -c feature-settings
# Commit 1: Add settings page
# Commit 2: Add dark mode toggle
# Commit 3: Save user preferences

git switch main
git merge feature-settings
# (creates merge commit)
```

**Result:**
```
main ●─●─●─╲
           ╲ (merge commit + 3 individual commits visible)
A─B─C───────╱
```

---

### Squash vs Regular: Comparison

| Aspect | Squash | Regular |
|---|---|---|
| **Number of commits** | 1 (squashed) | All commits preserved |
| **History clarity** | Clean, simple | Detailed, shows work |
| **Git log readability** | Better for large features | Better for tracking changes |
| **Blame/git log -p** | Harder to find specific change | Easier to find specific commit |
| **When to use** | Many small commits, feature branch | Shared branches, want full history |

---

### When to Use Each

- **Squash:** Feature branches with many tiny commits (typos, formatting, iterations)
- **Regular:** Stable branches where you want to see all work done

---

### Commands

```bash
git merge --squash <branch>           # Squash merge (stages changes, you commit)
git merge <branch>                    # Regular merge (preserves all commits)
```

---

## 💾 Task 4: Git Stash — Saving Work-in-Progress

### What is Git Stash?

`git stash` temporarily saves uncommitted changes so you can switch branches without losing work.

---

### Stash Workflow

**Scenario:**
```bash
# You're on feature-A with uncommitted changes
# Urgent: need to switch to main to fix a bug

# Without stash (Git blocks you):
git switch main
# error: Your local changes to 'file.txt' would be overwritten

# With stash:
git stash
git switch main
# (do urgent work)
git switch feature-A
git stash pop
# (your changes are back)
```

---

### Stash vs Commit

| | Stash | Commit |
|---|---|---|
| **Purpose** | Temporary, cleanup before switching | Permanent record |
| **When to use** | Context switch, work-in-progress | Completed work |
| **History** | Not in git log | Visible in git log |

---

### Stash Commands

```bash
git stash                             # Save uncommitted changes
git stash save "message"              # Stash with description
git stash list                        # List all stashes
git stash pop                         # Apply and remove latest stash
git stash apply                       # Apply latest stash (keep it)
git stash apply stash@{2}             # Apply specific stash
git stash drop                        # Delete latest stash
git stash drop stash@{1}              # Delete specific stash
git stash clear                       # Delete all stashes
```

---

### Difference: `pop` vs `apply`

**`git stash pop`:**
```bash
git stash pop
# Applies the stash AND removes it from the stash list
```

**`git stash apply`:**
```bash
git stash apply
# Applies the stash but KEEPS it in the stash list
# Useful if you want to apply to multiple branches
```

---

### Real-World Workflow Example

```bash
# Working on feature-A
git add file.txt
# (unstaged changes exist)

# Urgent bug needs fixing on main
git stash save "WIP: feature-A progress"
git switch main

# Fix the bug
git add . && git commit -m "Fix urgent bug"
git push

# Back to feature-A
git switch feature-A
git stash pop
# Continue feature-A work
```

---

## 🎯 Task 5: Cherry-Pick — Selective Commit Application

### What is Cherry-Pick?

`git cherry-pick` applies a **specific commit** from one branch to another, without merging the entire branch.

---

### Cherry-Pick Workflow

```bash
git switch -c feature-hotfix
# Commit A: Fix login bug
# Commit B: Add logging
# Commit C: Optimize database query

# Only commit A needs to go to main immediately
git switch main
git cherry-pick <commit-hash-A>
# (only commit A is applied to main)
```

**Before:**
```
main ●─●
     ╱
feature-hotfix A─B─C
```

**After:**
```
main ●─●─A'
     ╱
feature-hotfix A─B─C
```

---

### Real-World Use Cases

- 🐛 **Hotfix:** Cherry-pick a bug fix from develop to production
- 📦 **Backport:** Apply a commit to an older release branch
- 🎯 **Selective features:** Apply only specific commits, skip others
- 🔀 **Merge conflicts:** Apply one commit when full merge has conflicts

---

### Cherry-Pick Commands

```bash
git cherry-pick <commit-hash>         # Apply specific commit
git cherry-pick <hash1> <hash2>       # Apply multiple commits
git cherry-pick main..feature-branch  # Apply all commits in range
git cherry-pick --continue            # After resolving conflicts
git cherry-pick --abort               # Cancel cherry-pick
```

---

### Finding Commit Hash

```bash
git log --oneline feature-hotfix
# a1b2c3d Fix login bug
# d4e5f6g Add logging
# h7i8j9k Optimize database

git cherry-pick a1b2c3d
```

---

### ⚠️ Risks of Cherry-Picking

- **Duplicate commits:** Same changes applied twice (messy history)
- **Conflicts:** Cherry-picked commit may conflict in the target branch
- **Lost context:** Changes without their related commits may break things
- **Testing:** Changes may not work in isolation

**Best practice:** Use cherry-pick sparingly, prefer merge when possible.

---

## 🛠️ Complete Command Reference (Days 22–25)

### Merge & Rebase
```bash
git merge <branch>                    # Merge branch into current
git merge --no-ff <branch>            # Force merge commit
git merge --squash <branch>           # Squash merge (combine into 1 commit)
git rebase <branch>                   # Rebase current onto branch
git rebase -i HEAD~3                  # Interactive rebase (edit last 3 commits)
```

### Stash
```bash
git stash                             # Save work-in-progress
git stash list                        # List all stashes
git stash pop                         # Apply and remove
git stash apply stash@{0}             # Apply without removing
git stash drop stash@{1}              # Delete specific stash
```

### Cherry-Pick
```bash
git cherry-pick <commit-hash>         # Apply specific commit
git cherry-pick <hash1> <hash2>       # Apply multiple commits
git cherry-pick --continue            # After resolving conflicts
```

### Viewing History
```bash
git log --oneline --graph --all       # Visual branch history
git log --decorate                    # Show branch names
git show <commit>                     # Show specific commit details
```

---

## 🎓 Summary & Key Takeaways

✅ **Merge:** Combines branches, preserves both histories
✅ **Rebase:** Rewrites history linearly (local only, before push)
✅ **Squash:** Combines multiple commits into one (clean history)
✅ **Stash:** Temporarily saves WIP without committing
✅ **Cherry-Pick:** Applies specific commits selectively
✅ **Conflicts:** Resolve by editing files, then add & commit
✅ **Never rebase shared commits** — use merge instead

---

## 📝 Submission Checklist

- [ ] Create `day-24-notes.md` (this file)
- [ ] Perform all hands-on tasks in `devops-git-practice` repo
- [ ] Update `git-commands.md` with all commands
- [ ] Commit and push to your fork
- [ ] Share merge vs rebase comparison on LinkedIn




Commit 4

Happy learning! 🚀
