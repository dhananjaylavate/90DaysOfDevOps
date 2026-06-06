# Day 23 Notes — Git Branching & Working with GitHub

## ✅ Task Summary
- Create `day-23-notes.md` answering the challenge questions and documenting commands.
- Practice creating branches, switching, committing, pushing to GitHub, and syncing forks.

---

## 🔀 1) What is a branch in Git?
A branch is a movable pointer to a commit. It represents an independent line of development so you can work on features, fixes, or experiments without changing the `main` branch.

- Example: list branches

```bash
git branch
```

---

## 💡 2) Why use branches instead of committing everything to `main`?
- Isolate work: keep unfinished or experimental work separate.
- Collaboration: multiple people can work on different features simultaneously.
- Safer history: `main` stays stable and deployable.

---

## 🧭 3) What is `HEAD` in Git?
`HEAD` is a pointer to the current commit (usually the tip of the current branch). When you switch branches, `HEAD` moves to point at the tip of that branch.

- Show `HEAD` status:

```bash
git status
```

---

## 🔁 4) What happens to your files when you switch branches?
- Git updates your working directory to match the commit that `HEAD` points to on the target branch. Uncommitted changes may be preserved, or Git may ask you to stash/commit them before switching if they would conflict.

---

## 🔧 Task 2 — Branching Commands (Hands-On)
Commands and examples to perform the requested steps:

- List branches

```bash
git branch
```

- Create a new branch `feature-1`

```bash
git branch feature-1
```

- Switch to `feature-1` (modern command)

```bash
git switch feature-1
```

- Create and switch in one command (`feature-2`)

```bash
git switch -c feature-2
# or legacy: git checkout -b feature-2
```

- Difference: `git switch` vs `git checkout`
  - `git switch` is focused on switching branches (safer, clearer).
  - `git checkout` can switch branches *and* restore files; it's more powerful but more confusing.

- Make a commit on `feature-1` that does not exist on `main`:

```bash
# on feature-1
git add .
git commit -m "Add feature-1 changes"
```

- Switch back to `main` and verify the commit is not there

```bash
git switch main
git log --oneline --decorate --graph -n 5
```

- Delete a branch you no longer need

```bash
git branch -d feature-1    # safe delete (only if merged)
# or force delete:
git branch -D feature-1
```

- Push branch to remote and set upstream

```bash
git push -u origin feature-1
```

Add these commands to your `git-commands.md` as practice.

---

## 🌐 Task 3 — Push to GitHub
Steps to push to a new GitHub repo (do not initialize remote with README):

```bash
# create repo on GitHub via website
git remote add origin git@github.com:YOURUSERNAME/devops-git-practice.git
git push -u origin main
git push -u origin feature-1
```

- `origin` vs `upstream`:
  - `origin` is the default name for the remote you cloned from (your remote fork or repo).
  - `upstream` commonly refers to the original repository you forked from. Use `upstream` when you want to fetch changes from the original project.

---

## 🔄 Task 4 — Pull from GitHub
- Make a change on GitHub using the editor, then pull locally:

```bash
git pull
# or fetch then merge manually:
git fetch origin
git merge origin/main
```

- `git fetch` vs `git pull`:
  - `git fetch` downloads commits and refs from remote into your local repo but does not change your working tree.
  - `git pull` is `git fetch` followed by `git merge` (or `git rebase` if configured) into your current branch.

---

## 🍴 Task 5 — Clone vs Fork
- `git clone` copies a remote repository to your local machine.

```bash
git clone https://github.com/OWNER/REPO.git
```

- `Fork` (GitHub): creates your own copy of a repository on GitHub. Then clone your fork to work on it.

When to use which:
- Clone: when you already have write access or are working within the same repo.
- Fork: when you want to contribute to someone else's project without direct write access.

Keeping your fork in sync with the original repo (common approach):

```bash
# add upstream once
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPO.git
# fetch upstream changes
git fetch upstream
# update your main
git switch main
git merge upstream/main
# or rebase
git rebase upstream/main
# push updated main to your fork
git push origin main
```

---

## ✅ Notes & Recommended Commands to Add to `git-commands.md`
- `git branch`, `git branch <name>`
- `git switch <branch>`, `git switch -c <new-branch>`
- `git checkout -b <new-branch>` (legacy)
- `git add .`, `git commit -m "msg"`
- `git push -u origin <branch>`
- `git remote add origin <url>`
- `git remote add upstream <url>`
- `git fetch upstream`, `git merge upstream/main`

---

## 📌 Submission Checklist
- [ ] Add `day-23-notes.md` to `2026/day-23/` (this file)
- [ ] Update `git-commands.md` in your `devops-git-practice` repo
- [ ] Push branches and repo to GitHub

---

If you'd like, I can also:
- Add these commands into your `git-commands.md` for you ✅
- Run a quick checklist script to verify remote branches (requires shell access) 🔍

Happy learning! 🚀
