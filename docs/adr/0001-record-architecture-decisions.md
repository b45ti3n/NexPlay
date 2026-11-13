# ADR-0001: Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-11-13
- **Deciders:** project team

## Context

The subject requires a decision log (ADR) covering context, options, chosen option and consequences. Decisions made early (stack, protocol) must stay understandable for the jury and for any developer taking over the project.

## Options considered

1. **Wiki or shared document:** easy to write, but not versioned with the code and easy to lose.
2. **ADR files in the repository (`/docs/adr`):** versioned, reviewed in pull requests, next to the code they describe.

## Decision

We keep one short Markdown file per decision in `/docs/adr`, numbered sequentially, using `0000-template.md`. ADRs are proposed through pull requests like any other change.

## Consequences

- The history of decisions is visible in git (who, when, why).
- A decision is never rewritten: it is superseded by a new ADR.
- Small cost: each significant technical choice needs a few minutes of writing.
