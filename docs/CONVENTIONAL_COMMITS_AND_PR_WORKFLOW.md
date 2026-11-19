# Conventional Commits & Pull Request Workflow

## 1. Purpose

This document defines the commit message convention and Pull Request (PR) process used by the team.

The objectives are to:

- Keep commit history readable and consistent.
- Make changes easier to review and trace.
- Support automated changelog generation and release versioning.
- Ensure code quality through reviews and automated checks.

## 2. Conventional Commits

All commits must follow the Conventional Commits specification.

### 2.1 Commit Message Format

```text
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

Examples:

```text
feat: add user authentication
fix: resolve login validation issue
docs: update installation instructions
style: format user profile component
refactor: simplify authentication service
test: add payment service unit tests
chore: update project dependencies
perf: optimize database queries
ci: add automated testing pipeline
build: update build configuration
revert: revert user authentication changes
```

### 2.2 Allowed Commit Types

| Type       | Description                                          | Example                               |
| ---------- | ---------------------------------------------------- | ------------------------------------- |
| `feat`     | Introduces a new feature.                            | `feat: add user registration`         |
| `fix`      | Fixes a bug.                                         | `fix: resolve token expiration issue` |
| `docs`     | Documentation-only changes.                          | `docs: update README`                 |
| `style`    | Formatting changes that do not affect program logic. | `style: fix indentation`              |
| `refactor` | Code restructuring without changing behavior.        | `refactor: simplify user service`     |
| `perf`     | Improves performance.                                | `perf: optimize API response time`    |
| `test`     | Adds or updates tests.                               | `test: add authentication tests`      |
| `build`    | Changes the build system or external dependencies.   | `build: update vite configuration`    |
| `ci`       | Changes CI/CD configuration or scripts.              | `ci: configure GitHub Actions`        |
| `chore`    | Maintenance tasks that do not fit another type.      | `chore: update dependencies`          |
| `revert`   | Reverts a previous commit.                           | `revert: remove payment integration`  |

### 2.3 Scopes

Scopes are optional but recommended. They identify the part of the application affected by the commit.

Examples:

```text
feat(auth): add OAuth2 authentication
fix(api): handle invalid response status
refactor(user): simplify user service
test(payment): add payment integration tests
docs(readme): update installation guide
```

Use consistent scope names across the repository.

### 2.4 Breaking Changes

A breaking change must be identified with `!` after the type/scope or with a `BREAKING CHANGE:` footer.

Using `!`:

```text
feat(api)!: change authentication response format
```

Using a footer:

```text
feat(api): update authentication response

BREAKING CHANGE: The authentication endpoint now returns
a different response structure.
```

Breaking changes generally require a MAJOR version increment.

### 2.5 Commit Message Rules

1. Use the imperative mood (for example, `add`, `fix`, `update`).
2. Use lowercase for the type and description.
3. Keep the subject concise and meaningful.
4. Do not end the subject with a period.
5. Describe the change, not the developer's activity.
6. Avoid vague messages such as `update`, `changes`, or `fix bug`.
7. Use the most appropriate commit type.

Good examples:

```text
feat(auth): add password reset functionality
fix(api): handle missing authorization header
refactor(database): simplify connection handling
```

Avoid:

```text
update code
fixed bug
changes
added stuff
WIP
```

## 3. Pull Request Workflow

All changes targeting `main` must go through a Pull Request. Changes targeting `develop` should also use Pull Requests so they can be reviewed and validated.

### 3.1 Standard Development Process

#### Step 1 — Update the base branch

```bash
git checkout develop
git pull origin develop
```

#### Step 2 — Create a working branch

```bash
git checkout -b feature/user-authentication
```

#### Step 3 — Implement and commit changes

Make small, focused commits using Conventional Commits:

```bash
git add .
git commit -m "feat(auth): add user authentication"
git commit -m "test(auth): add authentication unit tests"
```

#### Step 4 — Push the branch

```bash
git push -u origin feature/user-authentication
```

#### Step 5 — Open a Pull Request

For a feature or fix, open a PR with:

- **Base:** `develop`
- **Compare:** your working branch

The PR must include:

- A clear title.
- A description of the changes.
- The reason for the change.
- Testing information.
- Related issue or ticket references.
- Screenshots or recordings for UI changes, when applicable.

#### Step 6 — Code Review

At least one approval is required before merging.

Reviewers should check:

- Correctness of the implementation and business logic.
- Code quality, readability, and maintainability.
- Tests and test coverage.
- Security and performance implications.
- Documentation, where applicable.
- Compliance with project conventions.

#### Step 7 — CI Validation

Required CI checks should include, as applicable:

- Build succeeds.
- Unit tests pass.
- Integration tests pass.
- Linting passes.
- Formatting checks pass.
- No unresolved merge conflicts.

#### Step 8 — Merge the PR

Once the required approvals and CI checks are complete, merge the PR into `develop`.

Recommended merge strategy: **Squash and merge** for feature and fix branches. This keeps the target branch history concise.

#### Step 9 — Delete the working branch

Delete the remote and local working branches after the PR has been merged:

```bash
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

## 4. Pull Request Naming Convention

PR titles must follow the Conventional Commits format:

```text
<type>[optional scope]: <description>
```

Examples:

```text
feat(auth): implement user authentication
fix(api): resolve timeout issue
refactor(user): simplify user management
docs(readme): update project documentation
test(payment): add payment unit tests
```

A PR title summarizes the overall contribution. It does not need to be identical to any individual commit message.

## 5. Pull Request Template

For GitHub, create `.github/pull_request_template.md` with the following content:

```markdown
## Description

Briefly describe the changes introduced by this PR.

## Type of Change

- [ ] feat: New feature
- [ ] fix: Bug fix
- [ ] docs: Documentation update
- [ ] refactor: Code refactoring
- [ ] perf: Performance improvement
- [ ] test: Test-related changes
- [ ] chore: Maintenance
- [ ] ci: CI/CD changes
- [ ] Breaking change

## Related Issue

Closes #

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)

Add screenshots or recordings demonstrating the changes.

## Checklist

- [ ] Code follows project conventions.
- [ ] Commit messages follow Conventional Commits.
- [ ] PR title follows Conventional Commits.
- [ ] No unnecessary files or changes included.
- [ ] Documentation updated if necessary.
- [ ] No unresolved merge conflicts.
- [ ] Required CI checks pass.
```

## 6. Semantic Versioning

Project versions follow Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

| Version component | Meaning                                | Example |
| ----------------- | -------------------------------------- | ------- |
| MAJOR             | Incompatible or breaking changes.      | `2.0.0` |
| MINOR             | New backward-compatible functionality. | `1.3.0` |
| PATCH             | Backward-compatible bug fixes.         | `1.2.1` |

Typical Conventional Commit release impact:

| Commit                               | Typical version impact |
| ------------------------------------ | ---------------------- |
| `feat:`                              | MINOR                  |
| `fix:`                               | PATCH                  |
| `perf:`                              | Usually PATCH          |
| `BREAKING CHANGE:` or `!`            | MAJOR                  |
| `docs:`, `style:`, `test:`, `chore:` | No release by default  |

The actual version increment depends on the project's release policy and the changes included in the release.

## 7. Recommended Tooling

The following tools can help enforce the workflow:

- **Commitlint:** Validates commit messages against Conventional Commits.
- **Husky:** Runs Git hooks locally.
- **Commitizen:** Helps developers create standardized commit messages.
- **GitHub Actions or GitLab CI:** Automates builds, tests, linting, and validation.
- **Release Please:** Automates release PRs and version updates based on Conventional Commits.

## 8. Team Rules and Best Practices

| Rule            | Requirement                               |
| --------------- | ----------------------------------------- |
| Commit messages | Follow Conventional Commits.              |
| PR titles       | Follow Conventional Commits.              |
| PR descriptions | Explain purpose, changes, and testing.    |
| Code review     | At least one approval.                    |
| CI checks       | All required checks must pass.            |
| Merge strategy  | Squash and merge for feature and fix PRs. |
| Branch cleanup  | Delete temporary branches after merging.  |
| Versioning      | Follow Semantic Versioning.               |

## 9. Recommended Configuration

| Component         | Strategy                                |
| ----------------- | --------------------------------------- |
| Commit convention | Conventional Commits 1.0.0              |
| Commit scopes     | Optional, recommended                   |
| PR naming         | Conventional Commits                    |
| PR review         | At least one approval                   |
| Merge strategy    | Squash and merge for features and fixes |
| Versioning        | Semantic Versioning                     |
| Automation        | Commitlint, Husky, and CI               |

**Important:** Commit messages describe individual changes, while PR titles summarize the complete contribution. Both follow Conventional Commits, but they do not need to be identical.
