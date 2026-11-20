# Contributing to NexPlay

Thank you for contributing to NexPlay. This guide describes the development
workflow, repository conventions, and validation commands used by the project.

## Project overview

NexPlay is a TypeScript monorepo. The main areas are:

- `apps/server`: realtime server
- `apps/web`: web console
- `packages/protocol`: shared protocol types and validation
- `packages/sdk-screen`: screen SDK
- `packages/sdk-controller`: controller SDK
- `games`: game implementations
- `docs`: architecture decisions and project workflows

The repository uses pnpm workspaces. Use one shared checkout and run root
commands when a change affects more than one package.

## Prerequisites

Install:

- Node.js 22
- pnpm 12.18.0 or Corepack
- Git

Enable pnpm through Corepack:

```bash
corepack enable
corepack prepare pnpm@12.18.0 --activate
```

Check your versions:

```bash
node --version
pnpm --version
```

## Initial setup

Clone the repository and install all workspace dependencies:

```bash
git clone <repository-url>
cd NexPlay
pnpm install --frozen-lockfile
```

The server reads `PORT` from the environment. Copy the example environment file
when local configuration is needed:

```bash
cp .env.example .env
```

The default server port is `3000`.

## Working with the monorepo

The workspace configuration includes:

```text
apps/*
packages/*
games/*
```

Run root commands from the repository root:

| Command          | Purpose                                            |
| ---------------- | -------------------------------------------------- |
| `pnpm lint`      | Check formatting and lint rules with Biome         |
| `pnpm format`    | Format and apply available Biome fixes             |
| `pnpm typecheck` | Type-check all workspaces that provide `typecheck` |
| `pnpm test`      | Run all workspace tests that provide `test`        |
| `pnpm build`     | Build all workspaces that provide `build`          |

Install a dependency for a specific workspace instead of manually editing
workspace files:

```bash
pnpm --filter <workspace-name> add <package>
pnpm --filter <workspace-name> add -D <package>
```

Run a script only in one workspace:

```bash
pnpm --filter <workspace-name> <script>
```

Use strict TypeScript and keep types and protocol schemas in the shared protocol
package when they must be consumed by multiple applications.

## Before starting work

Choose or create an issue and agree on the scope before implementing a large
change. Use the appropriate GitHub issue template:

- Bug Report for unexpected behavior
- Feature Request for new functionality or improvements
- Task for tracked implementation work

Keep pull requests focused. Do not combine unrelated features or broad cleanup
with a targeted fix.

## Branch workflow

The project uses permanent `main` and `develop` branches plus temporary working
branches.

| Branch      | Source    | Pull request target                |
| ----------- | --------- | ---------------------------------- |
| `feature/*` | `develop` | `develop`                          |
| `fix/*`     | `develop` | `develop`                          |
| `release/*` | `develop` | `main`, then synchronize `develop` |
| `hotfix/*`  | `main`    | `main`, then synchronize `develop` |

For a normal feature or fix:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/short-description
```

Use `fix/short-description` for bug fixes. Branch names must be lowercase and
use hyphens instead of spaces.

Push the branch and open a pull request targeting `develop`:

```bash
git push -u origin feature/short-description
```

Do not commit directly to `main`. Direct pushes to `develop` should also be
avoided; use a pull request so changes receive review and CI validation.

Release and hotfix procedures are documented in
[Git Branch Strategy](docs/GIT_BRANCH_STRATEGY.md).

## Development workflow

1. Update `develop` and create a focused working branch.
2. Make small, reviewable changes.
3. Add or update tests for behavior changes.
4. Format and validate the change locally.
5. Commit with a Conventional Commit message.
6. Push the branch and open a pull request.
7. Address review feedback and merge only after CI passes.

Make changes self-contained and avoid unrelated modifications. If a change
requires an architectural decision, add or update an ADR in `docs/adr/`.

## Formatting and linting

Biome owns formatting and linting. Run it before pushing:

```bash
pnpm format
pnpm lint
```

Review formatter changes as part of the commit. Do not leave broad,
unrelated formatting changes in a feature branch.

## Tests

Run the complete local validation suite before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Vitest is the unit and integration test runner. Use the package's existing test
patterns and place tests alongside the code or in the package's established test
locations.

Run a package test directly when needed:

```bash
pnpm --filter <workspace-name> test
```

For UI changes, also describe manual verification in the pull request. Automated
accessibility checks and Playwright end-to-end tests may be added as the relevant
applications become available.

## Commit conventions

All commits must follow Conventional Commits:

```text
<type>[optional scope][!]: <description>
```

Common types include:

| Type       | Use                                    |
| ---------- | -------------------------------------- |
| `feat`     | New feature                            |
| `fix`      | Bug fix                                |
| `docs`     | Documentation-only change              |
| `refactor` | Behavior-preserving code restructuring |
| `perf`     | Performance improvement                |
| `test`     | Tests                                  |
| `build`    | Build system or dependencies           |
| `ci`       | CI/CD configuration                    |
| `chore`    | Other maintenance                      |
| `revert`   | Reverts a previous commit              |

Examples:

```text
feat(protocol): add room join message
fix(api): handle missing authorization header
test(protocol): add invalid payload coverage
docs: explain local development setup
```

Use the imperative mood, keep the subject concise, and do not add a period.
Mark breaking changes with `!` or a `BREAKING CHANGE:` footer.

Example of a breaking change:

```text
feat(api)!: change authentication response format

BREAKING CHANGE: The authentication endpoint now returns a different
response structure.
```

Commit messages are validated by commitlint in CI. The full convention is
documented in
[Conventional Commits and Pull Request Workflow](docs/CONVENTIONAL_COMMITS_AND_PR_WORKFLOW.md).

## Pull requests

1. Rebase or merge the latest `develop` into your branch when needed.
2. Resolve all merge conflicts before requesting review.
3. Push the final commits.
4. Open the pull request with `develop` as the base branch, except for release
   and hotfix branches that follow the branch strategy.
5. Use a Conventional Commit-style PR title, for example
   `feat(protocol): add room join message`.
6. Complete the repository
   [pull request template](.github/pull_request_template.md).
7. Link the related issue with `Closes #123`, `Fixes #123`, or
   `Related to #123`.

The PR description should explain:

- What changed and why
- Which issue or requirement is addressed
- How the change was tested
- Any manual verification steps
- Screenshots or recordings for UI changes
- Migration, configuration, or breaking-change implications

A feature or fix is normally merged with squash and merge so the target branch
keeps a concise history.

## Code review

Reviewers and contributors should check:

- Correctness and edge cases
- Type safety and protocol compatibility
- Readability and maintainability
- Test coverage for changed behavior
- Security and performance implications
- Documentation and configuration updates
- Compliance with branch and commit conventions

Keep feedback specific and actionable. Contributors should resolve comments or
document why a requested change does not fit the scope.

## CI checks

Every pull request runs the CI workflow:

1. Install with `pnpm install --frozen-lockfile`
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm test`
5. `pnpm build`

Commitlint separately validates commit messages in pull requests. A pull request
should not be merged until the required checks pass and merge conflicts are
resolved.

## Reporting bugs and proposing features

Search existing issues before opening a new one. Include:

- Clear reproduction steps for bugs
- Expected and actual behavior
- Environment and relevant logs or screenshots
- The problem, motivation, and proposed solution for feature requests
- Affected components and alternatives considered

Use the issue templates under `.github/ISSUE_TEMPLATE/`.

## Documentation

Update directly affected documentation whenever behavior or setup changes.
Architecture decisions are recorded in `docs/adr/` using the existing ADR format.
Current workflow documents include:

- [Git Branch Strategy](docs/GIT_BRANCH_STRATEGY.md)
- [Conventional Commits and Pull Request Workflow](docs/CONVENTIONAL_COMMITS_AND_PR_WORKFLOW.md)
- [Protocol](docs/protocol.md)

## Final checklist

Before requesting review, verify:

- [ ] The change is based on the latest `develop`
- [ ] The branch uses the expected `feature/*` or `fix/*` name
- [ ] `pnpm format` was applied if needed
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` passes
- [ ] Commit messages follow Conventional Commits
- [ ] The PR title follows Conventional Commits
- [ ] The PR template is complete
- [ ] Documentation and tests were updated when necessary
