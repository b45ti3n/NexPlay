# Git Branch Strategy

## 1. Purpose

This document defines the team's branching model and the rules for creating, integrating, releasing, and maintaining branches.

The project uses a simplified Git Flow strategy with two permanent branches and temporary supporting branches.

## 2. Branch Types

| Branch | Purpose | Lifetime |
|---|---|---|
| `main` | Stable, production-ready code. | Permanent |
| `develop` | Integration branch for work targeting the next release. | Permanent |
| `feature/*` | New features and enhancements. | Temporary |
| `fix/*` | Non-urgent bug fixes during development. | Temporary |
| `release/*` | Release stabilization and preparation. | Temporary |
| `hotfix/*` | Urgent fixes for production issues. | Temporary |

### 2.1 `main`

- Contains production-ready code.
- Must remain deployable.
- Direct commits are forbidden.
- Changes must be merged through Pull Requests.
- Production releases must be tagged (for example, `v1.2.0`).

### 2.2 `develop`

- Integrates completed features and fixes for the next release.
- Is the base branch for feature and fix branches.
- Must pass the required CI checks.
- Changes should be introduced through Pull Requests.

## 3. Branch Creation and Merge Targets

| Branch type | Created from | PR target |
|---|---|---|
| `feature/*` | `develop` | `develop` |
| `fix/*` | `develop` | `develop` |
| `release/*` | `develop` | `main`, then synchronize with `develop` |
| `hotfix/*` | `main` | `main`, then synchronize with `develop` |

## 4. Branch Naming Convention

Use this format:

```text
<type>/<short-description>
```

Rules:

- Use lowercase letters.
- Separate words with hyphens.
- Keep names short and descriptive.
- Do not use spaces or special characters.

Examples:

```text
feature/user-authentication
feature/payment-integration
feature/dashboard-redesign

fix/login-validation
fix/api-timeout

release/1.2.0

hotfix/production-crash
hotfix/security-vulnerability
```

If the team uses issue tracking, include the ticket identifier when useful:

```text
feature/PROJ-123-user-authentication
fix/PROJ-456-login-validation
```

## 5. Standard Feature or Fix Workflow

### Step 1 — Update `develop`

```bash
git checkout develop
git pull origin develop
```

### Step 2 — Create a working branch

For a feature:

```bash
git checkout -b feature/user-authentication
```

For a bug fix:

```bash
git checkout -b fix/login-validation
```

### Step 3 — Develop and push

Make focused commits, then push the branch:

```bash
git push -u origin feature/user-authentication
```

### Step 4 — Open a Pull Request

Open a PR targeting `develop`. Follow the team's Pull Request Workflow document for PR requirements, review, CI validation, and merging.

### Step 5 — Clean up

After the PR is merged, delete the temporary branch:

```bash
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

## 6. Release Workflow

Releases are prepared using dedicated release branches.

### Step 1 — Create the release branch

Create it from the latest `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.2.0
git push -u origin release/1.2.0
```

### Step 2 — Stabilize the release

Only release-related changes should be introduced:

- Bug fixes.
- Version updates.
- Documentation updates.
- Final validation.

New features should not be added to the release candidate.

### Step 3 — Open a PR into `main`

Open a PR:

```text
release/1.2.0 → main
```

After review and successful CI validation, merge the PR.

### Step 4 — Tag the release

After the release has been merged into `main`:

```bash
git checkout main
git pull origin main

git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin v1.2.0
```

### Step 5 — Synchronize `develop`

Ensure release-related changes are present in `develop`. Open a PR from the release branch into `develop`, or use the team's agreed synchronization process.

```text
release/1.2.0 → develop
```

Resolve conflicts and validate CI before completing the synchronization.

### Step 6 — Delete the release branch

Delete the release branch after both targets have been synchronized.

## 7. Hotfix Workflow

Hotfixes are used for urgent production issues.

### Step 1 — Create the hotfix branch

Create it from the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/production-crash
git push -u origin hotfix/production-crash
```

### Step 2 — Implement the fix

Commit the fix and push the branch:

```bash
git add .
git commit -m "fix(auth): resolve production authentication crash"
git push
```

### Step 3 — Open a PR into `main`

Open a PR:

```text
hotfix/production-crash → main
```

Hotfix PRs should receive priority review and the required CI validation.

### Step 4 — Tag the patch release

After the PR is merged, create and push the next PATCH tag. For example:

```bash
git checkout main
git pull origin main

git tag -a v1.2.1 -m "Hotfix release v1.2.1"
git push origin v1.2.1
```

### Step 5 — Synchronize `develop`

The hotfix must also be integrated into `develop` so the issue does not reappear in a future release.

Open a PR:

```text
hotfix/production-crash → develop
```

Validate the result, then delete the hotfix branch.

## 8. Workflow Overview

### Feature and fix workflow

```text
                    ┌──────────────┐
                    │     main     │
                    │  Production  │
                    └──────┬───────┘
                           │
                     Release PR
                           │
                    ┌──────▼───────┐
                    │    develop   │
                    │  Integration │
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              │                         │
         feature/*                   fix/*
              │                         │
              └────────────┬────────────┘
                           │
                      Pull Request
                           │
                     Review + CI
                           │
                           ▼
                        develop
```

### Hotfix workflow

```text
main
 │
 └── hotfix/production-crash
             │
             ├── PR → main
             │
             └── PR → develop
```

## 9. Branch Protection and Team Rules

Configure repository branch protection so that:

- Direct pushes to `main` are blocked.
- Required PR approvals are enforced.
- Required CI checks must pass before merging.
- Force pushes and branch deletion are restricted on protected branches.
- Temporary branches are deleted after merging.
- Hotfixes are synchronized with both `main` and `develop`.

## 10. Recommended Branch Configuration

| Component | Strategy |
|---|---|
| Branching model | Simplified Git Flow |
| Permanent branches | `main`, `develop` |
| Feature branches | `feature/*` |
| Bug-fix branches | `fix/*` |
| Emergency fixes | `hotfix/*` |
| Release branches | `release/*` |
| Feature/fix PR target | `develop` |
| Release PR target | `main`, then synchronize with `develop` |
| Hotfix PR targets | `main` and `develop` |
