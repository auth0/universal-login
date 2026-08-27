# Git Workflow

## Branch naming

Branch off `master` (the default and only long-lived branch).

- **Feature / fix work:** name the branch after the Jira ticket — `SDK-10301`, `SDK-10294`, `ESD-64338`. This is the dominant convention on the remote.
- **Release branches:** `release/*`. These are special — see below.

Some older branches use free-form descriptive names, but ticket-keyed names are the convention to follow.

## Commit messages

Conventional Commits, as seen throughout `git log`:

```
feat: expose identifierType and phoneCountryCode on login and login-id screen (#384)
fix: phone-based signup on the signup-password screen (#374)
fix(ci): add pre-scan commands to install workspace dependencies (#368)
chore: update @auth0/auth0-acul-js dependency to version 1.6.0 (#372)
build(deps-dev): bump brace-expansion from 1.1.12 to 1.1.18 (#379)
```

Types in use: `feat`, `fix`, `chore`, `build(deps)` / `build(deps-dev)` (Dependabot), with an optional scope such as `(ci)`. The squashed commit carries the PR number, so keep the PR title in the same format — it becomes the commit subject.

## Pull requests

There is **no local `PULL_REQUEST_TEMPLATE.md`** in this repo, so the Auth0 org-level template applies: <https://github.com/auth0/.github/blob/master/.github/PULL_REQUEST_TEMPLATE.md>

It asks for **Description** (what changed and why, in plain language), **References** (the Jira ticket / linked issues), **Testing** (how you verified it), and a **Checklist**. Three checklist items matter most here:

- the change **adds test coverage** for new/changed behaviour,
- **documentation was added for new/changed functionality** — in this repo that means the affected package `README.md`, and `MIGRATION_JS_TO_REACT.md` when the JS↔React mapping shifts (see [docs-update.md](docs-update.md)),
- the PR targets the **correct base branch** — `master` unless you're cutting a release.

`.github/CODEOWNERS` assigns every path to `@auth0/project-dx-sdks-engineer-codeowner`, so all PRs need that team's review.

## Before you open a PR

```bash
npm run lint --workspaces
npm test --workspaces
npm run build:local
```

That's exactly what the CI workflow (`.github/workflows/ci.yml`) runs on `pull_request` and on pushes to `master`. There is no pre-commit hook in this repo — nothing formats or lints your staged files automatically, so run the commands yourself.

If your change touched the core SDK's public surface, also confirm the regenerated React layer is committed (see [commands.md](commands.md) → Codegen).

## Releases

Not an agent task — the release is driven by tooling, not by hand-editing files. For context: merging a `release/*` branch into `master` (or a manual `workflow_dispatch`) triggers `.github/workflows/release.yml`, which builds, tags, creates the GitHub release, and publishes to npm via trusted publishing. Each package's version lives in **two** places kept in sync by `.shiprc` — `.version` (as `v1.2.3`) and `package.json` `"version"` (as `1.2.3`). The React package additionally pins `@auth0/auth0-acul-js` to an exact version; release tooling bumps it, so don't hand-edit that pin.
